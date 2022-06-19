import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { counterReducer } from '../counter/state/counter.reducer';
import { postReducer } from './state/post.reducer';
import { PostsEffects } from './state/post.effects';

const router = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      {
        path:'add',
        component: AddPostComponent
      },
      {
        path:'edit/:id',
        component: EditPostComponent
      }
    ]

  }
]

@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    ReactiveFormsModule,
    EffectsModule.forFeature([PostsEffects]),
    StoreModule.forFeature('posts', postReducer)
  ]
})
export class PostsModule { }
