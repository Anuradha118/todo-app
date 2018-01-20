import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {SignInComponent} from './user-auth/signin/signin.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {TodoEditComponent} from './todo-list/todo-edit/todo-edit.component';
import { SignUpComponent } from './user-auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './user-auth/auth-guard.service';

const appRoutes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'todolist',canActivate:[AuthGuard],component: TodoListComponent },
  { path: 'logout', component: SignInComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}