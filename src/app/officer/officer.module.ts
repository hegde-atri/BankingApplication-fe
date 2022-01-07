import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficerViewTransactionsComponent } from './officer-view-transactions/officer-view-transactions.component';
import {ReactiveFormsModule} from "@angular/forms";
import { OfficerNavbarComponent } from './officer-navbar/officer-navbar.component';
import { RouterModule, Routes } from '@angular/router';
import {OfficerGuard} from "../guards/officer.guard";
import { OfficerManageDbComponent } from './officer-manage-db/officer-manage-db.component';
import { OfficerCreateCustomerAccountComponent } from './officer-create-customer-account/officer-create-customer-account.component';

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
        component: OfficerCreateCustomerAccountComponent
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
    OfficerCreateCustomerAccountComponent,
    OfficerNavbarComponent,
    OfficerManageDbComponent,
    OfficerCreateCustomerAccountComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OfficerModule { }
