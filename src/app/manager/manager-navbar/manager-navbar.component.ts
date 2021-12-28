import { Component, OnInit } from '@angular/core';
import {MsalService} from "@azure/msal-angular";

@Component({
  selector: 'ba-manager-navbar',
  templateUrl: './manager-navbar.component.html',
  styleUrls: ['./manager-navbar.component.scss']
})
export class ManagerNavbarComponent implements OnInit {

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
