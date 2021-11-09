import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ba-customer-fund-transfer',
  templateUrl: './customer-fund-transfer.component.html',
  styleUrls: ['./customer-fund-transfer.component.scss']
})
export class CustomerFundTransferComponent implements OnInit {
  // here we need 2 form groups to make it easier to use the front end stepper.
  payeeFormGroup: FormGroup;
  amountFormGroup: FormGroup;

  pageTitle: string = "Transfer Funds";

  constructor(private fb: FormBuilder) {
    this.payeeFormGroup = this.fb.group({
      payee: ['', Validators.required]
    });
    this.amountFormGroup = this.fb.group({
      amount: ['', Validators.required]
    });
  }


  ngOnInit(): void {

  }

}
