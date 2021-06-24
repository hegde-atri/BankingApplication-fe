import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ManagerNavbarComponent } from './manager-navbar/manager-navbar.component';
import { PendingApprovalsComponent } from './pending-approvals/pending-approvals.component';



@NgModule({
  declarations: [
    CreateUserComponent,
    ViewUsersComponent,
    ManagerNavbarComponent,
    PendingApprovalsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ManagerModule { }
