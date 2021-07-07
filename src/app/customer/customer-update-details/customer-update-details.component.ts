import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ba-customer-update-details',
  templateUrl: './customer-update-details.component.html',
  styleUrls: ['./customer-update-details.component.scss'],
})
export class CustomerUpdateDetailsComponent implements OnInit {
  customerForm: FormGroup;
  pageTitle: string = 'Update Details';

  constructor() {
    this.customerForm = new FormGroup({});
  }

  ngOnInit(): void {}

  populateExistingData(): void {
    this.customerForm.patchValue({
      // to pre fill some of the fields so that the customer can 'update' their details
    });
  }

  submit() {
    // What happens when the submit button is clicked.
    // It should send a request to change details to a bank officer
  }
}
