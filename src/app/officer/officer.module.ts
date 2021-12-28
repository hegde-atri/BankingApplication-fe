import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveChangesComponent } from './approve-changes/approve-changes.component';
import { OfficerViewTransactionsComponent } from './officer-view-transactions/officer-view-transactions.component';
import { CreateCustomerAccountComponent } from './create-customer-account/create-customer-account.component';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { OfficerNavbarComponent } from './officer-navbar/officer-navbar.component';
import { RouterModule, Routes } from '@angular/router';
import {OfficerGuard} from "../guards/officer.guard";

const routes: Routes = [
  {
    path: 'officer',
    canActivate: [OfficerGuard],
    children:[
      { path: 'approve-changes', component: ApproveChangesComponent },
      { path: '', redirectTo: 'approve-changes', pathMatch: 'full' }
    ]
  }

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
