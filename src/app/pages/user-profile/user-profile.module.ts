import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile.component';
import { OverviewComponent } from 'src/app/components/overview/overview.component';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    OverviewComponent,
    EditProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserProfileModule { }
