import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {TodoListService} from '../todo-list.service';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit,OnDestroy {
  editMode=false;
  editedItemIndex:any;
  subscription:Subscription;
  editedItem:string;
  @ViewChild('f') tlForm:NgForm;
  constructor(private tdlservice:TodoListService) { }

  ngOnInit() {
    this.subscription=this.tdlservice.startedEditing
    .subscribe(
      (index:any) => {
          this.editedItemIndex=index;
          this.editMode=true;
          this.tdlservice.getTodo(index)
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
          // 
          console.log(td);
        });
    }
    else{
      this.tdlservice.addTodo(newTodo);
      // console.log(this.tdlservice.getTodos());   
    } 
    this.editMode=false;
    form.reset();
  }

  // onCompleted(){
  //   this.tdlservice.completeTodo(this.editedItemIndex);
  //   this.tlForm.reset();
  //   this.editMode=false;
  // }

  ngOnDestroy(){
    //this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

}
