import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent {

  public user : User;


  constructor(private loginService: LoginService) {
      this.user = new User();
  }
  refresh(): void {
    window.location.reload();}
  validateLogin() {
    if(this.user.username=="abhilasha@gmail.com" && this.user.password=="singh123"){
        this.loginService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);

      }, error => {
        console.log('error is ', error);

      });
    } else{
      this.refresh();
      alert('enter valid user name and password');

    }
  }

}

