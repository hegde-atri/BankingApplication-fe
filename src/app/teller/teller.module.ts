import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TellerComponentComponent } from './teller-component/teller-component.component';
import { TellerNavbarComponent } from './teller-navbar/teller-navbar.component';



@NgModule({
  declarations: [
    TellerComponentComponent,
    TellerNavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TellerModule { }
