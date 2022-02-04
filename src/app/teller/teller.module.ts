import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TellerNavbarComponent } from './teller-navbar/teller-navbar.component';
import { TellerDepositComponent } from './teller-deposit/teller-deposit.component';
import { TellerWithdrawComponent } from './teller-withdraw/teller-withdraw.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TwoDigitDecimaNumberDirective } from './two-decimal-money-input';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { accountNumberDirective } from './account-number-directive';
import {TellerGuard} from "../guards/teller.guard";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  {
    path: 'teller',
    canActivate: [ TellerGuard ],
    children: [
      { path: 'withdraw', component: TellerWithdrawComponent },
      { path: '', redirectTo: 'withdraw', pathMatch: 'full' },
      { path: 'deposit', component: TellerDepositComponent },
    ]
  }

];

@NgModule({
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  declarations: [
    TellerNavbarComponent,
    TellerDepositComponent,
    TellerWithdrawComponent,
    TwoDigitDecimaNumberDirective,
    accountNumberDirective
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatButtonModule,
        SharedModule
    ],
})
export class TellerModule {}
