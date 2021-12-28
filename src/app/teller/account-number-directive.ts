import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[ba-account-number]'
})

export class accountNumberDirective {
  //This regex is the allowed input
  // private regex: RegExp = new RegExp(/^\d+$/);
  // These are the allowed keys
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor() {

  }

  // Check comments in two-decimal-money-input.ts for more detail
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let e = <KeyboardEvent> event;
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
  }

  }


}
