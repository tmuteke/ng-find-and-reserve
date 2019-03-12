import { Property } from './property.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PropertyService {
	properties: Property[];
	private pleaseId = new Subject<any>();

	constructor(private http: HttpClient) {}

	postId(id: string) {
		this.pleaseId.next({text: id});
	}

	getId(): Observable<any> {
		return this.pleaseId.asObservable();
	}

	getPropertiesData(): Observable<object> {
		return this.http.get('assets/datasets/users.json');
	}

	public getPropertyById(id: string): Property {
		for (const property of this.properties) {
			if (property.id === id) {
				return property;
			}
		}
	}
}
