import { loadPost } from './../state/post.actions';
import { getPosts } from './../state/post.selectors';
import { Post } from './../../models/post.model';
import { AppState } from './../../store/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { deletePost } from '../state/post.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts!: Observable<Post[]>
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts)
    this.store.dispatch(loadPost())
  }

  onDeletePost(id:any){
    if(confirm('Você gostaria de deletar este post?')){
      this.store.dispatch(deletePost({ id}))
    }
  }

}
