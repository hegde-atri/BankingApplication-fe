import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-customer-report-view',
  templateUrl: './customer-report-view.component.html',
  styleUrls: ['./customer-report-view.component.scss']
})
export class CustomerReportViewComponent implements OnInit {

  pageTitle: string = "View Report";

  constructor() { }

  ngOnInit(): void {
  }

}
