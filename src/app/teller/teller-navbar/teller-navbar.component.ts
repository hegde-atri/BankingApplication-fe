import { Component, OnInit } from '@angular/core';
import {MsalService} from "@azure/msal-angular";

@Component({
  selector: 'ba-teller-navbar',
  templateUrl: './teller-navbar.component.html',
  styleUrls: ['./teller-navbar.component.scss']
})
export class TellerNavbarComponent implements OnInit {

  constructor(private authService: MsalService) { }

  ngOnInit(): void {
  }

  getName() {
    return this.authService.instance.getActiveAccount()?.name
  }

  logout() {
    this.authService.logout();
  }

}
