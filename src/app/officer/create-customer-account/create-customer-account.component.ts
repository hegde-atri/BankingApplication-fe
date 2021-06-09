import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'ba-create-customer-account',
  templateUrl: './create-customer-account.component.html',
  styleUrls: ['./create-customer-account.component.scss']
})
export class CreateCustomerAccountComponent implements OnInit {

  customerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: ''
    })
  }

  ngOnInit(): void {
  }

}
