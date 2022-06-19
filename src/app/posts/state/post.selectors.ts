
import { createSelector, props } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { PostState } from './post.state';

const getPostState = createFeatureSelector<PostState>('posts')

export const getPosts = createSelector(getPostState, state => {
  return state.post
})

export const getPostByid = createSelector(getPostState,(state:any, props:any )=>{
  console.log(props);
  return  state.post.find((post:any) => post.id === props.id);
})
