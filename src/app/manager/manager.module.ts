import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerNavbarComponent } from './manager-navbar/manager-navbar.component';
import { RouterModule, Routes } from '@angular/router';
import {ManagerGuard} from "../guards/manager.guard";
import { ManagerViewCustomersComponent } from './manager-view-customers/manager-view-customers.component';
import { ManagerManageUsersComponent } from './manager-manage-users/manager-manage-users.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";

const routes: Routes = [
  {
    path: 'manager',
    canActivate: [ ManagerGuard ],
    children: [
      {
        path: 'manage-users',
        component: ManagerManageUsersComponent
      },
      {
        path: '',
        redirectTo: 'view-customers',
        pathMatch: 'full',
      },
      {
        path: 'view-customers',
        component: ManagerViewCustomersComponent
      }

    ]
  }

];

@NgModule({
  declarations: [
    ManagerNavbarComponent,
    ManagerViewCustomersComponent,
    ManagerManageUsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule
  ],
})
export class ManagerModule {}
