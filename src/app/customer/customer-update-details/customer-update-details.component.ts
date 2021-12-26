import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import {ICustomer} from "../../shared/classes/customer";
import {take} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {MsalService} from "@azure/msal-angular";
import {INotification} from "../../shared/classes/notification";
import {IAddress} from "../../shared/classes/address";

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
  baseUrl: string = 'http://localhost:6600/api/customer';
  customer: ICustomer | undefined;
  notifications_array: INotification[] | undefined;
  addresses_array: IAddress[] | undefined;


  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }
  get notifications(): FormArray {
    return <FormArray>this.customerForm.get('notifications');
  }

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private authService: MsalService) {
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

  async ngOnInit() {
    //Customer Object
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    //Notifications array
    this.notifications_array = await this.httpClient.get<INotification[]>(this.baseUrl + "/notification/" + this.customer.customerId +"/0")
      .pipe().toPromise();
    //Addresses array
    this.addresses_array = await this.httpClient.get<IAddress[]>(this.baseUrl + "/address/" + this.customer.customerId + "/0")
      .pipe().toPromise();

    this.populateExistingData()
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

  // creates the necessary form controls for an address formGroup
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

  getGenderOption(option: string): string {
    // will change from Male/Female and other options to "option1", corresponding option for the html.
    if(option === "male" || option === "Male"){
      return "option1";
    }else{
      return "option2";
    }

  }

  getNotificationOption(option: string): string {
    if(option === "email" || option === "Email"){
      return "option1";
    }else{
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

  populateExistingData(): void {
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



    // @ts-ignore
    for (let i = 0; i < this.notifications_array?.length; i++) {
      this.notifications.get(i.toString())?.patchValue({
        // @ts-ignore
        type: this.getAttributeType(this.notifications_array[i].type),
        // @ts-ignore
        email: this.notifications_array[i].email,
        // @ts-ignore
        phone: this.notifications_array[i].phone,
        // @ts-ignore
        preference: this.getNotificationOption(this.notifications_array[i].preference)
      })
    }

    // @ts-ignore
    for (let i = 0; i < this.addresses_array?.length; i++) {
      this.addresses.get(i.toString())?.patchValue({
        // @ts-ignore
        type: this.getAttributeType(this.addresses_array[i].type),
        // @ts-ignore
        line1: this.addresses_array[i].line1,
        // @ts-ignore
        line2: this.addresses_array[i].line2,
        // @ts-ignore
        city: this.addresses_array[i].city,
        // @ts-ignore
        state: this.addresses_array[i].state,
        // @ts-ignore
        postcode: this.addresses_array[i].postcode
      })
    }
  }

  submit() {
    // What happens when the submit button is clicked.
    // It should send a request to change details to a bank officer
  }
}
