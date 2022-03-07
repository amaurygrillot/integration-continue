import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appColorMessage]'
})
export class ColorMessageDirective {
  @Input() @HostBinding('style.color') color;

  constructor() {
  }

}
