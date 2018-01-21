import { Subject } from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {Http,Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {UserAuthService} from '../user-auth/user-auth.service';
import {Todo} from './todo.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class TodoListService{
    constructor(private http:Http,
                private httpClient:HttpClient,
                private userAuthService:UserAuthService){
        console.log("Todo List Service is initialised");
    }
    // token:string;
    todoList:Todo[];
    startedEditing=new Subject<any>();
    // editTodo=new Subject<any>();
    private todoObj:any[]=[
        {item:'Wake up',completed:false},
        {item:'Breakfast',completed:false},
        {item:'Freshen Up',completed:false},
    ];

    getTodos(){
        // return this.todoObj.slice();
        let headers =new Headers({'Content-Type':'application/json','x-auth':localStorage.getItem('token')});
        let options= new RequestOptions({headers:headers});
        return this.http.get('http://localhost:3000/todos',options).map(res=>res.json());
    }

    getTodo(index:any){
        // let id=index;
        // console.log(index);
        let headers =new Headers({'Content-Type':'application/json','x-auth':localStorage.getItem('token')});
        let options= new RequestOptions({headers:headers});
        return this.http.get('http://localhost:3000/todos/'+index,options).map(res=>res.json());
    }

    addTodo(todo:string){
        console.log(todo);
        const body={text:todo};
        // const newTodoObj= {text:todo,completed:false};
        // console.log(newTodoObj);bc
        // let headers=new Headers({'Content-Type':'aplication/json','x-auth':localStorage.getItem('token')});
        // let options=new RequestOptions({headers:headers});
        return this.httpClient.post('http://localhost:3000/todos/',body,{
            headers: new HttpHeaders().set('x-auth', localStorage.getItem('token')),
          });
    }

    // storeTodoList(todos:any[]){
    //     this.todoList.push(...todos);
    //     // localStorage.setItem('todoList',JSON.stringify(todos));
    //     console.log(this.todoList);
    // }

    updateTodo(index:any, newTodo:any){
        // const updateTodoObj={item:newTodo,completed:false};
        // this.todoObj[index]=updateTodoObj;
        // this.todosChanged.next(this.todoObj.slice());
        let headers =new Headers({'Content-Type':'application/json','x-auth':localStorage.getItem('token')});
        let options= new RequestOptions({headers:headers});
        return this.http.patch('http://localhost:3000/todos/'+index,newTodo,options).map(res=>res.json());
    }


    completeTodo(index:number){
        // this.todoObj.splice(index,1);
        // this.todosChanged.next(this.todoObj.slice());
        let headers =new Headers({'Content-Type':'application/json','x-auth':localStorage.getItem('token')});
        let options= new RequestOptions({headers:headers});
        return this.http.delete('http://localhost:3000/todos/'+index,options).map(res=>res.json());
    }
}