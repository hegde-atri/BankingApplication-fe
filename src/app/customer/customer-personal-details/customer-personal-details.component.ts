import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICustomer} from "../../shared/classes/customer";
import {take} from "rxjs/operators";
import {MsalService} from "@azure/msal-angular";

@Component({
  selector: 'ba-customer-personal-details',
  templateUrl: './customer-personal-details.component.html',
  styleUrls: ['./customer-personal-details.component.scss'],
})
export class CustomerPersonalDetailsComponent implements OnInit {
  pageTitle: string = 'Personal Details';
  NotificationNo: number = 1;
  AddressNo: number = 1;
  personalDetailsForm: FormGroup;
  addressesForm: FormArray;
  notificationsForm: FormArray
  baseUrl: string = 'http://localhost:6600/api/customer';
  customer: ICustomer | undefined;



  constructor(private httpClient: HttpClient, private fb: FormBuilder, private authService: MsalService) {



    this.personalDetailsForm = this.fb.group({
      firstname: [{value:'', disabled: true}, [Validators.required]],
      lastname: [{value:'', disabled: true}, [Validators.required]],
      gender: [{value:'', disabled: true}, [Validators.required]],
      DoB: [{value:'', disabled: true}, [Validators.required]]
    })

    this.addressesForm = this.fb.array([this.buildAddresses()]);
    this.notificationsForm = this.fb.array([this.buildNotifications()]);

  }

  async ngOnInit() {
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();

    await this.populateFields();

  }

  async populateFields(){
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();

    this.personalDetailsForm.patchValue({
      firstname: this.customer.firstname,
      lastname: this.customer.lastname,
      gender: this.getGenderOption(this.customer.gender),
      DoB: this.customer.doB

    })

  }

  getGenderOption(option: string): string {
    // will change from Male/Female and other options to "option1", correspoding option for the html.
    return 'option1';
  }

  buildAddresses(): FormGroup {

    // Each form has different set of Validators used

    return this.fb.group({
      type: ['', [Validators.required]],
      line1: ['', [Validators.required]],
      line2: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.maxLength(25)]],
      country: [{ value: 'United Kingdom', disabled: true }],
      // postcode has a regular expression for validation
      postcode: ['', [Validators.required, Validators.pattern(/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/)]],
    });
  }

  buildNotifications(): FormGroup {
    return this.fb.group({
      type: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // phone has a regular expression for validation
      phone: ['', [Validators.required, Validators.pattern(/^\+[1-9]{1}[0-9]{3,14}$/)]],
      preference: ['', [Validators.required]]
    });
  }

  addAddress(): void {
    if (this.addressesForm.controls.length >= 2) {
    } else {
      this.addressesForm.push(this.buildAddresses());
    }
  }

  removeAddress(): void {
    this.addressesForm.removeAt(this.addressesForm.length - 1);
  }

  addNotification(): void {
    if (this.notificationsForm.controls.length >= 2) {
    } else {
      this.notificationsForm.push(this.buildNotifications());
    }
  }

  removeNotification(): void {
    this.notificationsForm.removeAt(this.notificationsForm.length - 1);
  }
}
