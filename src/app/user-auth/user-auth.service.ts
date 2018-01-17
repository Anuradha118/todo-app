import { Http,Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
// import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class UserAuthService{
    authToken:string;
    user;
    constructor(private http:Http){
        console.log("Service initialised");
    }

    userSignUp(email,password){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/users',{email:email,password:password},options);
    }
    userSignIn(email,password){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/users/login',{email:email,password:password},options);
    }

    storeUserData(user,token){
        // console.log(token);
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(user));
        this.authToken=token;
        // console.log(this.authToken);       
        this.user=user;
    }
    isAuthenticated(){
        return this.authToken != null;
    }

    userLogout(){
        let headers =new Headers({'Content-Type':'application/json','x-auth':this.authToken});
        let options= new RequestOptions({headers:headers});
        this.http.delete('http://localhost:3000/users/me/token',options)
            .subscribe((res)=>{
                if(res.status===200){
                  this.authToken=null;
                }
            }
        );
    }
}