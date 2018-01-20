import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { UserAuthService } from "./user-auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:UserAuthService,
                private router:Router){}

    canActivate():boolean{
        if(this.authService.isAuthenticated()){
            return true;
        }
        else{
            this.router.navigate(['/']);
            return false;
        }
        // return this.authService.isAuthenticated();
            // .then(
            //     (authenticated:boolean)=>{
            //         if(authenticated){
            //             // console.log(authenticated);
            //             return true;
            //         }else{
            //             this.router.navigate(['/']);
            //         }
            //     });
    }
    //  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    //      return this.authService.isAuthenticated();
    //  }
}