import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-customer-update-details',
  templateUrl: './customer-update-details.component.html',
  styleUrls: ['./customer-update-details.component.scss']
})
export class CustomerUpdateDetailsComponent implements OnInit {

  pageTitle: string = "Update Details";

  constructor() { }

  ngOnInit(): void {
  }

}
