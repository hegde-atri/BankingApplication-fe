import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ManagerNavbarComponent } from './manager-navbar/manager-navbar.component';
import { PendingApprovalsComponent } from './pending-approvals/pending-approvals.component';
import { RouterModule, Routes } from '@angular/router';
import {ManagerGuard} from "../guards/manager.guard";

const routes: Routes = [
  {
    path: 'manager',
    canActivate: [ ManagerGuard ],
    children: [
      { path: 'create-user-component', component: CreateUserComponent },
      {
        path: '',
        redirectTo: 'create-user-component',
        pathMatch: 'full',
      },
    ]
  }

];

@NgModule({
  declarations: [
    CreateUserComponent,
    ViewUsersComponent,
    ManagerNavbarComponent,
    PendingApprovalsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class ManagerModule {}
