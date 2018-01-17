import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import {Router} from '@angular/router';
import { UserAuthService } from "../user-auth.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
  })
  export class SignUpComponent implements OnInit,OnDestroy{
      messageClass;
      message;
    constructor(private userauthService:UserAuthService,
        private router:Router){ }
      ngOnDestroy(): void {
          
      }
      ngOnInit(): void {
          
      }
      onSignUp(form:NgForm){
        const email = form.value.email;
        const password = form.value.password;

        this.userauthService.userSignUp(email,password)
            .subscribe((res)=>{
                var data=res.json();
                var headers=res.headers;
                console.log(headers);
                if(!data){
                    this.messageClass='alert alert-danger';
                    this.message='User not registered';
                }
                else{
                    console.log(data);
                    this.messageClass='alert alert-success';
                    this.message='User login successful';
                    var token=headers.get('x-auth');
                    console.log(token);
                    this.userauthService.storeUserData(data.user,token);
                    setTimeout(()=>{
                        this.router.navigate(['/todolist']);
                    },2000);
                }
            })
      }

    }