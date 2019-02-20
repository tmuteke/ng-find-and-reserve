import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'app-enlist',
	templateUrl: './enlist.component.html',
	styleUrls: ['./enlist.component.scss']
})
export class EnlistComponent implements OnInit {
	private _beginEnlisting = false;

	constructor(private route: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {
	}

	get beginEnlisting(): boolean {
		return this._beginEnlisting;
	}

	onEnlist(): void {
		this._beginEnlisting = true;
		this.router.navigate(['089083'], {relativeTo: this.route});
	}

}
