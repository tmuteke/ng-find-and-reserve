import { Property } from './property.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PropertyService {
	private _properties: Property[];

	constructor(private _http: HttpClient) {}

	get properties(): Property[] {
		return this._properties;
	}

	set properties(properties: Property[]) {
		this._properties = properties;
	}

	getPropertiesData(): Observable<object> {
		return this._http.get('assets/datasets/users.json');
	}

	public getPropertyById(id: string): Property {
		for (const property of this._properties) {
			if (property.id === id) {
				return property;
			}
		}
	}
}
