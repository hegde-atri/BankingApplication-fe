import { Component, Inject, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { b2cPolicies } from 'src/app/auth-config';

@Component({
  selector: 'ba-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent implements OnInit {
  loginDisplay = false;


  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private authService: MsalService,
              private msalBroadcastService: MsalBroadcastService) { }

  isLoggedIn(): boolean{
    return this.authService.instance.getActiveAccount() != null;
  }

  login() {
    this.authService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.authService.instance.setActiveAccount(response.account)
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
