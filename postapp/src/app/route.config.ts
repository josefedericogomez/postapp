import { Routes } from '@angular/router';
import { CanActivateGuard } from './can-activate-guard';
import { FriendsComponent } from './components/friends/friends.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: MainComponent, canActivate: [CanActivateGuard], 
        children: [
            { path: 'posts', component: PostsComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'friends', component: FriendsComponent }
        ]
    }
];