import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ICustomer} from "../../shared/classes/customer";
import {take} from "rxjs/operators";
import {MsalService} from "@azure/msal-angular";

@Component({
  selector: 'ba-customer-personal-details',
  templateUrl: './customer-personal-details.component.html',
  styleUrls: ['./customer-personal-details.component.scss'],
})
export class CustomerPersonalDetailsComponent implements OnInit {
  pageTitle: string = 'Personal Details';
  NotificationNo: number = 1;
  AddressNo: number = 1;
  personalDetailsForm: FormGroup;
  baseUrl: string = 'http://localhost:6600/api/customer';
  customer: ICustomer | undefined;


  // data: any;
  // loading: boolean = true;

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private authService: MsalService) {



    this.personalDetailsForm = this.fb.group({
      firstname: [{value:'', disabled: true}, [Validators.required]],
      lastname: [{value:'', disabled: true}, [Validators.required]],
      gender: [{value:'', disabled: true}, [Validators.required]],
      DoB: [{value:'', disabled: true}, [Validators.required]]

    })
  }

  async ngOnInit() {
    await this.updateDetails();

  }

  async updateDetails(){
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    this.personalDetailsForm.patchValue({
      firstname: this.customer.firstname,
      lastname: this.customer.lastname,
      gender: this.getGenderOption(this.customer.gender),
      DoB: this.customer.doB

    })

  }

  getGenderOption(option: string): string {
    // will change from Male/Female and other options to "option1", correspoding option for the html.
    return 'option1';
  }

  // getDetails(): void {
  //   this.http.get('localhost:6600').subscribe((data) => {
  //     this.data = data;
  //     this.loading = false;
  //   });
  // }
}
