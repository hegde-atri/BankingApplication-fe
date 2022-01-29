import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IAccount} from "../../shared/interfaces/account";
import {MsalService} from "@azure/msal-angular";
import {Observable} from "rxjs";
import {INotification} from "../../shared/interfaces/notification";
import {ICustomer} from "../../shared/interfaces/customer";
import {Router} from "@angular/router";

@Component({
  selector: 'ba-officer-create-customer-account',
  templateUrl: './officer-create-customer-account.component.html',
  styleUrls: ['./officer-create-customer-account.component.scss']
})
export class OfficerCreateCustomerAccountComponent implements OnInit {
  pageTitle: string = "Create customer";
  customerForm: FormGroup;
  baseUrl: string = "http://localhost:6600/api/officer/";
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  username: string;

  get addresses(): FormArray{
    return <FormArray>this.customerForm.get('addresses');
  }
  get notifications(): FormArray{
    return <FormArray>this.customerForm.get('notifications');
  }

  constructor(private fb: FormBuilder, private httpClient: HttpClient,
              private snackbar: MatSnackBar, private authService: MsalService,
              private router: Router) {
    // Creates a formGroup. Each formControl component has its Validators specified.
    this.customerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      doB: ['', [Validators.required]],
      addresses: this.fb.array([this.buildAddresses()]),
      notifications: this.fb.array([this.buildNotifications()])
    });
    this.username = this.authService.instance.getActiveAccount()?.username!;
  }

  ngOnInit(): void {
    this.username = this.authService.instance.getActiveAccount()?.username!;
  }

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
    if(option === "option1"){
      return "Email";
    }else {
      return "Phone";
    }
  }

  getAttributeType(option: string): string {
    if (option == 'option1') {
      return 'Primary';
    } else return 'Secondary';
  }

  createAccountObj(name: string | undefined, id: number, type: string): IAccount{
    // The account will not have a close date unless it has been cancelled or
    // requested to be taken down.
    // TODO generate acc number and see if already one exists.
    return {
      customerId: id,
      //TODO
      accountNumber: "45654546564456456",
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

  getGender(option: string): string {
    // will change from Male/Female and other options to "option1", corresponding option for the html.
    if (option === "option1") {
      return "Male";
    } else if (option === "option2") {
      return "Female";
    } else {
      return "Other";
    }
  }

  checkAccountNumber(accNum: string): boolean{
    return false;
  }

  createCustomerObj(): ICustomer{
    let c = this.customerForm.value as ICustomer;
    return{
      firstname: c.firstname,
      lastname: c.lastname,
      gender: this.getGender(c.gender),
      doB: c.doB,
      status: "Active",
      createdBy: this.username,
      createdDate: new Date(Date.now()),
      modifiedBy: this.username,
      modifiedDate: new Date(Date.now())
    } as ICustomer
  }

  createNotObj(n: INotification, id: number): INotification {
    n.customerId = id;
    n.preference = this.getNotificationOption(n.preference);
    n.type = this.getAttributeType(n.type);
    n.status= "Active";
    n.createdBy= this.username;
    n.createdDate= new Date(Date.now());
    n.modifiedBy= this.username;
    n.modifiedDate= new Date(Date.now());
    return n;
  }



  addNewCustomer(c: ICustomer):Observable<ICustomer>{
    return this.httpClient.post<ICustomer>(this.baseUrl + "customer", c,{headers: this.headers}) ;
  }

  addNewAccount(a: IAccount): Observable<IAccount>{
    return this.httpClient.post<IAccount>(this.baseUrl + "account", a, {headers: this.headers});
  }

  addNewNotification(n: INotification):Observable<INotification>{
    return this.httpClient.post<INotification>(this.baseUrl + "notification", n, {headers: this.headers});
  }


  createCustomer(a: ICustomer): Observable<ICustomer>{
    return this.httpClient.post<ICustomer>(this.baseUrl + "customer", a, {headers: this.headers});
  }

  createAddresses(){

  }

  createNotifications(customerId: number){
    let n1 = this.createNotObj(this.notifications.get('0')?.value, customerId);
    this.addNewNotification(n1).subscribe({
      error: err => console.log(err)
    });

    if(this.notifications.length == 2){
      let n2 = this.notifications.get('1')?.value;
      this.addNewNotification(n2).subscribe({
        error: err => console.log(err)
      });
    }


  }

  createAccounts(customerId: number){
    // The 2 accounts needed to be created
    let a1 = this.createAccountObj(this.username, customerId, "Main");
    this.addNewAccount(a1).subscribe({
      error: err => console.log(err)
    });

    let a2 = this.createAccountObj(this.username, customerId, "Savings");
    this.addNewAccount(a2).subscribe({
      error: err => console.log(err)
    });
  }

  submit(){
    // When submit is pressed we must add the new customer, address and notification objects to the db
    // We should also create the account objects of the customer.


    if(this.customerForm.valid){
      console.log(this.createCustomerObj());
      // this.createCustomer();
      // this.createNotifications();
      // this.createAddresses();
      // // TODO get customer Id of customer created
      // this.createAccounts(1);
      // this.snackbar.open("Customer Created!", "Okay")
      // this.router.navigate(['/officer/create-customer']);
    }
  }

}
