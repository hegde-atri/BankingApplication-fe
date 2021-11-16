import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  // data: any;
  // loading: boolean = true;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.personalDetailsForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      DoB: ['', [Validators.required]]

    })
  }

  ngOnInit(): void {}

  // getDetails(): void {
  //   this.http.get('localhost:6600').subscribe((data) => {
  //     this.data = data;
  //     this.loading = false;
  //   });
  // }
}
