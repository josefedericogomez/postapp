import { Component, OnInit } from '@angular/core';
import { HttpManagerService } from '../../services/http-manager.service';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private httpManagerService: HttpManagerService) { }

  ngOnInit() {
    this.loadFriends();
  }

  private loadFriends(): void {
    const friendIds: number[] = this.httpManagerService.currentUser.friendIds;
    if(friendIds.length){
      this.httpManagerService.loadFriends(friendIds).subscribe(() => {});
    }
  }

}
