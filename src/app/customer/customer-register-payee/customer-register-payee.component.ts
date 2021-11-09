import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ba-customer-register-payee',
  templateUrl: './customer-register-payee.component.html',
  styleUrls: ['./customer-register-payee.component.scss']
})
export class CustomerRegisterPayeeComponent implements OnInit {
  payeeForm: FormGroup
  pageTitle: string = "Register Payee";

  constructor(private fb: FormBuilder) {
    this.payeeForm = this.fb.group({
      Name: ['', [Validators.required]],
      AccountNumber: ['', [Validators.required]],
      Sortcode: ['', [Validators.required]],
      Description: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

}
