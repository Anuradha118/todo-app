import { Http,Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
// import { setTimeout } from "timers";

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
        return this.http.post('http://localhost:3000/users',{email:email,password:password},options);
    }
    userSignIn(email,password){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/users/login',{email:email,password:password},options);
    }

    storeUserData(user,token){
        console.log(user);
        localStorage.setItem('token',token);
        console.log(localStorage.getItem('token') +' abc');
        localStorage.setItem('user',JSON.stringify(user));
        // this.authToken=localStorage.getItem('token');
        // console.log(this.authToken);       
        // this.user=user;
    }
    isAuthenticated(){
        return !(localStorage.getItem('token') === null);
        // localStorage.setItem('token',"abc123");
        // if(localStorage.getItem('token')===null){
        //     return false;
        // }else{
        //     let headers =new Headers({'Content-Type':'application/json','x-auth':localStorage.getItem('token')});
        //     let options= new RequestOptions({headers:headers});
        //     this.http.get('http://localhost:3000/users/me',options)
        //     .subscribe((res)=>{
        //         var data=res.json();
        //         if(data==="User Not Authorized"){
        //             return false;
        //         }else{
        //             // alert(res);
        //             return true;
        //         }
        //     });
        // }
        // const token=localStorage.getItem('token');
        // this.loggedIn = tokenNotExpired(token);
        // // console.log(this.loggedIn);
        // const promise=new Promise((resolve,reject)=>{
        //     setTimeout(()=>{
        //         resolve(this.loggedIn);
        //     },800);
        // });
        // return promise;
    }
    
    userLogout(){
        let headers =new Headers({'Content-Type':'application/json','x-auth':localStorage.getItem('token')});
        let options= new RequestOptions({headers:headers});
        this.http.delete('http://localhost:3000/users/me/token',options)
            .subscribe((res)=>{
                if(res.status===200){
                    console.log('A');
                  localStorage.clear();
                }
            }
        );
    }
}