import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-customer-personal-details',
  templateUrl: './customer-personal-details.component.html',
  styleUrls: ['./customer-personal-details.component.scss'],
})
export class CustomerPersonalDetailsComponent implements OnInit {
  pageTitle: string = 'Personal Details';
  data: any;
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getDetails(): void {
    this.http.get('localhost:6600').subscribe((data) => {
      this.data = data;
      this.loading = false;
    });
  }
}
