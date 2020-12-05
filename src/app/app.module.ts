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
import { UserModule } from './components/user/user.module';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler';
import { RouteHandlerInterceptor } from './core/interceptors/route-handler';
import { MaterialModule } from './core/material/material.module';
import { CommentService } from './core/services/comment.service';
import { storageServiceProvider } from './core/services/storage.service';
import { TvShowService } from './core/services/tv-show.service';
import { UserService } from './core/services/user.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationModule,
    SharedModule,
    GeneralModule,
    UserModule
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
