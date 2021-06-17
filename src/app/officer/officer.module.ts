import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveChangesComponent } from './approve-changes/approve-changes.component';
import { OfficerViewTransactionsComponent } from './officer-view-transactions/officer-view-transactions.component';
import { CreateCustomerAccountComponent } from './create-customer-account/create-customer-account.component';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { OfficerNavbarComponent } from './officer-navbar/officer-navbar.component';



@NgModule({
  declarations: [
    ApproveChangesComponent,
    OfficerViewTransactionsComponent,
    CreateCustomerAccountComponent,
    OfficerNavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class OfficerModule { }
