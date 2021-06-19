import { Property } from "./property.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable, Subject} from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class PropertyService {
	private properties: Property[] = [];
	private propertiesUpdated: Subject<Property[]> = new Subject();

	constructor(private http: HttpClient) {}

	public getProperties() {
		return this.http
			.get<{ message: string; properties: any }>(
				"http://localhost:3000/api/properties"
			)
			.pipe(
				map(propertiesData => {
					return propertiesData.properties.map(property => {
						return {
							id: property._id,
							landlord: property.landlord,
							address: property.address,
							apartmentType: property.apartmentType,
							roomType: property.roomType,
							isDedicatedSetup: property.isDedicatedSetup,
							genderAccommodated: property.genderAccommodated,
							numberOfStudents: property.numberOfStudents,
							numberOfRooms: property.numberOfRooms,
							numberOfBathrooms: property.numberOfBathrooms,
							amenities: property.amenities,
							spaces: property.spaces,
							policies: property.policies,
							description: property.description,
							rent: property.rent,
							rating: property.rating,
							reviews: property.reviews,
							creator: property.creator,
							student: property.student,
							isReserved: property.isReserved,
							reports: property.reports,
							deposit: property.deposit,
							reference: property.reference
						};
					});
				})
			)
			.subscribe(properties => {
				this.properties = properties;
				this.propertiesUpdated.next([...this.properties]);
			});
	}

	public getProperty(id: string) {
		return this.http.get<{
			_id: string;
			landlord: {
				name: {
					first: string;
					last: string;
				};
				email: string;
				phone: string;
				avatar: string;
			};
			address: {
				houseNumber: string;
				street: string;
				area: string;
				city: string;
				geo: {
					lat: number;
					lng: number;
				};
			};
			apartmentType: string;
			roomType: string;
			isDedicatedSetup: boolean;
			genderAccommodated: string;
			numberOfStudents: number;
			numberOfRooms: number;
			numberOfBathrooms: number;
			amenities: {
				essential: Array<any>;
				safety: Array<any>;
			};
			spaces: Array<any>;
			policies: Array<any>;
			description: string;
			rent: number;
			rating: number;
			reviews: number;
			creator: string;
			student: {
				name: {
					first: string;
					last: string;
				};
				email: string;
				registration: string;
				academicYear: string;
				gender: string;
			};
			isReserved: boolean;
			reports: Array<any>;
			deposit: number;
			reference: string;
		}>("http://localhost:3000/api/properties/" + id);
	}

	public addProperty(property: Property) {
		this.http
			.post<{ message: string }>(
				"http://localhost:3000/api/properties",
				property
			)
			.subscribe(() => {
				this.properties.push(property);
				this.propertiesUpdated.next([...this.properties]);
			});
	}

	public updateProperty(id: string, property: Property): void {
		this.http
			.put("http://localhost:3000/api/properties/" + id, property)
			.subscribe(res => {
				const properties = [...this.properties];
				const propertyIndex = properties.findIndex(
					p => p.id === property.id
				);
				properties[propertyIndex] = property;
				this.properties = properties;
				this.propertiesUpdated.next([...this.properties]);
			});
	}

	public deleteProperty(id: string): void {
		this.http
			.delete("http://localhost:3000/api/properties/" + id)
			.subscribe(() => {
				this.properties = this.properties.filter(property => property.id !== id);
				this.propertiesUpdated.next([...this.properties]);
			});
	}

	public getPropertyUpdateListener(): Observable<Property[]> {
		return this.propertiesUpdated.asObservable();
	}
}
