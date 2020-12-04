import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { GeneralModule } from './components/general/general.module';
import { SharedModule } from './components/shared/shared.module';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserCommentsCountComponent } from './components/user/user-comments-count/user-comments-count.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler';
import { RouteHandlerInterceptor } from './core/interceptors/route-handler';
import { MaterialModule } from './core/material/material.module';
import { CommentService } from './core/services/comment.service';
import { storageServiceProvider } from './core/services/storage.service';
import { TvShowService } from './core/services/tv-show.service';
import { UserService } from './core/services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    UserListComponent,
    UserCommentsCountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    AuthenticationModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    GeneralModule,
  ],
  providers: [
    UserService,
    TvShowService,
    CommentService,
    storageServiceProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RouteHandlerInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
