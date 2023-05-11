import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile.component';
import { OverviewComponent } from 'src/app/components/overview/overview.component';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    OverviewComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserProfileModule { }
