import { Directive, HostBinding } from '@angular/core';

@Directive({
	selector: '[appAbril]'
})
export class AbrilDirective {
	@HostBinding('style.font-family') fontFamily = 'Abril Fat Face';
}
