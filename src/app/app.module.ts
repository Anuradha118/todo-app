import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {HttpModule} from "@angular/http";
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppComponent } from './app.component';
import { TodoEditComponent } from './todo-list/todo-edit/todo-edit.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {SignInComponent} from './user-auth/signin/signin.component';
import { UserAuthService } from './user-auth/user-auth.service';
import { AppRoutingModule } from './app-routing.module';
import {SignUpComponent} from './user-auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    TodoEditComponent,
    TodoListComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
  })
  ],
  providers: [UserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
