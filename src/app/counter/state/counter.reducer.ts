import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { initialState } from "./counter.state";
import { customChangeName, customIncrement, decrement, editChangeName, increment, reset } from "./couter.actions";

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      couter: state.couter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      couter: state.couter - 1
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      couter: 0
    };
  }),
  on(customIncrement, (state, action) => {
    console.log('Action', action.teste)
    const value = action.teste
    return {
      ...state,
      couter: value
    };
  }),
  on(customChangeName, (state) => {
    return {
      ...state,
      channelName: 'Editar nome!!!!'
    };
  }),
  on(editChangeName, (state, action) => {
    return {
      ...state,
      channelName: action.insertName
    };
  }),
  );


export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action)
}
