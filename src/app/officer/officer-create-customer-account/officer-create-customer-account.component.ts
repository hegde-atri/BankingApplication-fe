import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IAccount} from "../../shared/interfaces/account";
import {MsalService} from "@azure/msal-angular";
import {Observable} from "rxjs";
import {INotification} from "../../shared/interfaces/notification";

@Component({
  selector: 'ba-officer-create-customer-account',
  templateUrl: './officer-create-customer-account.component.html',
  styleUrls: ['./officer-create-customer-account.component.scss']
})
export class OfficerCreateCustomerAccountComponent implements OnInit {
  pageTitle: string = "Create customer";
  customerForm: FormGroup;
  baseUrl: string = "http://localhost:6600/api/officer/";

  get addresses(): FormArray{
    return <FormArray>this.customerForm.get('addresses');
  }
  get notifications(): FormArray{
    return <FormArray>this.customerForm.get('notifications');
  }

  constructor(private fb: FormBuilder, private httpClient: HttpClient,
              private snackbar: MatSnackBar, private authService: MsalService) {
    // Creates a formGroup. Each formControl component has its Validators specified.
    this.customerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      DoB: ['', [Validators.required]],
      addresses: this.fb.array([this.buildAddresses()]),
      notifications: this.fb.array([this.buildNotifications()])
    });
  }

  ngOnInit(): void {  }

  openCustomerSignUp(){
    window.open('https://superstonks.b2clogin.com/superstonks.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signup&client_id=7c6dfea2-ff7b-4e36-8b11-08410e69f4e2&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A4200&scope=openid&response_type=id_token&prompt=login', "_blank");
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
      this.notifications.push(this.buildNotifications());
    }
  }

  removeNotification(): void {
    this.notifications.removeAt(this.notifications.length - 1);
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

  createAccountObj(name: string | undefined, id: number, type: string): IAccount{
    // The account will not have a close date unless it has been cancelled or
    // requested to be taken down.
    return {
      customerId: id,
      accountNumber: "string",
      type: type,
      balance: 0,
      status: "Active",
      openDate: new Date(Date.now()),
      createdBy: name,
      createdDate: new Date(Date.now()),
      modifiedBy: name,
      modifiedDate: new Date(Date.now()),
    } as IAccount
  }

  addAccount(a: IAccount): Observable<IAccount>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<IAccount>(this.baseUrl + "account", a, {headers: headers});
  }

  submit(){
    // When submit is pressed we must add the new customer, address and notification objects to the db
    // We should also create the account objects of the customer.
    let username = this.authService.instance.getActiveAccount()?.username;

    if(this.customerForm.valid){
      // The 2 accounts needed to be created
      let a1 = this.createAccountObj(username, 1, "Main");
      let a2 = this.createAccountObj(username, 1, "Savings");
    }
  }

}
