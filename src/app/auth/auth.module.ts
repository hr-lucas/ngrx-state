import { AuthEffects } from './state/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AUTH_STATE_NAME } from './state/auth.selector';
import { AuthReducer } from './state/auth.reducer';
import { SigupComponent } from './sigup/sigup.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SigupComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    SigupComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer), EffectsModule.forFeature()]
})
export class AuthModel {

}
