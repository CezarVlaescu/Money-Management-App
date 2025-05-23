import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchPageComponent } from './pages/launch-page/launch-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LaunchPageComponent
  // }
  {
    path: '',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
