import { Component, Inject, OnInit } from '@angular/core';
import { MsalService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import {AuthenticationResult} from "@azure/msal-browser";
import { Token } from "../../shared/interfaces/token";


@Component({
  selector: 'ba-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})


export class HomeNavbarComponent implements OnInit {
  loginDisplay = false;
  isRoleLoaded: boolean;
  isCustomer: boolean;
  isTeller: boolean;
  isOfficer: boolean;
  isManager: boolean;


  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService) {
    this.isRoleLoaded = false;
    this.isCustomer = false;
    this.isTeller = false;
    this.isOfficer = false;
    this.isManager = false;
  }

  ngOnInit(): void {

    this.authService.instance.handleRedirectPromise().then(
      res => {
        if(res != null && res.account != null){
          this.authService.instance.setActiveAccount(res.account)
        }
      }
    );
    this.resetRoles()
    this.setRole();
  }

  isLoggedIn(): boolean {
    return this.authService.instance.getActiveAccount() != null;
  }

  loginPopup() {
    this.authService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.authService.instance.setActiveAccount(response.account)
    });
    this.resetRoles();
    this.setRole();
  }

  loginRedirect(){
    this.authService.loginRedirect();
    this.resetRoles();
    this.setRole();
  }

  resetRoles(){
    this.isRoleLoaded = false;
    this.isCustomer = false;
    this.isTeller = false;
    this.isOfficer = false;
    this.isManager = false;
  }

  logout() {
    this.authService.logout();
  }

  getRole(): Token{
    return  this.authService.instance.getActiveAccount()?.idTokenClaims as Token;
  }

  setRole(){
    let c = this.getRole();
    switch (c.extension_Role){
      case "Customer": {
        this.isCustomer = true;
        break;
      }
      case "customer": {
        this.isCustomer = true;
        break;
      }
      case "Manager": {
        this.isManager = true;
        break;
      }
      case "Officer": {
        this.isOfficer = true;
        break;
      }
      case "Teller": {
        this.isTeller = true;
        break;
      }
    }
    this.isRoleLoaded = true;
  }


}
