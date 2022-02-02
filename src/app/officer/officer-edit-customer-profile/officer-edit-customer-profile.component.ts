import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICustomer} from "../../shared/interfaces/customer";
import {INotification} from "../../shared/interfaces/notification";
import {IAddress} from "../../shared/interfaces/address";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MsalService} from "@azure/msal-angular";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {take, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'ba-officer-edit-customer-profile',
  templateUrl: './officer-edit-customer-profile.component.html',
  styleUrls: ['./officer-edit-customer-profile.component.scss']
})
export class OfficerEditCustomerProfileComponent implements OnInit {
  customerForm: FormGroup;
  emailForm: FormGroup;
  pageTitle: string = 'Edit customer';
  baseUrl: string = 'http://localhost:6600/api/officer/';
  custUrl: string = 'http://localhost:6600/api/officer/customer/';
  addUrl: string = 'http://localhost:6600/api/officer/address/';
  notUrl: string = 'http://localhost:6600/api/officer/notification/';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  notifications_array: INotification[] | undefined;
  addresses_array: IAddress[] | undefined;
  validEmail = false;
  selectedCustomer: ICustomer | undefined;
  username: string;

  constructor(private fb: FormBuilder, private httpClient: HttpClient,
              private authService: MsalService, private router: Router,
              private snackbar: MatSnackBar) {
    this.customerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      DoB: ['', [Validators.required]],
      addresses: this.fb.array([this.buildAddresses()]),
      notifications: this.fb.array([this.buildNotifications()])
    });
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.username = this.authService.instance.getActiveAccount()?.username!;
  }

  ngOnInit(): void {
  }

  openEditProfile(){
    window.open("https://superstonks.b2clogin.com/superstonks.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_editProfile&client_id=7c6dfea2-ff7b-4e36-8b11-08410e69f4e2&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A4200&scope=openid&response_type=id_token&prompt=login");
  }

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }
  get notifications(): FormArray {
    return <FormArray>this.customerForm.get('notifications');
  }

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

  getGender(option: string): string{
    if(option === "option1"){
      return "Male";
    } else if(option === "option2"){
      return "Female"
    } else {
      return "Other"
    }
  }

  getGenderOption(option: string): string {
    // will change from Male/Female and other options to "option1", corresponding option for the html.
    if(option === "male" || option === "Male"){
      return "option1";
    }else if(option === "female" || option === "Female"){
      return "option2";
    }else{
      return "option3";
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

  //checks for customer using email and then gets the customer Object if it exists
  async checkGetEmail(){
    let email = this.emailForm.get('email')?.value;
    this.validEmail = await this.httpClient.get<boolean>(this.baseUrl + "checkcustomer/" + email, {headers: this.headers})
      .pipe(take(1)).toPromise();
  }


  async populateExistingData() {
    //here we have api calls that are redundant to make tslint happy
    this.selectedCustomer = await this.httpClient.get<ICustomer>(this.custUrl + this.emailForm.get('email')?.value)
      .pipe(take(1)).toPromise();
    //Notifications array
    this.notifications_array = await this.httpClient.get<INotification[]>(this.notUrl + this.selectedCustomer.customerId +"/0")
      .pipe().toPromise();
    //Addresses array
    this.addresses_array = await this.httpClient.get<IAddress[]>(this.addUrl + this.selectedCustomer.customerId + "/0")
      .pipe().toPromise();


    this.customerForm.patchValue({
      firstname: this.selectedCustomer.firstname,
      lastname: this.selectedCustomer.lastname,
      gender: this.getGenderOption(this.selectedCustomer.gender!),
      DoB: this.selectedCustomer.dob
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

  convertNOptions(n: INotification){
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

  convertAOptions(a: IAddress){
    if(a.type == "option1"){
      a.type = "Primary";
    }else{
      a.type = "Secondary";
    }
  }

  updateNotification(n: INotification): Observable<INotification>{
    return this.httpClient.put<INotification>(this.notUrl + n.notificationId, n, {headers: this.headers});
  }

  updateAddress(a: IAddress): Observable<IAddress>{
    return this.httpClient.put<IAddress>(this.addUrl + a.addressId, a, {headers: this.headers});
  }

  updateCustomer(c: ICustomer): Observable<ICustomer>{
    return this.httpClient.put<ICustomer>(this.custUrl + c.customerId, c, {headers: this.headers});
  }

  addNewNotification(n: INotification): Observable<INotification>{
    return this.httpClient.post<INotification>(this.notUrl, n, {headers: this.headers})
      .pipe(
        tap(data => console.log("created Notification: " + JSON.stringify(data)))
      );
  }

  addNewAddress(a: IAddress): Observable<IAddress>{
    return this.httpClient.post<IAddress>(this.addUrl, a, {headers: this.headers})
      .pipe(
        tap(data => console.log("created Notification: " + JSON.stringify(data)))
      );
  }

  deleteNotification(n: INotification): Observable<{}>{
    return this.httpClient.delete<INotification>(this.notUrl + n.notificationId, {headers: this.headers});
  }

  deleteAddress(a: IAddress): Observable<{}>{
    return this.httpClient.delete<IAddress>(this.addUrl + a.addressId, {headers: this.headers});
  }

  pushNotificationChanges(customerId: number){
    // Handling the first notification
    let n1 = {...this.notifications_array![0], ...this.notifications.get('0')!.value}
    this.convertNOptions(n1);
    n1.modifiedBy = this.username;
    n1.modifiedDate = new Date(Date.now());
    this.updateNotification(n1).subscribe({
      error: err => console.log(err)
    });

    // Handling the second notification
    let n2;
    if(this.notifications.length == 2 && this.notifications_array?.length== 2){

      n2 = {...this.notifications_array![1], ...this.notifications.get('1')!.value}
      n2.modifiedDate = new Date(Date.now());
      n2.modifiedBy = this.username;
      this.convertNOptions(n2);
      // Here we use Http put since this notification object already exists on the db
      this.updateNotification(n2).subscribe({
        error: err => console.log(err)
      });

    }else if(this.notifications.length == 2 && this.notifications_array?.length == 1){

      n2 = this.notifications.get('1')!.value;
      n2.createdDate = new Date(Date.now());
      n2.createdBy = this.username;
      n2.modifiedDate = new Date(Date.now());
      n2.modifiedBy = this.username;
      this.convertNOptions(n2);
      n2.notificationId = 0;
      n2.customerId = customerId;
      n2.status = "Active"
      // Here we use Http Post since this notification object was created by the user.
      this.addNewNotification(n2).subscribe({
        error: err => console.log(err)
      });

    }else if(this.notifications.length == 1 && this.notifications_array?.length == 2){

      // Http delete (removed tslint)
      n2 = this.notifications_array[1];
      this.deleteNotification(n2).subscribe({
        error: err => console.log(err)
      });
    }
  }

  pushAddressChanges(customerId: number){
    let a1 = {...this.addresses_array![0], ...this.addresses.get('0')!.value};
    this.convertAOptions(a1);
    a1.modifiedBy = this.username;
    a1.modifiedDate = new Date(Date.now())
    this.updateAddress(a1).subscribe({
      error: err => console.log(err)
    });

    let a2;
    if(this.addresses.length == 2 && this.addresses_array!.length == 2){
      // Second address might be modified
      a2 = {...this.addresses_array![1], ...this.addresses.get('1')!.value};
      a2.modifiedDate = new Date(Date.now());
      a2.modifiedBy = this.username;
      this.convertAOptions(a2);
      this.updateAddress(a2).subscribe({
        error: err => console.log(err)
      })
    }else if(this.addresses.length == 2 && this.addresses_array!.length == 1){
      // Second address added
      a2 = this.addresses.get('1')!.value;
      a2.createdBy = this.username;
      a2.createdDate = new Date(Date.now());
      a2.modifiedBy = this.username;
      a2.modifiedDate = new Date(Date.now());
      this.convertAOptions(a2);
      a2.addressId = 0; // will be assigned by db
      a2.customerId = customerId;
      a2.status = "Active";
      this.addNewAddress(a2).subscribe({
        error: err => console.log(err)
      });
    }else if(this.addresses.length == 1 && this.addresses_array!.length == 2){
      // Second address deleted
      a2 = this.addresses_array![1];
      this.deleteAddress(a2).subscribe({
        error: err => console.log(err)
      });
    }

  }

  pushCustomerChanges(customerId: number){
    let temp = {
      customerId: customerId,
      firstname: this.customerForm.get('firstname')?.value,
      lastname: this.customerForm.get('lastname')?.value,
      email: this.emailForm.get('email')?.value,
      gender: this.getGender(this.customerForm.get('gender')?.value),
      dob: this.customerForm.get('DoB')?.value,
      status: "Active",
      modifiedBy: this.username,
    } as ICustomer;
    let c = {...this.selectedCustomer, ...temp};
    this.updateCustomer(c).subscribe({
      error: err => console.log(err)
    });
  }

  async submit(){
    let n_touched = this.notifications_array?.length != this.notifications.length;
    let a_touched = this.addresses_array?.length != this.addresses.length;
    let id = this.selectedCustomer?.customerId!;

    // In a real world application it would be optimal to only use http 'put' on objects that have changed
    // rather than using 'put' on all the objects if one of them has a change.
    if(this.customerForm.dirty || a_touched || n_touched){

      this.pushAddressChanges(id);
      this.pushNotificationChanges(id);
      this.pushCustomerChanges(id);

      // When all the changes are saved
      this.snackbar.open("Customer details changed successfully!", "Okay");
      this.router.navigate(['/officer/create-customer']);

    }else{
      this.snackbar.open("No changes made!", "Okay");
    }


  }

}
