import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ManagerNavbarComponent } from './manager-navbar/manager-navbar.component';
import { PendingApprovalsComponent } from './pending-approvals/pending-approvals.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'manager/create-user-component', component: CreateUserComponent },
  {
    path: 'manager',
    redirectTo: 'manager/create-user-component',
    pathMatch: 'full',
  },
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
