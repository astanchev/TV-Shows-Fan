import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { GeneralModule } from './components/general/general.module';
import { SharedModule } from './components/shared/shared.module';
import { MaterialModule } from './core/material/material.module';
import { storageServiceProvider } from './core/services/storage.service';
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
    SharedModule,
    GeneralModule,
    AuthenticationModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UserService,
    storageServiceProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
