import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { HttpManagerService } from './services/http-manager.service';
import { AuthService } from './services/auth.service';
import { CanActivateGuard } from './can-activate-guard';

import { appRoutes } from './route.config';
import { MainComponent } from './components/main/main.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FriendsComponent } from './components/friends/friends.component';
import { PluralizePipe } from './pipes/pluralize.pipe';
import { EllipsisDirective } from './directives/ellipsis.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PostsComponent,
    ProfileComponent,
    FriendsComponent,
    PluralizePipe,
    EllipsisDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true, useHash: true })
  ],
  providers: [HttpManagerService, AuthService, CanActivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
