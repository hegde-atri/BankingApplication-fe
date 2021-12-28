import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficerViewTransactionsComponent } from './officer-view-transactions/officer-view-transactions.component';
import { CreateCustomerAccountComponent } from './create-customer-account/create-customer-account.component';
import {ReactiveFormsModule} from "@angular/forms";
import { OfficerNavbarComponent } from './officer-navbar/officer-navbar.component';
import { RouterModule, Routes } from '@angular/router';
import {OfficerGuard} from "../guards/officer.guard";
import { OfficerManageDbComponent } from './officer-manage-db/officer-manage-db.component';

const routes: Routes = [
  {
    path: 'officer',
    canActivate: [OfficerGuard],
    children:[
      {
        path: 'view-transactions',
        component: OfficerViewTransactionsComponent
      },
      {
        path: '',
        redirectTo: 'view-transactions',
        pathMatch: 'full'
      },
      {
        path: 'create-customer',
        component: CreateCustomerAccountComponent
      },
      {
        path: 'manage-db',
        component: OfficerManageDbComponent
      }
    ]
  }

]


@NgModule({
  declarations: [
    OfficerViewTransactionsComponent,
    CreateCustomerAccountComponent,
    OfficerNavbarComponent,
    OfficerManageDbComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OfficerModule { }
