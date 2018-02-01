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
    todoList=[];
    startedEditing=new Subject<any>();
    

    getTodos(){
        let headers =new Headers({'Content-Type':'application/json','x-auth':localStorage.getItem('token')});
        let options= new RequestOptions({headers:headers});
        return this.http.get('/todos',options).map(res=>res.json());
    }

    getTodo(index:any){
        let headers =new Headers({'Content-Type':'application/json','x-auth':localStorage.getItem('token')});
        let options= new RequestOptions({headers:headers});
        return this.http.get('/todos/'+index,options).map(res=>res.json());
    }

    addTodo(todo:string){
        const body={text:todo};
        return this.httpClient.post('/todos/',body,{
            headers: new HttpHeaders().set('x-auth', localStorage.getItem('token')),
          });
    }

    storeTodoList(todo:Todo){
        this.todoList.push(todo);
    }

    updateTodo(index:any, newTodo:any){
        let headers =new Headers({'Content-Type':'application/json','x-auth':localStorage.getItem('token')});
        let options= new RequestOptions({headers:headers});
        return this.http.patch('/todos/'+index,newTodo,options).map(res=>res.json());
    }


    completeTodo(index:number){
        let headers =new Headers({'Content-Type':'application/json','x-auth':localStorage.getItem('token')});
        let options= new RequestOptions({headers:headers});
        return this.http.delete('/todos/'+index,options).map(res=>res.json());
    }
}