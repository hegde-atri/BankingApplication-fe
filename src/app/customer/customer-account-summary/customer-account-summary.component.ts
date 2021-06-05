import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-customer-account-summary',
  templateUrl: './customer-account-summary.component.html',
  styleUrls: ['./customer-account-summary.component.scss']
})
export class CustomerAccountSummaryComponent implements OnInit {

  pageTitle: string = "Account Summary";

  constructor() { }

  ngOnInit(): void {
  }

}
