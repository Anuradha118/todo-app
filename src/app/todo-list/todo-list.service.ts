import { Subject } from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {Http,Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {UserAuthService} from '../user-auth/user-auth.service';

@Injectable()
export class TodoListService{
    constructor(private http:Http,
                private userAuthService:UserAuthService){
        console.log("Todo List Service is initialised");
    }
    // token:string;
    todosChanged = new Subject<string[]>();
    startedEditing=new Subject<any>();
    private todoObj:any[]=[
        {item:'Wake up',completed:false},
        {item:'Breakfast',completed:false},
        {item:'Freshen Up',completed:false},
    ];

    getTodos(){
        // return this.todoObj.slice();
        let headers =new Headers({'Content-Type':'application/json','x-auth':this.userAuthService.authToken});
        let options= new RequestOptions({headers:headers});
        return this.http.get('http://localhost:3000/todos',options).map(res=>res.json());
    }

    getTodo(index:any){
        // let id=index;
        // console.log(index);
        let headers =new Headers({'Content-Type':'application/json','x-auth':this.userAuthService.authToken});
        let options= new RequestOptions({headers:headers});
        return this.http.get('http://localhost:3000/todos/'+index,options).map(res=>res.json());
    }

    addTodo(todo:string){
        const newTodoObj= {item:todo,completed:false};
        this.todoObj.push(newTodoObj);
        this.todosChanged.next(this.todoObj.slice());
    }

    // addIngredients(ingredients:Ingredient[]){
    //     // for (let ingredient of ingredients){
    //     //     this.addIngredient(ingredient);
    //     // }
    //     this.ingredients.push(...ingredients);
    //     // this.ingredientsChanged.emit(this.ingredients.slice());
    //     this.ingredientsChanged.next(this.ingredients.slice());
    // }

    updateTodo(index:any, newTodo:any){
        // const updateTodoObj={item:newTodo,completed:false};
        // this.todoObj[index]=updateTodoObj;
        // this.todosChanged.next(this.todoObj.slice());
        let headers =new Headers({'Content-Type':'application/json','x-auth':this.userAuthService.authToken});
        let options= new RequestOptions({headers:headers});
        return this.http.patch('http://localhost:3000/todos/'+index,newTodo,options).map(res=>res.json());
    }

    completeTodo(index:number){
        this.todoObj.splice(index,1);
        this.todosChanged.next(this.todoObj.slice());
    }
}