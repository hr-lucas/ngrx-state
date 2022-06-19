import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";

const getCounterState = createFeatureSelector<CounterState>('couter');



export const getCounter = createSelector(getCounterState, state => {
  console.log('State counter', state)
    return state.couter
})

export const getChannelName = createSelector(getCounterState, getCounter ,state => {
  console.log()
  return state.channelName
})
