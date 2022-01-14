import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';



@Component({
  selector: 'ba-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})


export class HomeNavbarComponent implements OnInit {
  loginDisplay = false;
  returned_string: any;



  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.authService.instance.handleRedirectPromise().then(
      res => {
        if(res != null && res.account != null){
          this.authService.instance.setActiveAccount(res.account)
        }
      }
    )
  }

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
  this.authService.loginRedirect();
    // this.authService.loginPopup().subscribe((response: AuthenticationResult) => {
    //   this.authService.instance.setActiveAccount(response.account)
    // });
  }

  logout() {
    this.authService.logout();
  }

  getName() {
    return this.authService.instance.getActiveAccount()?.name;
  }
  getEmail() {
    return this.authService.instance.getActiveAccount()?.username;
  }

  getRole(){
    let token = this.authService.instance.getActiveAccount()?.idTokenClaims;
    // @ts-ignore
    let decoded_token = atob(token.split('1')[1])
  }

  // callAPI() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Access-Control-Allow-Origin':'*'
  //     })
  //   };
  //   this.httpClient.get<any>("http://localhost:6600/api/officer").subscribe(
  //     response => {
  //       console.log(response)
  //       this.returned_string = response;
  //     }
  //   )
  // }


}
