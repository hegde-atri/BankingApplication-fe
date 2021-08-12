import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';

//Custom validator
function customValidator(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { 'range': true };
  }
  return null;
}

@Component({
  selector: 'ba-customer-update-details',
  templateUrl: './customer-update-details.component.html',
  styleUrls: ['./customer-update-details.component.scss'],
})
export class CustomerUpdateDetailsComponent implements OnInit {
  customerForm: FormGroup;
  pageTitle: string = 'Update Details';

  get addresses(): FormArray{
    return <FormArray>this.customerForm.get('addresses');
  }

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      DoB: ['', [Validators.required]],
      addresses: this.fb.array([ this.buildAddresses() ]),
      notification: this.fb.group({
        type: ['home'],
        email: [''],
        phone: [''],
        preference: ['']
      })

    });
  }

  ngOnInit(): void {}

  addAddress(): void{
    this.addresses.push(this.buildAddresses());
  }

  buildAddresses(): FormGroup{
    return this.fb.group({
      type: ['home'],
      line1: [''],
      line2: [''],
      state: [''],
      city: [''],
      country: [{ value: 'United Kingdom', disabled: true}],
      postcode: ['']
    })
  }

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
