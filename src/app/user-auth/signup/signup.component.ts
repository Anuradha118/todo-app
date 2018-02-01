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
    constructor(private userAuthService:UserAuthService,
        private router:Router){ }
      ngOnDestroy(): void {
          
      }
      ngOnInit(): void {
          
      }
      onSignUp(form:NgForm){
        const email = form.value.email;
        const password = form.value.password;

        this.userAuthService.userSignUp(email,password)
            .subscribe((res)=>{
                var data=res.json();
                var headers=res.headers;
                if(!data){
                    this.messageClass='alert alert-danger';
                    this.message='User not registered';
                }
                else{
                    this.messageClass='alert alert-success';
                    this.message='User login successful';
                    this.userAuthService.storeUserData(data.user,data.token);
                    this.router.navigate(['/todolist']);   
                }
            })
      }

    }