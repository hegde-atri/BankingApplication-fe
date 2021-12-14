import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalModule, MsalRedirectComponent, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { msalConfig } from './auth-config';

// Here we give the configuration parameters to create the MSAL instance
export function MSALInstanceFactory(): IPublicClientApplication{
  return new PublicClientApplication(msalConfig);
}

// Here we set our interaction type with MSALGuard
export function MSALGuardConfigFactory(): MsalGuardConfiguration{
  return {
    interactionType: InteractionType.Redirect,
  };
}


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MsalModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
