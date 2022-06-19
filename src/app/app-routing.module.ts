import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'counter',
    loadChildren: () =>
      import('./counter/counter.module').then((m) => m.CounterModule)

  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
      canActivate: [AuthGuard]
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModel )
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: []
})


export class AppRoutingModule { }
