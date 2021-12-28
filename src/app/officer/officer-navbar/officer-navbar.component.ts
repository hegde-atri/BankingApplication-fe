import { Component, OnInit } from '@angular/core';
import {MsalService} from "@azure/msal-angular";

@Component({
  selector: 'ba-officer-navbar',
  templateUrl: './officer-navbar.component.html',
  styleUrls: ['./officer-navbar.component.scss']
})
export class OfficerNavbarComponent implements OnInit {

  constructor(private authService: MsalService) { }

  ngOnInit(): void {
    this.getName();

  }

  getName() {
    return this.authService.instance.getActiveAccount()?.name
  }

  logout() {
    this.authService.logout();
  }

}
