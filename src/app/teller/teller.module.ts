import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TellerNavbarComponent } from './teller-navbar/teller-navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { TellerComponent } from './teller/teller.component';
import { TellerDepositComponent } from './teller/teller-deposit/teller-deposit.component';
import { TellerWithdrawComponent } from './teller/teller-withdraw/teller-withdraw.component';


const routes: Routes = [
  { path: "teller", component: TellerComponent}
]
@NgModule({
  declarations: [
    TellerNavbarComponent,
    TellerComponent,
    TellerDepositComponent,
    TellerWithdrawComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TellerModule { }
