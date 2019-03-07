import { Property } from './property.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PropertyService {
	private _properties: Property[];
	private _id: Subject<string> = new Subject();

	constructor(private _http: HttpClient) {}

	get properties(): Property[] {
		return this._properties;
	}

	set properties(properties: Property[]) {
		this._properties = properties;
	}

	get id(): Subject<string> {
		return this._id;
	}

	getPropertySelectedId(): Observable<string> {
		return this._id;
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
