import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminCanActivate } from './auth/AdminCanActivate';
import { UserCanActivate } from './auth/UserCanActivate';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PublicComponent } from './components/public/public.component';
import { RestrictedComponent } from './components/restricted/restricted.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'restricted',
    component: RestrictedComponent,
    canActivate: [UserCanActivate],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminCanActivate],
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserCanActivate, AdminCanActivate],
})
export class AppRoutingModule {}
