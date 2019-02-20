import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[appRating]'
})
export class RatingDirective implements OnInit {
	@Input() rating: string;
	@Input() rating1: string;
	@Input() rating2: string;
	@Input() rating3: string;
	@Input() rating4: string;
	@Input() rating5: string;
	@HostBinding('style.color') defaultColor = '#CFD8DC';
	@HostBinding('class.fa-star-o') defaultClass = true;
	@HostBinding('class.fa-star') activeClass = false;


	ngOnInit(): void {
		if ((+this.rating1 >= 1) ||
			(+this.rating2 >= 2)  ||
			(+this.rating3 >= 3) ||
			(+this.rating4 >= 4) ||
			(+this.rating5 >= 5)) {
			this.defaultColor = '#26A69A';
			this.defaultClass = false;
			this.activeClass = true;
		} else if (+this.rating < 2) {
			this.defaultColor = '#EF5350';
			this.defaultClass = false;
			this.activeClass = false;
		} else if (+this.rating < 3.5) {
			this.defaultColor = '#FFCA28';
			this.defaultClass = false;
			this.activeClass = false;
		} else if (+this.rating >= 3.5) {
			this.defaultColor = '#26A69A';
			this.defaultClass = false;
			this.activeClass = false;
		}
	}
}
