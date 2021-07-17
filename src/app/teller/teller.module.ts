import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TellerNavbarComponent } from './teller-navbar/teller-navbar.component';
import { TellerDepositComponent } from './teller-deposit/teller-deposit.component';
import { TellerWithdrawComponent } from './teller-withdraw/teller-withdraw.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'teller/withdraw', component: TellerWithdrawComponent },
  { path: 'teller', redirectTo: 'teller/withdraw', pathMatch: 'full'},
  { path: 'teller/deposit', component: TellerDepositComponent },
];

@NgModule({
  declarations: [
    TellerNavbarComponent,
    TellerDepositComponent,
    TellerWithdrawComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TellerModule {}
