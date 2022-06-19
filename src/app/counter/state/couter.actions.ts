import { createAction, props } from "@ngrx/store";

export const increment = createAction('increment ')
export const decrement = createAction('decrement ')
export const reset = createAction('reset ')

export const customChangeName = createAction('Alterar name ')
export const editChangeName = createAction('Editar name ', props<{ insertName: any }>())


export const customIncrement = createAction('CustomIncrement', props<{ teste: number }>())
