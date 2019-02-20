import {Directive, HostBinding, HostListener} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
	selector: '[appLike]'
})
export class LikeDirective {
	@HostBinding('class.fa-heart-o') outlined = true;
	@HostBinding('class.fa-heart') full = false;
	@HostBinding('class.red') red = false;
	@HostBinding('style') get bgTransition(): SafeStyle {
		return this._sanitizer.bypassSecurityTrustStyle('transition: background 150s');
	}

	constructor(private _sanitizer: DomSanitizer) {}

	@HostListener('click') onClick() {
		this.outlined = !this.outlined;
		this.full = !this.full;
		this.red = !this.red;
	}
}

