import { Component, OnInit, Input } from '@angular/core';
import { HttpManagerService } from '../../services/http-manager.service';
import { User } from '../../models/user';
import { UserPost } from '../../models/user-post';
import { Post } from '../../models/post';
import { Observable } from "rxjs";

@Component({
  selector: 'pst-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  private currentUser: User;
  userPosts: UserPost[];

  constructor(private httpManagerService: HttpManagerService) { }

  ngOnInit() {
    this.userPosts = [];
    this.currentUser = this.httpManagerService.currentUser;
    this.getPosts(this.currentUser);
  }

  private getPosts(currentUser: User){
    const userIds = currentUser.friendIds.slice().concat(currentUser.id);
    this.httpManagerService.getPosts(userIds).subscribe(posts => {
      this.fillUserPosts(posts);
    });
  }

  private getUser(userId: number): User {
    return this.httpManagerService.currentUser.id === userId ? 
      this.httpManagerService.currentUser : 
      this.httpManagerService.friends.find(f => f.id === userId);
  }

  private fillUserPosts(posts: Post[]): void{
    posts.forEach(post => {
      var user = this.getUser(post.userId);
      let userPost: UserPost = { post: post, user: user, hasMyLike: post.friendIds.includes(this.currentUser.id) }; 
      this.userPosts.push(userPost);
    });
  }

  like(userPost: UserPost): void {
    var post: Post;
    if(userPost.hasMyLike){
      post = this.doNotLikeAnymore(userPost.post, this.currentUser.id);
    } else {
      post = this.doLike(userPost.post, this.currentUser.id);
    }
    this.updatePost(post);
  }

  private doLike(post: Post, userId: number): Post {
    let currentPost = Object.assign({}, post);
    currentPost.friendIds.push(userId);
    return currentPost;
  }

  private doNotLikeAnymore(post: Post, userId: number): Post{
    let currentPost = Object.assign({}, post);
    var index = currentPost.friendIds.indexOf(userId);
    currentPost.friendIds.splice(index, 1);
    return currentPost;
  }

  private updatePost(post: Post): void {
    this.httpManagerService.updatePost(post).subscribe(() => {
      var userPost = this.userPosts.find(up => up.post.id === post.id);
      userPost.post = post;
      userPost.hasMyLike = userPost.post.friendIds.includes(this.currentUser.id);
    });
  }

  addNewPost(value: string): void{
    var newPost: Post = {
      id: undefined, 
      comment: value,
      date: new Date(),
      userId: this.httpManagerService.currentUser.id,
      friendIds: []
    };

    this.httpManagerService.addPost(newPost).subscribe(updatedPost => {
      let userPost: UserPost = { post: updatedPost, user: this.httpManagerService.currentUser, hasMyLike: false }; 
      this.userPosts.unshift(userPost);
    });
  }

  getTitle(userPost: UserPost): string{
    return userPost.hasMyLike ? 'Undo Like' : 'Like';
  }
}
