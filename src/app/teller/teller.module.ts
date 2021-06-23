import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TellerNavbarComponent } from './teller-navbar/teller-navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { TellerComponent } from './teller/teller.component';


const routes: Routes = [
  { path: "teller", component: TellerComponent}
]
@NgModule({
  declarations: [
    TellerNavbarComponent,
    TellerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TellerModule { }
