import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ba-customer-update-details',
  templateUrl: './customer-update-details.component.html',
  styleUrls: ['./customer-update-details.component.scss']
})
export class CustomerUpdateDetailsComponent implements OnInit {
  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  hide = true;
  get emailInput() { return this.signin.get('email'); }
  get passwordInput() { return this.signin.get('password'); } 

  customerForm: FormGroup;
  pageTitle: string = "Update Details";

  constructor() {
    this.customerForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      gender: new FormControl(),
      dob: new FormControl()
    });
  }

  ngOnInit(): void {

  }

  submit(){
    // What happens when the submit button is clicked.
    // It should send a request to change details to a bank officer
  }

}
