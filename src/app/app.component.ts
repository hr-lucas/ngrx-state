import { getErrorMessage, getLoading } from './store/shared/shared.selector';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { autoLogin } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Last-NGRX';

  showLoading!: Observable<boolean>;
  errorMessage!: Observable<String>
  constructor(
    private store: Store<AppState>
  ){}
  ngOnInit(): void {
   this.showLoading =  this.store.select(getLoading)
   this.errorMessage =  this.store.select(getErrorMessage)
   this.store.dispatch(autoLogin())
  }
}
