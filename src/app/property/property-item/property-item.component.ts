import { Component, Input, OnInit } from '@angular/core';

import { Property } from '../property.model';
import { ImagesService } from '../../shared/services/images.service';
import { PropertyService } from '../property.service';

@Component({
	selector: 'app-property-item',
	templateUrl: './property-item.component.html',
	styleUrls: ['./property-item.component.scss'],
	providers: [ImagesService, PropertyService]
})

export class PropertyItemComponent implements OnInit {
	@Input() property: Property;
	private _imageUrl: string;

	constructor(private imagesService: ImagesService) {}

	ngOnInit(): void {
		this._imageUrl = this.imagesService.images[0];
	}

	get imageUrl(): string {
		return this._imageUrl;
	}
}
