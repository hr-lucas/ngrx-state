import { Post } from './../models/post.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})


export class PostsServices {

  constructor(private http: HttpClient) { }

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>(`https://lastngrx-default-rtdb.firebaseio.com/posts.json`).pipe(map((data) => {
      const post: Post[] = [];
      for (let key in data) {
        post.push({...data[key], id: key})
      }
      return post
    }))
  }

  addPost(post: Post):Observable<{name: string}>{
    return this.http.post<{name: string}>(`https://lastngrx-default-rtdb.firebaseio.com/posts.json`, post)
  }

  updatePost(post:Post){
    const postData = {
      [post.id]: {title: post.title, description: post.description},
    }
    return this.http.patch(`https://lastngrx-default-rtdb.firebaseio.com/posts.json`, postData)

  }


  deletePost(id: string){
    return this.http.delete(`https://lastngrx-default-rtdb.firebaseio.com/posts.json?id=${id}`)
  }


}
