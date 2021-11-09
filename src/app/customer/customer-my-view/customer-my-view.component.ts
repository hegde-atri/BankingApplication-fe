import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ba-customer-my-view',
  templateUrl: './customer-my-view.component.html',
  styleUrls: ['./customer-my-view.component.scss']
})
export class CustomerMyViewComponent implements OnInit {
  budgetForm: FormGroup;
  pageTitle: string = "My View";
  sliderValue:number  = 0;
  sliderMaxValue:number  = 1500;

  constructor(private fb: FormBuilder) {
    this.budgetForm = this.fb.group({
      min: ['', []],
      max: ['', []]
    });
  }

  ngOnInit(): void {

  }

}
