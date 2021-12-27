import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import {ICustomer} from "../../shared/classes/customer";
import {take, tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MsalService} from "@azure/msal-angular";
import {INotification} from "../../shared/classes/notification";
import {IAddress} from "../../shared/classes/address";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

// //Custom validator - complex user algorithm
// function customValidator(
//   c: AbstractControl
// ): { [key: string]: boolean } | null {
//   if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
//     return { range: true };
//   }
//   return null;
// }

@Component({
  selector: 'ba-customer-update-details',
  templateUrl: './customer-update-details.component.html',
  styleUrls: ['./customer-update-details.component.scss'],
})
export class CustomerUpdateDetailsComponent implements OnInit {
  customerForm: FormGroup;
  pageTitle: string = 'Update Details';
  baseUrl: string = 'http://localhost:6600/api/customer/';
  notUrl: string = 'http://localhost:6600/api/customer/notification/';
  customer: ICustomer | undefined;
  notifications_array: INotification[] | undefined;
  addresses_array: IAddress[] | undefined;


  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }
  get notifications(): FormArray {
    return <FormArray>this.customerForm.get('notifications');
  }

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private authService: MsalService, private router: Router) {
    // Creates a formGroup. Each formControl component has its Validators specified.
    this.customerForm = this.fb.group({
      firstname: [{value:'', disabled: true}, [Validators.required]],
      lastname: [{value:'', disabled: true}, [Validators.required]],
      gender: [{value:'', disabled: true}, [Validators.required]],
      DoB: [{value:'', disabled: true}, [Validators.required]],
      addresses: this.fb.array([this.buildAddresses()]),
      notifications: this.fb.array([this.buildNotifications()])
    });
  }

  async ngOnInit() {
    //Customer Object
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    //Notifications array
    this.notifications_array = await this.httpClient.get<INotification[]>(this.notUrl + this.customer.customerId +"/0")
      .pipe().toPromise();
    //Addresses array
    this.addresses_array = await this.httpClient.get<IAddress[]>(this.baseUrl + "address/" + this.customer.customerId + "/0")
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
      type: [{value:'', disabled: true}, [Validators.required]],
      line1: [{value:'', disabled: true}, [Validators.required]],
      line2: [{value:'', disabled: true}, [Validators.required]],
      state: [{value:'', disabled: true}, [Validators.required]],
      city: [{value:'', disabled: true}, [Validators.required, Validators.maxLength(25)]],
      country: [{ value: 'United Kingdom', disabled: true }],
      // postcode has a regular expression for validation
      postcode: [{value:'', disabled: true}, [Validators.required, Validators.pattern(/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/)]],
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
        postcode: this.addresses_array[i].postcode
      })
    }
  }

  updateNotification(n: INotification): Observable<INotification>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<INotification>(this.notUrl + n.notificationId, n, {headers: headers})
  }

  addNewNotification(n: INotification): Observable<INotification>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<INotification>(this.notUrl, n, {headers: headers})
      .pipe(
        tap(data => console.log("create Notification: " + JSON.stringify(data)))
      );
  }

  deleteNotification(n: INotification): Observable<{}>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.delete<INotification>(this.notUrl + n.notificationId, {headers: headers});
  }

  whenSaveComplete(){
    this.router.navigate(['/customer/personal-details'])
  }

  // When retrieving data back from the form we must change the dropbox option numbers to their actual values
  convertOptions(n: INotification){
    if(n.type == "option1"){
      n.type = "Primary";
    }else{
      n.type = "Secondary";
    }
    if(n.preference == "option1"){
      n.preference = "Email";
    }else{
      n.preference = "Phone";
    }
  }

  submit() {
    // Ideally this should go through additional confirmation, however that is not required
    // in a demo banking-app

    if(this.notifications.valid){
      if(this.notifications.dirty){
        // @ts-ignore
        let n1 = {...this.notifications_array[0], ...this.notifications.get('0').value}
        let n2;

        if(this.notifications_array?.length== 2 &&  this.notifications.length == 2){

          // @ts-ignore
          n2 = {...this.notifications_array[1], ...this.notifications.get('1').value}

          n2.modifiedDate = new Date(Date.now());
          n2.modifiedBy = this.authService.instance.getActiveAccount()?.name;
          this.convertOptions(n2);
          // Here we use Http put since this notification object already exists on the db
          this.updateNotification(n2).subscribe({
            next: () => this.whenSaveComplete(),
            error: err => console.log(err)
          })
        }else if(this.notifications.length == 2 && this.notifications_array?.length == 1){

          // @ts-ignore
          n2 = this.notifications.get('1').value;
          n2.createdDate = new Date(Date.now());
          n2.createdBy = this.authService.instance.getActiveAccount()?.name;
          n2.modifiedDate = new Date(Date.now());
          n2.modifiedBy = this.authService.instance.getActiveAccount()?.name;
          this.convertOptions(n2);
          n2.notificationId = 0;
          n2.customerId = this.customer?.customerId;
          // Here we are setting this to active, but we can change it so that, it will be set to active by the
          // bank officers/managers after reviewing it.
          n2.status = "Active;"
          // Here we use Http Post since this notification object was created by the user.
          this.addNewNotification(n2).subscribe({
            next: () => this.whenSaveComplete(),
            error: err => console.log(err)
          });

        }else if(this.notifications.length == 1 && this.notifications_array?.length == 2){

          // Http delete
          // @ts-ignore
          n2 = this.notifications_array[1];
          this.deleteNotification(n2).subscribe({
            next: () => this.whenSaveComplete()
          })
        }


        this.convertOptions(n1);
        n1.modifiedDate = new Date(Date.now());
        n1.modifiedBy = this.authService.instance.getActiveAccount()?.name;

        this.updateNotification(n1).subscribe({
          next: () => this.whenSaveComplete(),
          error: err => console.log(err)
        })
      }else{
        console.log("No changes made!")
      }
    }

  }
}
