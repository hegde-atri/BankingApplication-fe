import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-customer-personal-details',
  templateUrl: './customer-personal-details.component.html',
  styleUrls: ['./customer-personal-details.component.scss']
})
export class CustomerPersonalDetailsComponent implements OnInit {

  pageTitle: string = "Personal Details";

  constructor() { }

  ngOnInit(): void {
  }

}
