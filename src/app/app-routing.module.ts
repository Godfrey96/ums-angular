import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
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
