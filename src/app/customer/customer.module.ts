import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNavbarComponent } from './customer-navbar/customer-navbar.component';
import { CustomerAccountSummaryComponent } from './customer-account-summary/customer-account-summary.component';
import { CustomerFundTransferComponent } from './customer-fund-transfer/customer-fund-transfer.component';
import { CustomerMyViewComponent } from './customer-my-view/customer-my-view.component';
import { CustomerPersonalDetailsComponent } from './customer-personal-details/customer-personal-details.component';
import { CustomerRegisterPayeeComponent } from './customer-register-payee/customer-register-payee.component';
import { CustomerReportViewComponent } from './customer-report-view/customer-report-view.component';
import { CustomerTransactionHistoryComponent } from './customer-transaction-history/customer-transaction-history.component';
import { CustomerUpdateDetailsComponent } from './customer-update-details/customer-update-details.component';



@NgModule({
  declarations: [
    CustomerNavbarComponent,
    CustomerAccountSummaryComponent,
    CustomerFundTransferComponent,
    CustomerMyViewComponent,
    CustomerPersonalDetailsComponent,
    CustomerRegisterPayeeComponent,
    CustomerReportViewComponent,
    CustomerTransactionHistoryComponent,
    CustomerUpdateDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CustomerModule { }
