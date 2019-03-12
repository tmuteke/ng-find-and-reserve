import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property/property.service';
import { Property } from '../property/property.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
	private _totalProperties: number;

  constructor(private propService: PropertyService, private route: ActivatedRoute) { }

  ngOnInit() {
	  this.propService.getPropertiesData()
			.subscribe((properties: Property[]) => {
				this._totalProperties = properties.length;
			});
		this.route.params.subscribe((params: Params) => { console.log(params); });
  }

  get totalProperties(): number {
	  return this._totalProperties;
  }

}
