import { Component, OnInit } from '@angular/core';
import { EnlistService } from '../../enlist.service';

@Component({
	selector: 'app-enlist-bathrooms',
	templateUrl: './enlist-bathrooms.component.html',
	styleUrls: ['./enlist-bathrooms.component.scss']
})
export class EnlistBathroomsComponent implements OnInit {
	private _bathrooms = 0;

	constructor(private _enlistService: EnlistService) { }

	ngOnInit() {
		this._bathrooms = this._enlistService.bathrooms.nBathrooms;
	}

	get bathrooms(): number {
		return this._bathrooms;
	}

	addBathroom(event) {
		if (this._bathrooms === 1) {
			this._bathrooms = 1;
		} else {
			this._bathrooms --;
		}
	}

	subBathroom(event) {
		if (this._bathrooms === 10) {
			this._bathrooms = 10;
		} else {
			this._bathrooms ++;
		}
	}

	onNext(): void {
		this._enlistService.bathrooms.nBathrooms = this._bathrooms;
	}
}
