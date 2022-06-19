import { Post } from './../../models/post.model';
export interface PostState {
  post: Post[] ;
}

export const initialState: PostState = {
  post: [],
}
