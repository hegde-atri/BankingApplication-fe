import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveChangesComponent } from './approve-changes/approve-changes.component';
import { OfficerViewTransactionsComponent } from './officer-view-transactions/officer-view-transactions.component';
import { CreateCustomerAccountComponent } from './create-customer-account/create-customer-account.component';



@NgModule({
  declarations: [
    ApproveChangesComponent,
    OfficerViewTransactionsComponent,
    CreateCustomerAccountComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OfficerModule { }
