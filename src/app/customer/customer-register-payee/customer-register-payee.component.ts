import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ICustomer} from "../../shared/classes/customer";
import {INotification} from "../../shared/classes/notification";
import {MsalService} from "@azure/msal-angular";
import {take, tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IPayee} from "../../shared/classes/payee";

@Component({
  selector: 'ba-customer-register-payee',
  templateUrl: './customer-register-payee.component.html',
  styleUrls: ['./customer-register-payee.component.scss']
})
export class CustomerRegisterPayeeComponent implements OnInit {
  payeeForm: FormGroup
  pageTitle: string = "Register Payee";
  baseUrl: string = 'http://localhost:6600/api/customer/';
  customer: ICustomer | undefined;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private authService: MsalService) {
    this.payeeForm = this.fb.group({
      Name: ['', [Validators.required]],
      AccountNumber: ['', [Validators.required]],
      // Sortcode: ['', [Validators.required]],
      Description: ['', [Validators.required]]
    })
  }

  async ngOnInit() {
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();

  }

  addPayee(p: IPayee){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<INotification>(this.baseUrl + "/payee", p, {headers: headers})
      .pipe(
        tap(data => console.log("create Payee: " + JSON.stringify(data)))
      );
  }

  whenSaveComplete(){
        console.log("payee added");
  }

  submit(){
    if(this.payeeForm.valid){
      const p: IPayee = this.payeeForm.value;
      p.customerId = this.customer?.customerId!
      this.addPayee(p).subscribe({
        next: () => this.whenSaveComplete(),
        error: err => console.log(err)
      });
      this.payeeForm.reset();
    }
  }



}
