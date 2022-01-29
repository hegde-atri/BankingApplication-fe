import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    HomeNavbarComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule
  ]
})
export class HomeModule { }
