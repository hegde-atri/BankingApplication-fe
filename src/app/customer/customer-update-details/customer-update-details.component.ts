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

  // get addresses(): FormArray{
  //   return <FormArray>this.customerForm.get('addresses');
  // }

  constructor(private fb: FormBuilder) {
    // Creates a formGroup.
    this.customerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      DoB: ['', [Validators.required]],
      // convert address and notification into non-reactive form elements.
      address: this.fb.group({
        type: ['primary'],
        line1: [''],
        line2: [''],
        state: [''],
        city: [''],
        country: [{ value: 'United Kingdom', disabled: true}],
        postcode: ['']
      }),
      notification: this.fb.group({
        type: ['primary'],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        preference: ['']
      })

    });
  }

  ngOnInit(): void {}

  // add address adds another 
  // addAddress(): void{
  //   this.addresses.push(this.buildAddresses());
  // }

  // creates the necassary form controls for an address formGroup
  buildAddresses(): FormGroup{
    return this.fb.group({
      type: ['primary'],
      line1: [''],
      line2: [''],
      state: [''],
      city: [''],
      country: [{ value: 'United Kingdom', disabled: true}],
      postcode: ['']
    })
  }

  getGenderOption(option: string): string {
    // will change from Male/Female and other options to "option1", correspoding option for the html.
    return "option1";
  }
  getNotficationOption(option: string): string {
    return "option1";
  }

  populateExistingData(): void {
    // Get the details from the api and json.stringify it.
    this.customerForm.patchValue({
      firstname: "Atri",
      lastname: "Hegde",
      gender: this.getGenderOption("male"),
      DoB: new Date(Date.parse("08/28/2004")),
      address: {
        line1: "Reigate College",
        line2: "Castlefield Road",
        state: "Surrey",
        city: "Reigate",
        postcode:"RH2 0SD"
      },
      notification: {
        email: "dev.hegdeatri@gmail.com",
        phone: "7471637019",
        preference: this.getNotficationOption("email")
      }


      // to pre fill some of the fields so that the customer can 'update' their details
    });
  }

  submit() {
    // What happens when the submit button is clicked.
    // It should send a request to change details to a bank officer
  }
}
