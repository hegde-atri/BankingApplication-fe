import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerModule } from './customer/customer.module';
import { HomePageComponent } from './home/home-page/home-page.component';
import { HomeModule } from './home/home.module';
import { ManagerModule } from './manager/manager.module';
import { OfficerModule } from './officer/officer.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TellerModule } from './teller/teller.module';
import { PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '404-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404-not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
    ManagerModule,
    TellerModule,
    OfficerModule,
    CustomerModule,
    HomeModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
