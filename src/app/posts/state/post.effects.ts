import { mergeMap, map, switchMap } from 'rxjs';
import { addPost, loadPost, loadPostSucess, addPostSucess, updatePost, updatePostSucess, deletePost, deletePostSucess } from './post.actions';
import { ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { PostsServices } from './../../services/posts.service';
import { Actions } from '@ngrx/effects';
import { Injectable } from "@angular/core";

@Injectable()

export class PostsEffects {
  constructor(private actions$: Actions, private postsServices: PostsServices ){}

  loadPost$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(loadPost),
      mergeMap((action) => {
        return this.postsServices.getPost().pipe(map((post) => {
          return loadPostSucess({posts: post})
        }))
      })
      );
  })

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsServices.addPost(action.post).pipe(
          map((data) => {
            const post =  {...action.post, id: data.name}
            return addPostSucess({post})
          })
        )
      })
    )
  })

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsServices.updatePost(action.post).pipe(
          map((data) => {
            return updatePostSucess({ post: action.post})
          })
        )
      })
    )
  })

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsServices.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSucess({ id: action.id})
          })
        )
      })
    )
  })
}

