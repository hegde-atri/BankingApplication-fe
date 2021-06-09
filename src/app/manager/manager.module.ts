import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveAccountComponent } from './approve-account/approve-account.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';



@NgModule({
  declarations: [
    ApproveAccountComponent,
    CreateUserComponent,
    ViewUsersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ManagerModule { }
