import { Component, Inject, OnInit, OnDestroy} from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionType, InteractionStatus, PopupRequest, RedirectRequest, AuthenticationResult, AuthError } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { b2cPolicies } from 'src/app/auth-config';


@Component({
  selector: 'ba-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})

export class HomeNavbarComponent implements OnInit {
  loginDisplay = false;


  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService) { }

  isLoggedIn(): boolean {
    return this.authService.instance.getActiveAccount() != null;
  }

  // login(userFlowRequest?: RedirectRequest | PopupRequest) {
  //   if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
  //     if (this.msalGuardConfig.authRequest) {
  //       this.authService.loginPopup({...this.msalGuardConfig.authRequest, ...userFlowRequest} as PopupRequest)
  //         .subscribe((response: AuthenticationResult) => {
  //           this.authService.instance.setActiveAccount(response.account);
  //         });
  //     } else {
  //       this.authService.loginPopup(userFlowRequest)
  //         .subscribe((response: AuthenticationResult) => {
  //           this.authService.instance.setActiveAccount(response.account);
  //         });
  //     }
  //   } else {
  //     if (this.msalGuardConfig.authRequest){
  //       this.authService.loginRedirect({...this.msalGuardConfig.authRequest, ...userFlowRequest} as RedirectRequest);
  //     } else {
  //       this.authService.loginRedirect(userFlowRequest);
  //     }
  //   }
  // }

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
