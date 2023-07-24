import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  imgUrl : string;
  
  constructor(private authService: AuthService, private router: Router,private userService : UserService) {
    this.userService.getUserByUsername(localStorage.getItem('currentUser')).subscribe(res=>{
      console.log(res)
      if(res.image != undefined){
        this.imgUrl = 'data:image/jpeg;base64,' + res.image
      }
    })
  }

  logOut() {
    this.authService.logout();
    this.authService.removeCurrentUser()
    this.router.navigate(['']);
  }
  editProfile(){
    this.router.navigate(['profile/'+localStorage.getItem('currentUser')])
  }
}
