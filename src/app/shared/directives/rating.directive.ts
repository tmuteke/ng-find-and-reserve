import { Directive, HostBinding, Input, OnInit } from "@angular/core";

@Directive({
	selector: "[appRating]"
})
export class RatingDirective implements OnInit {
	@Input() public rating: string;
	@Input() public rating1: string;
	@Input() public rating2: string;
	@Input() public rating3: string;
	@Input() public rating4: string;
	@Input() public rating5: string;
	@HostBinding("style.color") private defaultColor = "#CFD8DC";
	@HostBinding("class.fa-star-o") private defaultClass = true;
	@HostBinding("class.fa-star") private activeClass = false;

	ngOnInit(): void {
		if (
			+this.rating1 >= 1 ||
			+this.rating2 >= 2 ||
			+this.rating3 >= 3 ||
			+this.rating4 >= 4 ||
			+this.rating5 >= 5
		) {
			this.defaultColor = "#26A69A";
			this.defaultClass = false;
			this.activeClass = true;
		} else if (+this.rating < 2) {
			this.defaultColor = "#EF5350";
			this.defaultClass = false;
			this.activeClass = false;
		} else if (+this.rating < 3.5) {
			this.defaultColor = "#FFCA28";
			this.defaultClass = false;
			this.activeClass = false;
		} else if (+this.rating >= 3.5) {
			this.defaultColor = "#26A69A";
			this.defaultClass = false;
			this.activeClass = false;
		}
	}
}
