import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { HomeComponent } from './home.component';



@NgModule({
    declarations: [
        HomeNavbarComponent,
        HomeComponent
    ],
    exports: [
        HomeNavbarComponent
    ],
    imports: [
        CommonModule
    ]
})
export class HomeModule { }
