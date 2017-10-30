import { Component, OnInit } from '@angular/core';
import { HttpManagerService } from '../../services/http-manager.service';
import { User } from '../../models/user';

@Component({
  selector: 'pst-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;

  constructor(private httpManagerService: HttpManagerService) { }

  ngOnInit() {
    this.currentUser = this.httpManagerService.currentUser;
  }

}
