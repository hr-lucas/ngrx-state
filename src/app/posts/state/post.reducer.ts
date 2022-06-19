
import { loadPostSucess, addPostSucess, updatePostSucess, deletePostSucess } from './post.actions';
import { on } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import { initialState } from './post.state';



export function postReducer(state: any, action: any) {
  return _postReducer(state, action);
}
const _postReducer = createReducer(
  initialState,
  on(addPostSucess, (state, action: any) => {
    let post = { ...action.post };
    return {
      ...state,
      post: [...state.post, post]
    }
  }),
  on(updatePostSucess, (state: any, action: any) => {
    const updatedPost = state.post.map((post: any) => {
      return action.post.id === post.id ? action.post : post;
    })
    console.log('updatedPost', updatedPost)
    return {
      ...state,
      post: updatedPost
    }
  }),
  on(deletePostSucess, (state, { id }) => {
    const deletePost = state.post.filter((post) => {
      return post.id !== id
    })

    return {
      ...state,
      post: deletePost
    }
  }),
  on(loadPostSucess, (state, action) => {
    return {
      ...state,
      post: action.posts
    }
  })
)


