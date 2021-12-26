import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'ba-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.scss']
})
export class CustomerNavbarComponent implements OnInit {
  username: string = '';

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
