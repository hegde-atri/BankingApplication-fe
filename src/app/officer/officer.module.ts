import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveChangesComponent } from './approve-changes/approve-changes.component';
import { OfficerViewTransactionsComponent } from './officer-view-transactions/officer-view-transactions.component';
import { CreateCustomerAccountComponent } from './create-customer-account/create-customer-account.component';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { OfficerNavbarComponent } from './officer-navbar/officer-navbar.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'officer/approve-changes', component: ApproveChangesComponent },
  { path: 'officer', redirectTo: 'officer/approve-changes', pathMatch: 'full' }
]


@NgModule({
  declarations: [
    ApproveChangesComponent,
    OfficerViewTransactionsComponent,
    CreateCustomerAccountComponent,
    OfficerNavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OfficerModule { }
