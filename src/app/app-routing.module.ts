import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: ShellComponent,
  //   // canActivate: [AuthGuard],
  //   // data: {
  //   //   expectedRole: ['admin', 'user']
  //   // },
  //   children: [
  //     { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
  //   ]
  // },
  // {
  //   path: 'change-password',
  //   // canActivate: [AuthGuard],
  //   // data: {
  //   //   expectedRole: ['admin', 'user']
  //   // },
  //   component: ChangePasswordComponent
  // },
  // { path: '', component: AdminDashboardComponent },
  { path: 'admin-dashboard', loadChildren: () => import('./pages/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) },
  { path: 'user-dashboard', loadChildren: () => import('./pages/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule) },
  { path: 'user-dashboard', loadChildren: () => import('./pages/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule) },
  { path: 'user-profile', loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule) },
  { path: 'all-users', loadChildren: () => import('./pages/all-users/all-users.module').then(m => m.AllUsersModule) },
  { path: '**', component: PageNotFoundComponent },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
