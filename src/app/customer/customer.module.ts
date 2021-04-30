import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNavbarComponent } from './customer-navbar/customer-navbar.component';
import { CustomerMyViewComponent } from './customer-my-view/customer-my-view.component';
import { CustomerPersonalDetailsComponent } from './customer-personal-details/customer-personal-details.component';
import { CustomerUpdateDetailsComponent } from './customer-update-details/customer-update-details.component';
import { CustomerAccountSummaryComponent } from './customer-account-summary/customer-account-summary.component';
import { CustomerTransactionHistoryComponent } from './customer-transaction-history/customer-transaction-history.component';
import { CustomerRegisterPayeeComponent } from './customer-register-payee/customer-register-payee.component';
import { CustomerFundTransferComponent } from './customer-fund-transfer/customer-fund-transfer.component';
import { CustomerReportViewComponent } from './customer-report-view/customer-report-view.component';
import { CustomerComponent } from './customer.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: 'customer/my-view', component: CustomerMyViewComponent}
];

@NgModule({
  declarations: [
    CustomerNavbarComponent,
    CustomerMyViewComponent,
    CustomerPersonalDetailsComponent,
    CustomerUpdateDetailsComponent,
    CustomerAccountSummaryComponent,
    CustomerTransactionHistoryComponent,
    CustomerRegisterPayeeComponent,
    CustomerFundTransferComponent,
    CustomerReportViewComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerModule { }
