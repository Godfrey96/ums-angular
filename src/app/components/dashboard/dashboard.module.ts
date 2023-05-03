import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListOfUsersComponent } from './list-of-users/list-of-users.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ListOfUsersComponent,
    UserDashComponent,
    AdminDashComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  // exports: [
  //   DashboardComponent,
  //   // ListOfUsersComponent
  // ]
})
export class DashboardModule { }
