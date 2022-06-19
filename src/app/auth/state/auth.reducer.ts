import { loginSucesso, signupSucess, autoLogout } from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';

const _authReucer = createReducer(initialState,
  on(loginSucesso, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(signupSucess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      user: null
    }
  })
  )

export function AuthReducer(state:any, action:any){
  return _authReucer(state,action);
}
