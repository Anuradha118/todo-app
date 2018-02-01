import { Http,Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class UserAuthService{
    authToken:string;
    user;
    loggedIn=false;
    constructor(private http:Http){
        console.log("Service initialised");
    }

    userSignUp(email,password){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/users',{email:email,password:password},options);
    }
    userSignIn(email,password){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/users/login',{email:email,password:password},options);
    }

    storeUserData(user,token){
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(user));
        this.authToken=localStorage.getItem('token');
    }
    isAuthenticated(){
        return (localStorage.getItem('token') === this.authToken);
    }
    
    userLogout(){
        let headers =new Headers({'Content-Type':'application/json','x-auth':localStorage.getItem('token')});
        let options= new RequestOptions({headers:headers});
        this.http.delete('/users/me/token',options)
            .subscribe((res)=>{
                if(res.status===200){
                  localStorage.clear();
                  this.authToken='';
                }
            }
        );
    }
}