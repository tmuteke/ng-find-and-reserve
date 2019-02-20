import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { EnlistService } from '../../enlist.service';

@Component({
	selector: 'app-enlist-step-a-a',
	templateUrl: './enlist-room.component.html',
	styleUrls: ['./enlist-room.component.scss'],
})
export class EnlistRoomComponent implements OnInit {
	private _roomForm: FormGroup;

	constructor(private route: ActivatedRoute, private router: Router, private _enlistService: EnlistService) { }

	ngOnInit() {
		this._roomForm = new FormGroup({
			'propertyType': new FormControl(this._enlistService.room.propertyType),
			'roomType': new FormControl(this._enlistService.room.roomType),
			'isDedicatedSetup': new FormControl(this._enlistService.room.isDedicatedSetup),
			'genderAccommodated': new FormControl(this._enlistService.room.genderAccommodated)
		});
	}

	get roomForm(): FormGroup {
		return this._roomForm;
	}

	onNext(): void {
		if (this._roomForm.valid) {
			this._enlistService.room.propertyType = this._roomForm.get('propertyType').value;
			this._enlistService.room.roomType = this._roomForm.get('roomType').value;
			this._enlistService.room.isDedicatedSetup = this._roomForm.get('isDedicatedSetup').value;
			this._enlistService.room.genderAccommodated = this._roomForm.get('genderAccommodated').value;
			console.log(this._enlistService.room);
		}
	}

}
