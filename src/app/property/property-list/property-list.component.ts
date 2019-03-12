import { Component, OnInit, Input } from '@angular/core';

import { Property } from '../property.model';
import { PropertyService } from '../property.service';

@Component({
	selector: 'app-property-list',
	templateUrl: './property-list.component.html',
	styleUrls: ['./property-list.component.scss']
})

export class PropertyListComponent implements OnInit {
	private _properties: Property[];
	@Input() curate: boolean;
	@Input() affordable: boolean;
	@Input() price: number;

	constructor(private propService: PropertyService) { }

	ngOnInit(): void {
		this.propService.getPropertiesData()
			.subscribe((properties: Property[]) => {
				let randomIndex = this.getRandomInt(properties.length);
				if (randomIndex + 8 > properties.length) {
					randomIndex -= 9;
				}
				if (this.affordable) {
					const aff: Property[] = [];
					for (const item of properties) {
						if (+this.removeFirstChar(item.rent) <= this.price) {
							aff.push(item);
						}
					}
					randomIndex = this.getRandomInt(aff.length);
					if (randomIndex + 4 > aff.length) {
						randomIndex -= 5;
					}
					this._properties = aff.slice(randomIndex, randomIndex + 4);
				} else if (this.curate) {
					this._properties = properties.slice(randomIndex, randomIndex + 8);
				} else {
					this._properties = properties;
				}
				this.propService.properties = properties;
			});
	}

	get properties(): Property[] {
		return this._properties;
	}

	getRandomInt(value: number): number {
		return Math.floor(Math.random() * Math.floor(value));
	}

	removeFirstChar(string: string): string {
		while (string.charAt(0) === '$') {
			string = string.substr(1);
		}
		return string;
	}
}
