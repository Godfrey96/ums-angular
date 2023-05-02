import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListOfUsersComponent } from './list-of-users/list-of-users.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListOfUsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
