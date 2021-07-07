import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TellerNavbarComponent } from './teller-navbar/teller-navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { TellerComponent } from './teller/teller.component';
import { TellerDepositComponent } from './teller/teller-deposit/teller-deposit.component';
import { TellerWithdrawComponent } from './teller/teller-withdraw/teller-withdraw.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: "teller", component: TellerComponent, children: [
      { path: "deposit", component: TellerDepositComponent },
      { path: "withdraw", component: TellerWithdrawComponent }
  ] }
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
    RouterModule.forChild(routes),
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class TellerModule { }
