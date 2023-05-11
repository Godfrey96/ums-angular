import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';


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
  {
    canActivate: [AuthGuard],
    data: { roles: 'ADMIN' },
    path: 'admin-dashboard',
    loadChildren: () => import('./pages/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    canActivate: [AuthGuard],
    data: { roles: 'USER' },
    path: 'user-dashboard',
    loadChildren: () => import('./pages/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
  },
  {
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN', 'USER']
    },
    path: 'user-profile',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    },
    path: 'all-users',
    loadChildren: () => import('./pages/all-users/all-users.module').then(m => m.AllUsersModule)
  },
  { path: '**', component: PageNotFoundComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
