import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICustomer} from "../../shared/interfaces/customer";
import {INotification} from "../../shared/interfaces/notification";
import {MsalService} from "@azure/msal-angular";
import {take, tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IPayee} from "../../shared/interfaces/payee";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'ba-customer-register-payee',
  templateUrl: './customer-register-payee.component.html',
  styleUrls: ['./customer-register-payee.component.scss']
})
export class CustomerRegisterPayeeComponent implements OnInit {
  @ViewChild('AccountNumberNotFound') errorDiv: ElementRef | undefined;
  payeeForm: FormGroup
  pageTitle: string = "Register Payee";
  baseUrl: string = 'http://localhost:6600/api/customer/';
  customer: ICustomer | undefined;
  accountValid: boolean;

  constructor(private fb: FormBuilder, private httpClient: HttpClient,
              private authService: MsalService, private snackbar: MatSnackBar) {
    this.payeeForm = this.fb.group({
      Name: ['', [Validators.required]],
      AccountNumber: ['', [Validators.required, Validators.pattern("^(\\d){16}$")]],
      // Sortcode: ['', [Validators.required]],
      Description: ['', [Validators.required, Validators.maxLength(250)]]
    })
    this.accountValid = true;
  }

  async ngOnInit() {
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();


  }

  addPayee(p: IPayee){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<INotification>(this.baseUrl + "payee", p, {headers: headers})
      .pipe(
        tap(data => console.log("created Payee: " + JSON.stringify(data)))
      );
  }

  whenSaveComplete(){
    this.payeeForm.reset();
    this.snackbar.open("Payee added!", "Done")
  }


  // async isAccountValid(){
  //   let acc = this.payeeForm.controls['AccountNumber'].value
  //   let a = await this.httpClient.get<boolean>(this.baseUrl + "account/" + acc).pipe(take(1)).toPromise();
  // }

  async submit(){
    if(this.payeeForm.valid){
      let acc = this.payeeForm.controls['AccountNumber'].value
      let a = await this.httpClient.get<boolean>(this.baseUrl + "account/" + acc).pipe(take(1)).toPromise();
      if(a){
        const p: IPayee = this.payeeForm.value;
        p.customerId = this.customer?.customerId!
        this.addPayee(p).subscribe({
          next: () => this.whenSaveComplete(),
          error: err => console.log(err)
        });
      }else{
        this.snackbar.open("Account number is invalid","Retry");
      }

    }
  }



}
