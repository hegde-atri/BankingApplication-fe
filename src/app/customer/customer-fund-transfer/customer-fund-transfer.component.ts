import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ba-customer-fund-transfer',
  templateUrl: './customer-fund-transfer.component.html',
  styleUrls: ['./customer-fund-transfer.component.scss']
})
export class CustomerFundTransferComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  pageTitle: string = "Transfer Funds";

  constructor(private fb: FormBuilder) {
    this.firstFormGroup = this.fb.group({
      payee: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      amount: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

}
