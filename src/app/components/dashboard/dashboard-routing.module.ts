import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListOfUsersComponent } from './list-of-users/list-of-users.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AdminDashComponent } from './admin-dash/admin-dash.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'list',
    component:
      ListOfUsersComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   expectedRole: ['admin']
    // },
  },
  {
    path: 'admin-dash',
    component: AdminDashComponent
  },
  {
    path: 'users',
    component: UserDashComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   expectedRole: ['user']
    // },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
