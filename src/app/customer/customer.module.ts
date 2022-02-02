import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerNavbarComponent} from './customer-navbar/customer-navbar.component';
import {CustomerFundTransferComponent} from './customer-fund-transfer/customer-fund-transfer.component';
import {CustomerMyViewComponent} from './customer-my-view/customer-my-view.component';
import {CustomerPersonalDetailsComponent} from './customer-personal-details/customer-personal-details.component';
import {CustomerRegisterPayeeComponent} from './customer-register-payee/customer-register-payee.component';
import {CustomerReportViewComponent} from './customer-report-view/customer-report-view.component';
import {
  CustomerTransactionHistoryComponent
} from './customer-transaction-history/customer-transaction-history.component';
import {CustomerUpdateDetailsComponent} from './customer-update-details/customer-update-details.component';
import {RouterModule, Routes} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSliderModule} from '@angular/material/slider';
import {CustomerGuard} from '../guards/customer.guard';
import {CustomerViewPayeesComponent} from './customer-view-payees/customer-view-payees.component';
import {CustomerEditPayeeComponent} from './customer-edit-payee/customer-edit-payee.component';
import {MatTabsModule} from "@angular/material/tabs";

const routes: Routes = [
  {
    path: 'customer',
    canActivate: [ CustomerGuard ],
    children: [
      {
        path: '',
        component: CustomerMyViewComponent
      },
      // {
      //   path: 'my-view',
      //   component: CustomerMyViewComponent
      // },
      {
        path: 'fund-transfer',
        component: CustomerFundTransferComponent},
      {
        path: 'personal-details',
        component: CustomerPersonalDetailsComponent,
      },
      {
        path: 'register-payee',
        component: CustomerRegisterPayeeComponent,
      },
      {
        path: 'report-view',
        component: CustomerReportViewComponent
      },
      {
        path: 'transaction-history',
        component: CustomerTransactionHistoryComponent,
      },
      {
        path: 'update-details',
        component: CustomerUpdateDetailsComponent,
      },
      {
        path: 'view-payees',
        component: CustomerViewPayeesComponent,
      },
      {
        path: 'edit-payee',
        component: CustomerEditPayeeComponent,
      }

    ]
  }
]

@NgModule({
  declarations: [
    CustomerNavbarComponent,
    CustomerFundTransferComponent,
    CustomerMyViewComponent,
    CustomerPersonalDetailsComponent,
    CustomerRegisterPayeeComponent,
    CustomerReportViewComponent,
    CustomerTransactionHistoryComponent,
    CustomerUpdateDetailsComponent,
    CustomerViewPayeesComponent,
    CustomerEditPayeeComponent,

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
        MatTabsModule,
    ],
  providers: [
    MatDatepickerModule,
    CustomerGuard
  ],
})
export class CustomerModule {
}
