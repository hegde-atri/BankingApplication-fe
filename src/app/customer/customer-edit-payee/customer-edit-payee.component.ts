import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICustomer} from "../../shared/interfaces/customer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {take} from "rxjs/operators";
import {MsalService} from "@azure/msal-angular";
import {IPayee} from "../../shared/interfaces/payee";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

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


  constructor(private fb: FormBuilder, private httpClient: HttpClient,
              private authService: MsalService, private snackbar: MatSnackBar,
              private router: Router) {
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
  }

  async populatePayeeSelection(){
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    this.payee_array = await this.httpClient.get<IPayee[]>(this.baseUrl + "payee/" + this.customer.customerId + "/0")
      .pipe().toPromise();
  }

  async populatePayeeEdit(){
    // selected payee
    let sp = this.payeeSelectionGroup.controls['payee'].value;
    console.log(sp);
    this.payeeFormGroup.patchValue({
      name: sp.name,
      accountNumber: sp.accountNumber,
      description: sp.description
    });
  }

  updatePayee(p: IPayee): Observable<IPayee>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<IPayee>(this.baseUrl + "payee/" + p.payeeId, p, {headers: headers});
  }

  onSave(){
    if(this.payeeFormGroup.dirty){
      if(this.payeeFormGroup.valid){
        let sp = this.payeeSelectionGroup.controls['payee'].value;
        let modifiedP = {...sp, ...this.payeeFormGroup.value}
        this.updatePayee(modifiedP).subscribe({
          next:() => this.whenSaveComplete(),
          error: err => console.log(err)
        })
      }
    }
    if(!this.payeeFormGroup.dirty){
      this.snackbar.open("No changes were made","Okay");

    }else{
      this.snackbar.open("Successfully saved","Done");
      this.payeeSelectionGroup.reset();
      this.payeeFormGroup.reset();
    }


  }

  whenSaveComplete(){
    // redirect to payee list when done
    this.router.navigate(['/customer/view-payees']);

  }

}
