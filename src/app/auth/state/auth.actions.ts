import { User } from './../../models/user.model';
import { createAction, props } from '@ngrx/store';


export const LOGIN_START = '[auth page] login start'
export const LOGIN_SUCESSO = '[auth page] login sucesso'
export const LOGIN_FAIL = '[auth page] login fail'
export const SIGNUP_START = '[auth page] signup start'
export const SIGNUP_SUCCESS = '[auth page] signup sucess'
export const AUTO_LOGIN_ACTION = '[auth page] auto log'
export const LOGOUT_ACTION = '[auth page] auto log'


export const loginStart = createAction(
  LOGIN_START,
  props<{email:string; password:string}>()
)

export const loginSucesso = createAction(
  LOGIN_SUCESSO,
  props<{user: User}>()
)


export const signupStart = createAction(
  SIGNUP_START,
  props<{email:string; password:string}>()
)

export const signupSucess = createAction(
  SIGNUP_SUCCESS,
  props<{user: User}>()
)

export  const autoLogin = createAction(AUTO_LOGIN_ACTION)

export const autoLogout = createAction(LOGOUT_ACTION)
