import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-customer-register-payee',
  templateUrl: './customer-register-payee.component.html',
  styleUrls: ['./customer-register-payee.component.scss']
})
export class CustomerRegisterPayeeComponent implements OnInit {

  pageTitle: string = "Register Payee";

  constructor() { }

  ngOnInit(): void {
  }

}
