import { AppState } from './../../store/app.state';
import { Store } from '@ngrx/store';
import { Post } from './../../models/post.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { addPost } from '../state/post.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup

  constructor(
    private Store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    })
  }

  onAddPost(){
    if(!this.postForm.valid){
      return
    }

    const post: Post = {
      title: this.postForm.value.title,
      description:this.postForm.value.description
    }
    this.Store.dispatch(addPost({post}))
    this.postForm.reset()
  }

}
