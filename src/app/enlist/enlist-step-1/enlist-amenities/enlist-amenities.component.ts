import { Component, OnInit } from '@angular/core';
import {AmenitiesService} from './amenities.service';
import {Amenity} from './amenity.model';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
	selector: 'app-enlist-amenities',
	templateUrl: './enlist-amenities.component.html',
	styleUrls: ['./enlist-amenities.component.scss']
})
export class EnlistAmenitiesComponent implements OnInit {
	private _safetyAmenities: Amenity[];
	private _generalAmenities: Amenity[];
	private _amenitiesForm: FormGroup;

	constructor(private amenitiesService: AmenitiesService) { }

	ngOnInit() {
		this._safetyAmenities = this.amenitiesService.safetyAmenities();
		this._generalAmenities = this.amenitiesService.generalAmenities();
		this._amenitiesForm = new FormGroup({
			'safetyAmenities': new FormArray([]),
			'generalAmenities': new FormArray([])
		});

		// for (const amenity of this._safetyAmenities) {
		// 	this._amenitiesForm.get('safetyAmenities').push(amenity);
		// }
	}

	get safetyAmenities(): Amenity[] {
		return this._safetyAmenities;
	}

	get generalAmenities(): Amenity[] {
		return this._generalAmenities;
	}

	get amenitesForm(): FormGroup {
		return this._amenitiesForm;
	}

	onNext(): void {
		console.log('Hello World');
	}
}
