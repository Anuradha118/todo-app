import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {SignInComponent} from './user-auth/signin/signin.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {TodoEditComponent} from './todo-list/todo-edit/todo-edit.component';
import { SignUpComponent } from './user-auth/signup/signup.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'todolist', component: TodoListComponent },
  { path: 'logout', component: SignInComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}