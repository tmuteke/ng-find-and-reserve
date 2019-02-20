import {Component, OnInit} from '@angular/core';

import { Property } from '../property.model';
import { PropertyService } from '../property.service';

@Component({
	selector: 'app-property-list',
	templateUrl: './property-list.component.html',
	styleUrls: ['./property-list.component.scss']
})

export class PropertyListComponent implements OnInit {
	private _properties: Property[];

	constructor(private _propertyService: PropertyService) {}

	ngOnInit(): void {
		this._propertyService.getPropertiesData()
			.subscribe((properties: Property[]) => {
				this._properties = properties;
				this._propertyService.properties = properties;
			});
	}

	get properties(): Property[] {
		return this._properties;
	}
}
