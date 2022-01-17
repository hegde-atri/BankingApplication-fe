import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICustomer} from "../../shared/interfaces/customer";
import {take} from "rxjs/operators";
import {MsalService} from "@azure/msal-angular";
import {INotification} from "../../shared/interfaces/notification";
import {IAddress} from "../../shared/interfaces/address";

@Component({
  selector: 'ba-customer-personal-details',
  templateUrl: './customer-personal-details.component.html',
  styleUrls: ['./customer-personal-details.component.scss'],
})
export class CustomerPersonalDetailsComponent implements OnInit {
  pageTitle: string = 'Personal Details';
  customerForm: FormGroup;
  baseUrl: string = 'http://localhost:6600/api/customer/';
  notUrl: string = 'http://localhost:6600/api/customer/notification/'
  customer: ICustomer | undefined;
  notifications_array: INotification[] | undefined;
  addresses_array: IAddress[] | undefined;


  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }
  get notifications(): FormArray {
    return <FormArray>this.customerForm.get('notifications');
  }

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private authService: MsalService) {

    this.customerForm = this.fb.group({
      firstname: [{value:''}, [Validators.required]],
      lastname: [{value:''}, [Validators.required]],
      gender: [{value:'', disabled: true}, [Validators.required]],
      DoB: [{value:''}, [Validators.required]],
      addresses: this.fb.array([this.buildAddresses()]),
      notifications: this.fb.array([this.buildNotifications()])
    });

  }

  async ngOnInit() {
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    this.notifications_array = await this.httpClient.get<INotification[]>(this.notUrl + this.customer.customerId +"/0")
      .pipe().toPromise();
    this.addresses_array = await this.httpClient.get<IAddress[]>(this.baseUrl + "address/" + this.customer.customerId + "/0")
      .pipe().toPromise();

    await this.populateExistingData();

  }

  // async populateFields(){
  //   this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username)
  //     .pipe(take(1)).toPromise();
  // }

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
      this.notifications.push(this.buildNotifications());
    }
  }

  removeNotification(): void {
    this.notifications.removeAt(this.notifications.length - 1);
  }

  // creates the necessary form controls for an address formGroup
  buildAddresses(): FormGroup {

    // Each form has different set of Validators used

    return this.fb.group({
      type: [{value:'', disabled: true}, [Validators.required]],
      line1: ['', [Validators.required]],
      line2: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.maxLength(25)]],
      country: [{ value: 'United Kingdom'}],
      // postcode has a regular expression for validation
      postcode: [{value:''}, [Validators.required, Validators.pattern(/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/)]],
    });
  }

  buildNotifications(): FormGroup {
    return this.fb.group({
      type: [{value:'', disabled: true}, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // phone has a regular expression for validation
      phone: ['', [Validators.required, Validators.pattern(/^\+[1-9]{1}[0-9]{3,14}$/)]],
      preference: [{value:'', disabled: true}, [Validators.required]]
    });
  }

  getGenderOption(option: string): string {
    // will change from Male/Female and other options to "option1", corresponding option for the html.
    if(option === "male" || option === "Male"){
      return "option1";
    }else if(option === "female" || option === "Female"){
      return "option2";
    }else{
      return "option3"
    }

  }

  getNotificationOption(option: string): string {
    if(option === "email" || option === "Email"){
      return "option1";
    }else {
      return "option2";
    }
  }

  getAttributeType(option: string): string {
    if (option == 'primary' || option == 'Primary') {
      return 'option1';
    } else if (option === 'secondary' || option === 'Secondary') {
      return 'option2';
    } else {
      // returns an empty string to avoid breaking the entire form.
      return '';
    }
  }

  async populateExistingData() {
    //here we have api calls that are redundant to make tslint happy
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    //Notifications array
    this.notifications_array = await this.httpClient.get<INotification[]>(this.notUrl + this.customer.customerId +"/0")
      .pipe().toPromise();
    //Addresses array
    this.addresses_array = await this.httpClient.get<IAddress[]>(this.baseUrl + "address/" + this.customer.customerId + "/0")
      .pipe().toPromise();

    // to pre fill some of the fields so that the customer can 'update' their details
    // Get the details from the api and json.stringify it.

    this.customerForm.patchValue({
      firstname: this.customer?.firstname,
      lastname: this.customer?.lastname,
      gender: this.getGenderOption(this.customer?.gender!),
      DoB: this.customer?.doB
    });

    if(this.addresses_array?.length == 2){
      this.addAddress()
    }else if(this.addresses.length == 2){
      this.removeAddress()
    }

    if(this.notifications_array?.length == 2){
      this.addNotification()
    }else if(this.notifications.length == 2){
      this.removeNotification()
    }


    for (let i = 0; i < this.notifications_array?.length; i++) {
      this.notifications.get(i.toString())?.patchValue({
        type: this.getAttributeType(this.notifications_array[i].type),
        email: this.notifications_array[i].email,
        phone: this.notifications_array[i].phone,
        preference: this.getNotificationOption(this.notifications_array[i].preference)
      })
    }

    for (let i = 0; i < this.addresses_array?.length; i++) {
      this.addresses.get(i.toString())?.patchValue({
        type: this.getAttributeType(this.addresses_array[i].type),
        line1: this.addresses_array[i].line1,
        line2: this.addresses_array[i].line2,
        city: this.addresses_array[i].city,
        state: this.addresses_array[i].state,
        country: this.addresses_array[i].country,
        postcode: this.addresses_array[i].postcode
      })
    }
  }
















}
