import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { HomePageComponent } from './home-page/home-page.component';



@NgModule({
  declarations: [
    HomeNavbarComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
