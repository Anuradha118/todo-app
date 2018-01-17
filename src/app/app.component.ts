import { Component} from '@angular/core';
import {TodoListService} from '../app/todo-list/todo-list.service';
import { LocalStorageService } from 'angular-2-local-storage';
// import {LocalStorageService} from "angular2-localstorage/LocalStorageEmitter";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[TodoListService,LocalStorageService]
})
export class AppComponent {
  
}
