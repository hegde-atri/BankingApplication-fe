import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-customer-transaction-history',
  templateUrl: './customer-transaction-history.component.html',
  styleUrls: ['./customer-transaction-history.component.scss']
})

export class CustomerTransactionHistoryComponent implements OnInit {
  
  pageTitle: string = "Transaction History";

  constructor() { }

  ngOnInit(): void { }

}
