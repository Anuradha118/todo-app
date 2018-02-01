import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth/user-auth.service';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isAuthenticated=false;
  constructor(private userAuthService:UserAuthService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
  }

  loggedIn(){
    return this.userAuthService.isAuthenticated();   
  }
  onLogout(){
      this.userAuthService.userLogout();
      this.router.navigate(['logout'],{relativeTo:this.route});    
  }
}
