import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ba-account-number]'
})

export class accountNumberDirective {
  //This regex is the allowed input
  private regex: RegExp = new RegExp(/^\d+$/);
  // These are the allowed keys
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) {
    
  }

  // Check comments in two-decimal-money-input.ts for more detail
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(this.el.nativeElement.value);

    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let e = <KeyboardEvent> event;
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
  }

  }


}