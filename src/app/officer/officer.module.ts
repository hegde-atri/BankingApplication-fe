import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficerViewTransactionsComponent } from './officer-view-transactions/officer-view-transactions.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OfficerNavbarComponent } from './officer-navbar/officer-navbar.component';
import { RouterModule, Routes } from '@angular/router';
import {OfficerGuard} from "../guards/officer.guard";
import { OfficerCreateCustomerAccountComponent } from './officer-create-customer-account/officer-create-customer-account.component';
import { OfficerEditCustomerProfileComponent } from './officer-edit-customer-profile/officer-edit-customer-profile.component';
import { OfficerViewAccountsComponent } from './officer-view-accounts/officer-view-accounts.component';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {HttpClientModule} from "@angular/common/http";
import {MatStepperModule} from "@angular/material/stepper";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

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
        RouterModule.forChild(routes),
        HttpClientModule,
        MatStepperModule,
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatButtonModule,
        MatSliderModule,
        MatProgressSpinnerModule,
    ],
    exports: [
      MatPaginatorModule
    ]
})
export class OfficerModule { }
