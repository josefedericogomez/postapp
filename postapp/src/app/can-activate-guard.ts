import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class CanActivateGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    const authenticated: boolean = this.authService.isUserAuthenticated();
    
    if (!authenticated) { 
      this.router.navigate(['/login']);
    }

    return authenticated;
  }
}