import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '../auth/state/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router:Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      return this.store.select(isAuthenticated).pipe(
        map( (authentcate) => {
          if(!authentcate){
            return this.router.createUrlTree(['auth']);
          }
          return true
        })
      )
  }
}
