import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICustomer} from "../../shared/classes/customer";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";
import {MsalService} from "@azure/msal-angular";
import {IPayee} from "../../shared/classes/payee";
import {IAddress} from "../../shared/classes/address";

@Component({
  selector: 'ba-customer-edit-payee',
  templateUrl: './customer-edit-payee.component.html',
  styleUrls: ['./customer-edit-payee.component.scss']
})
export class CustomerEditPayeeComponent implements OnInit {
  payeeSelectionGroup: FormGroup
  payeeFormGroup: FormGroup;
  customer: ICustomer | undefined;
  baseUrl: string = 'http://localhost:6600/api/customer/';
  payee_array: IPayee[] | undefined;
  selected_payee: IPayee | undefined;


  constructor(private fb: FormBuilder, private httpClient: HttpClient,
              private authService: MsalService) {
    this.payeeSelectionGroup = this.fb.group({
      payee: ['', [Validators.required]]
    })
    this.payeeFormGroup = this.fb.group({
      name: ['', Validators.required],
      accountNumber: [{value: '', disabled: true}, Validators.required],
      description: ['', [Validators.required, Validators.maxLength(250)]]
    })
  }

  ngOnInit(): void {
    this.populatePayeeSelection();
    this.populatePayeeEdit();
  }

  async populatePayeeSelection(){
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    this.payee_array = await this.httpClient.get<IPayee[]>(this.baseUrl + "payee/" + this.customer.customerId + "/0")
      .pipe().toPromise();



  }

  async populatePayeeEdit(){

  }

}
