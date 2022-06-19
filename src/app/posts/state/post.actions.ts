import { Post } from './../../models/post.model';
import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';



export const ADD_POST_ACTION = '[POST PAGE ] ADD post';
export const ADD_POST_SUCESS = '[posts page ] add post sucess'
export const UPDATE_POST_ACTION = '[POST PAGE ] Update post';
export const UPDATE_POST_SUCESS = '[POST PAGE ] Update post sucess';
export const DELETE_POST_ACTION = '[POST PAGE ] Delete post';
export const DELETE_POST_SUCESS = '[POST PAGE ] Delete post sucess';
export const LOAD_POST = '[posts page] load post';
export const LOAD_POST_SUCESSO = '[posts page] load post sucesso';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>())
export const addPostSucess = createAction(ADD_POST_SUCESS, props<{ post: Post }>())



export const updatePost = createAction(
  UPDATE_POST_ACTION,
  props<{ post: Post }>()
)

export const updatePostSucess = createAction(
  UPDATE_POST_SUCESS,
  props<{ post: Post }>()
)

export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: any }>())
export const deletePostSucess = createAction(DELETE_POST_SUCESS, props<{ id: any }>())

export const loadPost = createAction(LOAD_POST);
export const loadPostSucess = createAction(LOAD_POST_SUCESSO, props<{ posts: Post[] }>())
