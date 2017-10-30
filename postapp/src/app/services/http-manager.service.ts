import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subscriber } from 'rxjs';

import { User } from '../models/user';
import { Post } from '../models/post';

import 'rxjs/add/operator/map';

@Injectable()
export class HttpManagerService {

  private readonly SERVER_URL: string = 'http://localhost:3000';
  private loggedInUser: User;
  private currentFriends: User[];

  constructor(private http: Http) { }
  
  get currentUser(): User {
    return this.loggedInUser;
  }

  logoutCurrentUser(): void {
    this.loggedInUser = undefined;
    this.currentFriends = undefined;
  }

  get friends(): User[] {
    if(!this.currentFriends){
      this.currentFriends = [];
    }
    return this.currentFriends;
  }

  loginUser(email: string, password: string): Observable<User>{
    /*por algun motivo la linea comentada trae todos los usuarios cuando email y password son undefined, pasando los parametros por query string anda bien*/
    //return this.http.get(`${this.SERVER_URL}/users`, { params: { email: email, password: password }}).map(data => {
    return this.http.get(`${this.SERVER_URL}/users?email=${email}&password=${password}`).map(data => {
      this.loggedInUser = data.json()[0];
      return this.loggedInUser;
    });
  }

  loadFriends(userIds: number[]): Observable<User[]>{
    return this.http.get(`${this.SERVER_URL}/users`, { params: { id: userIds }}).map(data => {
      this.currentFriends = data.json();
      return this.friends;
    });
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get(`${this.SERVER_URL}/users`).map(data => data.json());
  }

  getPosts(userIds: number[]): Observable<Post[]>{
    return this.http.get(`${this.SERVER_URL}/posts`, { params: { userId: userIds, _sort: "date", _order: "DESC" }}).map(data => data.json());
  }

  updateUser(user: User): Observable<void> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.SERVER_URL}/users/${user.id}`, user, options).map(data => {
      this.loggedInUser = user;
    });
  }

  updatePost(post): Observable<void> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.SERVER_URL}/posts/${post.id}`, post, options).map(() => {});
  }

  addPost(post): Observable<Post> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.SERVER_URL}/posts`, post, options).map(response => {
      return response.json();
    });
  }

}
