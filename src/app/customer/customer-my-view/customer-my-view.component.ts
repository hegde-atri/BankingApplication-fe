import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { take } from 'rxjs/operators';
import { IAccount } from 'src/app/shared/interfaces/account';
import { customerRequest } from 'src/app/shared/interfaces/customer-request';
import { ICustomer } from '../../shared/interfaces/customer';

@Component({
  selector: 'ba-customer-my-view',
  templateUrl: './customer-my-view.component.html',
  styleUrls: ['./customer-my-view.component.scss'],
})

export class CustomerMyViewComponent implements OnInit {
  budgetForm: FormGroup;
  pageTitle: string = 'My View';
  baseUrl: string = 'http://localhost:6600/api/customer';
  request_object: customerRequest;
  customer: ICustomer | undefined;
  customers: ICustomer[] = []

  customerAccounts: IAccount[] = [];

  sliderValue: number = 0;
  sliderMaxValue: number = 1500;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private authService: MsalService
  ) {


    this.request_object = new customerRequest(0, [0], [0], [0], [0], [0]);


    this.budgetForm = this.fb.group({
      min: ['', []],
      max: ['', []],
    });
  }

  async ngOnInit() {

    this.getCustomers();

    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();

    this.customerAccounts = await this.httpClient.post<IAccount[]>(this.baseUrl + "/account",
      {CustomerId: this.customer.customerId}).pipe().toPromise();
  }


  public getCustomers(): void {
    this.httpClient.get<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username)
      .subscribe((result: ICustomer) => {
        // @ts-ignore
        let c = new Customer(result.customerId, result.firstname, result.lastname, result.gender, result.doB, result.status, result.createdDate, result.createdBy, result.modifiedDate, result.modifiedBy)
        this.customers.push(result as ICustomer);
      });
  }
}


export class Customer implements ICustomer {
  customerId: number;
  firstname: string;
  lastname: string;
  gender: string;
  doB: Date;
  status: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;

  constructor(customerId: number, firstname: string, lastname: string, gender: string, doB: Date, status: string, createdDate: Date, createdBy: string, modifiedDate: Date,  modifiedBy: string) {
    this.customerId = customerId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.gender = gender;
    this.doB = doB;
    this.status = status;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.modifiedDate = modifiedDate;
    this.modifiedBy = modifiedBy;
    console.log('i am a class constructor')
  }
}


//
// async getCustomers1()  {
//   this.httpClient.get<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username)
//     .subscribe((result: ICustomer) =>{
//       this.customer = new Customer(result.customerId, result.firstname, result.lastname, result.gender, result.doB, result.status, result.createdDate, result.createdBy, result.modifiedDate, result.modifiedBy)
//       this.customers.push(result as ICustomer);
//       this.customers.push(this.customer);
//     })
// }

// public getCustomer() {
//   this.customers.forEach(element =>{
//     let a = element as ICustomer;
//     console.log(a);
//   })
// }

//1. get all customer for login
// const cs = await this.httpClient.get<ICustomer[]>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username)
//   .pipe().toPromise();
//
// this.customers = cs;
// console.log(cs);


//   getAccounts(): void {
//     console.log(this.customerId)
//     var data = {
//       CustomerId: this.customerId
//     };
//
//     this.httpClient.post<[]>(this.baseUrl + '/account', data)
//       .subscribe((result) => {
//
//         let arr1: [] = result;
//
//         arr1.forEach((element) => {
//           let a = element as IAccount;
//           this.customerAccounts.push(a);
//         });
//       });
//   }
// }
