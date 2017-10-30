import { Component, OnInit, Input } from '@angular/core';
import { HttpManagerService } from '../../services/http-manager.service';
import { User } from '../../models/user';
import { Observable } from "rxjs";

@Component({
  selector: 'pst-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  currentFriends: User[];
  suggestedFriends: User[];

  constructor(private httpManagerService: HttpManagerService) { }

  ngOnInit() {
    this.currentFriends = this.httpManagerService.friends;
    this.loadSuggestedFriends(this.httpManagerService.currentUser);
  }

  loadSuggestedFriends(currentUser: User): void {
    this.httpManagerService.getAllUsers().subscribe(users => {
      const suggestedFriendsIds = currentUser.friendIds.slice().concat(currentUser.id);
      this.suggestedFriends = users.filter(u => {
        return !suggestedFriendsIds.some(id => id === u.id);
      });
    });
  }

  follow(friendId: number): void{
    let currentUser = Object.assign({}, this.httpManagerService.currentUser);
    currentUser.friendIds.push(friendId);
    this.updateUser(currentUser, friendId, this.suggestedFriends, this.currentFriends);
  }

  unfollow(friendId: number): void{
    let currentUser = Object.assign({}, this.httpManagerService.currentUser);
    var index = currentUser.friendIds.indexOf(friendId);
    currentUser.friendIds.splice(index, 1);
    this.updateUser(currentUser, friendId, this.currentFriends, this.suggestedFriends);
  }

  private updateUser(user: User, friendId: number, previous:User[], next: User[]): void{
    this.httpManagerService.updateUser(user).subscribe(() => {
      var friend = previous.find(u => u.id === friendId);
      
      var index = previous.indexOf(friend);
      previous.splice(index, 1);
      
      next.push(friend);
    });
  }

}
