import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Todo } from './todo.model';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers:[TodoListService]
})
export class TodoListComponent implements OnInit,OnDestroy {
todos:Todo[];
private subscription:Subscription;
  constructor(private tlservice:TodoListService) { }

  ngOnInit() {
    this.subscription=this.tlservice.getTodos()
      .subscribe(data=>{
        // console.log(data.todos);
        this.todos=[new Todo(
          data.todos[0].text,
          data.todos[0].completed,
          data.todos[0].completedAt,
          data.todos[0]._creator,
          data.todos[0]._id
        )];
        for(var i=1;i<data.todos.length;i++){
          var todo=new Todo(
            data.todos[i].text,
            data.todos[i].completed,
            data.todos[i].completedAt,
            data.todos[i]._creator,
            data.todos[i]._id
          );
          this.todos.push(todo);
        }  
        
        console.log(this.todos);
        this.tlservice.todoList=this.todos; 
        //  console.log(this.tlservice.todoList);
      });
  }

  onEditItem(id:any,index:number){

    this.tlservice.startedEditing.next({id,index});
  }
  deleteSelectedTodos(){
    for(var i=(this.tlservice.todoList.length -1); i > -1; i--) {
      console.log(this.tlservice.todoList[i].id);
      if(this.tlservice.todoList[i].completed) {
        // this.tlservice.todoList.splice(i, 1);
        this.onDeleteItem(this.tlservice.todoList[i].id,i);
      }
    }
  }
  onDeleteItem(id:any,index:number){
    if(this.tlservice.todoList[index].completed){
      this.tlservice.completeTodo(id)
      .subscribe((res)=>{
        this.tlservice.todoList.splice(index,1);
      });
    }
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
    localStorage.clear();
  }

}
