import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-customer-my-view',
  templateUrl: './customer-my-view.component.html',
  styleUrls: ['./customer-my-view.component.scss']
})
export class CustomerMyViewComponent implements OnInit {

  pageTitle: string = "My View";

  constructor() { }

  ngOnInit(): void {
  }

}
