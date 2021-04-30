import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeModule} from "./home/home.module";
import {CustomerModule} from "./customer/customer.module";
import {OfficerModule} from "./officer/officer.module";
import {ManagerModule} from "./manager/manager.module";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    HomeModule,
    CustomerModule,
    OfficerModule,
    ManagerModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
