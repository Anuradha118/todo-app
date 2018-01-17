import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers:[TodoListService]
})
export class TodoListComponent implements OnInit,OnDestroy {
todos:any[];
private subscription:Subscription;
  constructor(private tlservice:TodoListService) { }

  ngOnInit() {
    // this.todos=this.tlservice.getTodos();
    // this.subscription=this.tlservice.todosChanged
    // .subscribe(
    //   (todos:any[])=>{
    //     //console.log(todos[0]);
    //     this.todos=todos;
    //   }
    // );
    //console.log(this.todos);
    this.subscription=this.tlservice.getTodos()
      .subscribe(todos=>{
        console.log(todos);
        // console.log(todos.todos[0]);
        this.todos=todos.todos;
      });
  }

  onEditItem(index:any){
    this.tlservice.startedEditing.next(index);
  }
  deleteSelectedTodos(){
    for(var i=(this.todos.length -1); i > -1; i--) {
      if(this.todos[i].completed) {
        this.todos.splice(i, 1);
      }
    }
  }
  onDeleteItem(index:number){
    this.tlservice.completeTodo(index);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
