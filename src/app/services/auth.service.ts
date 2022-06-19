import { autoLogout } from './../auth/state/auth.actions';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { AuthResponseData } from './../models/AuthResponseData.model';
import { environment } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from '../models/user.model';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  timeoutInterval: any

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`, { email, password, returnSecureToken: true });
  }
  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`, { email, password, returnSecureToken: true });
  }



  formartUser(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists'
      default:
        return 'Unknown error occurred. Please try again'
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout())
    }, timeInterval)

  }



  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate)
      const user = new User(userData.email, userData.token, userData.localId, expirationDate);
      this.runTimeoutInterval(user);
      return user;
    }

    return null
  }

  logout(){
    localStorage.removeItem('userData');
    if(this.timeoutInterval){
      clearInterval(this.timeoutInterval);
      this.timeoutInterval = null
    }
  }

}
