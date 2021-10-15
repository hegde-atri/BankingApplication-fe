import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
  FormArray,
} from '@angular/forms';

//Custom validator
function customValidator(
  c: AbstractControl
): { [key: string]: boolean } | null {
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { range: true };
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

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }
  get notifications(): FormArray {
    return <FormArray>this.customerForm.get('address');
  }

  constructor(private fb: FormBuilder) {
    // Creates a formGroup.
    this.customerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      DoB: ['', [Validators.required]],
      // convert address and notification into non-reactive form elements.
      addresses: this.fb.array([this.buildAddresses()]),
      // TODO: finish the html part for notifications
      notifications: this.fb.array([this.buildNotifications()])
    });
  }

  ngOnInit(): void {}

  // We have validation for the number of address forms we have both when we add the address using the method below
  // and in the html by disabling the add address button when there are two addresses
  addAddress(): void {
    if (this.addresses.controls.length >= 2) {
    } else {
      this.addresses.push(this.buildAddresses());
    }
  }

  removeAddress(): void {
    this.addresses.removeAt(this.addresses.length - 1);
  }

  addNotification(): void {
    if (this.notifications.controls.length >= 2) {
    } else {
      this.notifications.push(this.buildAddresses());
    }
  }

  removeNotification(): void {
    this.notifications.removeAt(this.addresses.length - 1);
  }

  // creates the necassary form controls for an address formGroup
  buildAddresses(): FormGroup {
    return this.fb.group({
      type: ['', [Validators.required]],
      line1: ['', [Validators.required]],
      line2: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.maxLength(25)]],
      country: [{ value: 'United Kingdom', disabled: true }],
      postcode: ['', [Validators.required]],
    });
  }
  buildNotifications(): FormGroup {
    return this.fb.group({
      type: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      preference: [''],
    })
  }

  getGenderOption(option: string): string {
    // will change from Male/Female and other options to "option1", correspoding option for the html.
    return 'option1';
  }
  getNotficationOption(option: string): string {
    return 'option1';
  }

  getAttributeType(option: string): string {
    if (option === 'primary') {
      return 'option1';
    } else if (option === 'secondary') {
      return 'option2';
    } else {
      return '';
    }
  }

  populateExistingData(): void {
    // to pre fill some of the fields so that the customer can 'update' their details
    // Get the details from the api and json.stringify it.
    this.customerForm.patchValue({
      firstname: 'Atri',
      lastname: 'Hegde',
      gender: this.getGenderOption('male'),
      DoB: new Date(Date.parse('08/28/2004')),
      address: {
        type: this.getAttributeType('primary'),
        line1: 'Reigate College',
        line2: 'Castlefield Road',
        state: 'Surrey',
        city: 'Reigate',
        postcode: 'RH2 0SD',
      },
      notification: {
        type: this.getAttributeType('primary'),
        email: 'dev.hegdeatri@gmail.com',
        phone: '7471637019',
        preference: this.getNotficationOption('email'),
      },
    });
  }

  submit() {
    // What happens when the submit button is clicked.
    // It should send a request to change details to a bank officer
  }
}
