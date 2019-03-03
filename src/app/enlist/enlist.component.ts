import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-enlist',
	templateUrl: './enlist.component.html',
	styleUrls: ['./enlist.component.scss']
})
export class EnlistComponent implements OnInit {
	private _beginEnlisting = false;
	private _form: FormGroup;
	private _redirectTo: string;

	constructor(private route: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {
		this._form = new FormGroup({
			'enlistType': new FormControl('new')
		});
	}

	get beginEnlisting(): boolean {
		return this._beginEnlisting;
	}

	onEnlist(): void {
		this._beginEnlisting = true;
		this.router.navigate(['089083'], {relativeTo: this.route});
	}

	get form(): FormGroup {
		return this._form;
	}

	get redirectTo(): string {
		return this._redirectTo;
	}

	onProceed(): void {
		const radioValue = this._form.get('enlistType').value;
		if (radioValue === 'new') {
			this._redirectTo = 'room';
			// console.log(radioValue);
		}
		this.router.navigate(['089083', this._redirectTo], {relativeTo: this.route});
	}

}
