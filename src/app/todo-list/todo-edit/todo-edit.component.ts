import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {TodoListService} from '../todo-list.service';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { Subject } from 'rxjs/Subject';
import { Todo } from '../todo.model';
@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit,OnDestroy {
  editMode=false;
  index:number;
  editedItemIndex:any;
  subscription:Subscription;
  @ViewChild('f') tlForm:NgForm;
  constructor(private tdlservice:TodoListService) { }

  ngOnInit() {
    this.subscription=this.tdlservice.startedEditing
    .subscribe(
      (res) => {
          this.index=res.index;
          this.editedItemIndex=res.id;
          this.editMode=true;
          this.tdlservice.getTodo(res.id)
          .subscribe((todo)=>{
          // console.log(todo);
            this.tlForm.setValue({
              todo:todo.text
            });
          });
      }
    );
  }

  onSubmit(form:NgForm){
   const value=form.value;
   const newTodo=value.todo;
   var todo={
     text:newTodo,
     completed:true
   }
   //console.log(newTodo);
    if(this.editMode){
      this.tdlservice.updateTodo(this.editedItemIndex,todo)
        .subscribe((td)=>{
          this.tdlservice.todoList[this.index].completed= td.todo.completed;
          console.log(td);
        });
    }
    else{
      this.tdlservice.addTodo(newTodo)
        .subscribe((res:Todo)=>{
          var todo=new Todo(
            res.text,
            res.completed,
            res.completedAt,
            res._creator,
            res._id
          );
          this.tdlservice.storeTodoList(todo);
        },(e)=>{
          console.log(e);
        });   
    } 
    this.editMode=false;
    form.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
