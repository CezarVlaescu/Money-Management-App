import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LaunchPageComponent } from './pages/launch-page/launch-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginPageRegisterComponent } from './pages/login-page/components/login-page-register/login-page-register.component';
import { LoginPageLoginComponent } from './pages/login-page/components/login-page-login/login-page-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LaunchPageComponent,
    LoginPageRegisterComponent,
    LoginPageLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LoginPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
