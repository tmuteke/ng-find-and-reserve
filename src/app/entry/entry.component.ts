import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property/property.service';
import { Property } from '../property/property.model';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
	private _totalProperties: number;  

  constructor(private _propertyService: PropertyService) { }

  ngOnInit() {
	  this._propertyService.getPropertiesData()
			.subscribe((properties: Property[]) => {
				this._totalProperties = properties.length;
			});
  }

  get totalProperties(): number {
	  return this._totalProperties;
  }

}
