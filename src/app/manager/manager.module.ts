import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerNavbarComponent } from './manager-navbar/manager-navbar.component';
import { RouterModule, Routes } from '@angular/router';
import {ManagerGuard} from "../guards/manager.guard";
import { ManagerViewCustomersComponent } from './manager-view-customers/manager-view-customers.component';
import { ManagerViewTellersComponent } from './manager-view-tellers/manager-view-tellers.component';
import { ManagerViewOfficersComponent } from './manager-view-officers/manager-view-officers.component';
import { ManagerManageDbComponent } from './manager-manage-db/manager-manage-db.component';
import { ManagerCreateUserComponent } from './manager-create-user/manager-create-user.component';

const routes: Routes = [
  {
    path: 'manager',
    canActivate: [ ManagerGuard ],
    children: [
      {
        path: 'create-user',
        component: ManagerCreateUserComponent
      },
      {
        path: '',
        redirectTo: 'create-user',
        pathMatch: 'full',
      },
      {
        path: 'view-customers',
        component: ManagerViewCustomersComponent
      },
      {
        path: 'view-tellers',
        component: ManagerViewTellersComponent
      },
      {
        path: 'view-officers',
        component: ManagerViewOfficersComponent
      },
      {
        path: 'manage-db',
        component: ManagerManageDbComponent
      }

    ]
  }

];

@NgModule({
  declarations: [
    ManagerNavbarComponent,
    ManagerViewCustomersComponent,
    ManagerViewTellersComponent,
    ManagerViewOfficersComponent,
    ManagerManageDbComponent,
    ManagerCreateUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class ManagerModule {}
