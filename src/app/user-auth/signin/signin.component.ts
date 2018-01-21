import { OnInit, OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import {Router, ActivatedRoute} from '@angular/router';
import { UserAuthService } from "../user-auth.service";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit,OnDestroy{
    ngOnDestroy(): void {
        
    }
    ngOnInit(): void {
        
    }

    // @ViewChild('f') userForm:NgForm;
    messageClass;
    message;
    // isProcessing;
    constructor(private userAuthService:UserAuthService,
                private router:Router,
                private route:ActivatedRoute){

    }
    onSignin(form:NgForm){
        // this.isProcessing=true;
        // const value=form.value;
        const email= form.value.email;
        const password= form.value.password;
        // console.log(username,password);
        this.userAuthService.userSignIn(email,password)
            .subscribe((res)=>{
                console.log(res);
                var data=res.json();
                // var headers=res.headers;
                // console.log(headers);
                if(!data){
                    this.messageClass='alert alert-danger';
                    this.message='User not registered';
                    // this.isProcessing=false;
                }
                else{
                    console.log(data);
                    this.messageClass='alert alert-success';
                    this.message='User login successful';

                    // console.log(token);
                    this.userAuthService.storeUserData(data.user,data.token);
                    // this.userauthService.getToken();
                    this.router.navigate(['/todolist']);  
                }
            })
    }

}