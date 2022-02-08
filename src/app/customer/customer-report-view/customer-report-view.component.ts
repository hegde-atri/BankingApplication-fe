import { Component, OnInit,} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICustomer} from "../../shared/interfaces/customer";
import {take} from "rxjs/operators";
import {INotification} from "../../shared/interfaces/notification";
import {IAddress} from "../../shared/interfaces/address";
import {MsalService} from "@azure/msal-angular";
import {IAccount} from "../../shared/interfaces/account";

@Component({
  selector: 'ba-customer-report-view',
  templateUrl: './customer-report-view.component.html',
  styleUrls: ['./customer-report-view.component.scss']
})
export class CustomerReportViewComponent implements OnInit {
  pageTitle: string = "View Report";
  baseUrl: string = 'https://bankappapiv1.azurewebsites.net/api/customer/';
  customer: ICustomer | undefined;
  notifications_array: INotification[] | undefined;
  addresses_array: IAddress[] | undefined;
  accounts_array: IAccount[] | undefined;

  // I've used variables rather than using a form to update
  // values of the last changed section.
  modifiedByPersonal = "";
  modifiedDatePersonal = "";
  modifiedByNotification = "";
  modifiedDateNotification = "";
  modifiedByAccount = "";
  modifiedDateAccount = "";
  modifiedByAddress = "";
  modifiedDateAddress = "";


  constructor(private http: HttpClient, private authService: MsalService) {
  }

  async ngOnInit() {
    await this.getData();
  }

  async getData(){
    this.customer = await this.http.get<ICustomer>(this.baseUrl + "customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    //Notifications array
    this.notifications_array = await this.http.get<INotification[]>(this.baseUrl + "notification/" + this.customer.customerId +"/0")
      .pipe().toPromise();
    //Addresses array
    this.addresses_array = await this.http.get<IAddress[]>(this.baseUrl + "address/" + this.customer.customerId + "/0")
      .pipe().toPromise();
    //Accounts array
    this.accounts_array = await this.http.post<IAccount[]>(this.baseUrl + "account",
      {CustomerId: this.customer.customerId}).pipe().toPromise();

    this.modifiedByPersonal= this.customer.modifiedBy;
    this.modifiedDatePersonal = this.customer.modifiedDate.toString();

    this.notifications_array.forEach(e=>{
      if(e.type == "Primary"){
        this.modifiedByNotification = e.modifiedBy;
        this.modifiedDateNotification = e.modifiedDate.toString();
      }
    });

    this.addresses_array.forEach(e=>{
      if(e.type == "primary" || e.type == "Primary"){
        this.modifiedByAddress = e.modifiedBy;
        this.modifiedDateAddress = e.modifiedDate.toString();
      }
    });

    this.accounts_array.forEach(e=>{
      if(e.type == "Main"){
        this.modifiedByAccount = e.modifiedBy;
        this.modifiedDateAccount = e.modifiedDate.toString();
      }
    });


  }
}
