import { Router } from '@angular/router';
import { setLoadingSpinner, setErrorMessage } from './../../store/shared/shared.actions';
import { AuthService } from './../../services/auth.service';
import { autoLogin, loginStart, loginSucesso, signupStart, signupSucess, autoLogout } from './auth.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, merge, mergeMap, of, tap } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';



@Injectable()

export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password)
          .pipe(map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }))
            this.store.dispatch(setErrorMessage({ message: '' }))
            const user = this.authService.formartUser(data)
            this.authService.setUserInLocalStorage(user)
            return loginSucesso({ user })
          }),
            catchError((error) => {
              const errorMessage = this.authService.getErrorMessage(error.error.error.message)
              this.store.dispatch(setLoadingSpinner({ status: false }))
              return of(setErrorMessage({ message: errorMessage }))

            })

          );
      })
    );
  })


  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formartUser(data);
            this.authService.setUserInLocalStorage(user)
            return signupSucess({ user })
          }),
          catchError((error) => {
            const errorMessage = this.authService.getErrorMessage(error.error.error.message)
            this.store.dispatch(setLoadingSpinner({ status: false }))
            return of(setErrorMessage({ message: errorMessage }))

          })
        )
      })
    )
  })

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSucesso, signupSucess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }))
          this.router.navigate(['/'])
        })
      )
    },
    { dispatch: false }
  )


  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((aciton) => {
        const users: any = this.authService.getUserFromLocalStorage();
        return of(loginSucesso({ user: users }));
      })
    )
  })

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogout),
      map((action) => {
        this.authService.logout()
        this.router.navigate(['auth'])
      })
      )
  }, { dispatch: false })

}
