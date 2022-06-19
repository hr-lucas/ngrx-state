import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from './../../models/post.model';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getPostByid } from '../state/post.selectors';
import { updatePost } from '../state/post.actions';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post?: Post
  postForm2?: any
  postSubscription?: Subscription
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.postSubscription = this.store.select(getPostByid, { id }).subscribe(data => {
        this.post = data
        console.log(data);

        this.createForm()
      })
    })
  }
  createForm() {
    this.postForm2 = new FormGroup({
      title: new FormControl(this.post?.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post?.description, [Validators.required, Validators.minLength(10)]),
    })
  }
  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.postForm2.valid) {
      return
    }
    const title = this.postForm2.value.title,
      description = this.postForm2.value.description,
      post: Post = {
        id: this.post?.id,
        title,
        description
      }

        this.store.dispatch(updatePost({post}))
        this.router.navigate(['posts'])



  }
}
