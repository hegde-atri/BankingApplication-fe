import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficerViewTransactionsComponent } from './officer-view-transactions/officer-view-transactions.component';
import {ReactiveFormsModule} from "@angular/forms";
import { OfficerNavbarComponent } from './officer-navbar/officer-navbar.component';
import { RouterModule, Routes } from '@angular/router';
import {OfficerGuard} from "../guards/officer.guard";
import { OfficerCreateCustomerAccountComponent } from './officer-create-customer-account/officer-create-customer-account.component';
import { OfficerEditCustomerProfileComponent } from './officer-edit-customer-profile/officer-edit-customer-profile.component';
import { OfficerViewAccountsComponent } from './officer-view-accounts/officer-view-accounts.component';

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
        path: 'edit-customer-profile',
        component: OfficerEditCustomerProfileComponent
      },
      {
        path: 'view-accounts',
        component: OfficerViewAccountsComponent
      }

    ]
  }

]


@NgModule({
  declarations: [
    OfficerViewTransactionsComponent,
    OfficerCreateCustomerAccountComponent,
    OfficerNavbarComponent,
    OfficerCreateCustomerAccountComponent,
    OfficerEditCustomerProfileComponent,
    OfficerViewAccountsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OfficerModule { }
