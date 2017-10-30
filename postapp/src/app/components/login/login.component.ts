import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'pst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.logoutUser();
  }

  login(): void {
    this.authService.authenticateUser(this.email, this.password).subscribe(isValid => {
      this.invalidLogin = !isValid;
      if(isValid){
        this.router.navigate(['/posts']);
      }
    });
  }

}
