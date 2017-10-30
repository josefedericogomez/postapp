import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpManagerService } from './http-manager.service';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  constructor(private httpManagerService: HttpManagerService) { }

  authenticateUser(email: string, password: string): Observable<boolean> {
    return this.httpManagerService.loginUser(email, password).map(user => !!user);
  }

  isUserAuthenticated(): boolean {
    return !!this.httpManagerService.currentUser;
  }

  logoutUser(): void {
    this.httpManagerService.logoutCurrentUser();
  }

}
