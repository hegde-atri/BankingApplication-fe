import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerModule } from './customer/customer.module';
import { HomePageComponent } from './home/home-page/home-page.component';
import { HomeModule } from './home/home.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '404-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404-not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CustomerModule,
    HomeModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
