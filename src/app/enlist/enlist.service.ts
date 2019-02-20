import {
	Injectable
} from '@angular/core';

export class Room {
	private _apartmentType: string;
	private _propertyType: string;
	private _roomType: string;
	private _isDedicatedSetup: string;
	private _genderAccommodated: string;

	constructor(apartmentType: string,
		propertyType: string,
		roomType: string,
		isDedicatedSetup: string,
		genderAccommodated: string) {
		this._apartmentType = apartmentType;
		this._propertyType = propertyType;
		this._roomType = roomType;
		this._isDedicatedSetup = isDedicatedSetup;
		this._genderAccommodated = genderAccommodated;
	}

	get apartmentType(): string {
		return this._apartmentType;
	}


	set apartmentType(value: string) {
		this._apartmentType = value;
	}

	get propertyType(): string {
		return this._propertyType;
	}

	set propertyType(value: string) {
		this._propertyType = value;
	}

	get roomType(): string {
		return this._roomType;
	}

	set roomType(value: string) {
		this._roomType = value;
	}

	get isDedicatedSetup(): string {
		return this._isDedicatedSetup;
	}

	set isDedicatedSetup(value: string) {
		this._isDedicatedSetup = value;
	}

	get genderAccommodated(): string {
		return this._genderAccommodated;
	}

	set genderAccommodated(value: string) {
		this._genderAccommodated = value;
	}

}

export class Students {
	private _nStudents: number;
	private _nRooms: number;

	constructor(nStudents: number, nRooms: number) {
		this._nStudents = nStudents;
		this._nRooms = nRooms;
	}

	get nStudents(): number {
		return this._nStudents;
	}

	set nStudents(value: number) {
		this._nStudents = value;
	}

	get nRooms(): number {
		return this._nRooms;
	}

	set nRooms(value: number) {
		this._nRooms = value;
	}
}

export class Bathrooms {
	private _nBathrooms: number;

	constructor(nBathrooms: number) {
		this._nBathrooms = nBathrooms;
	}

	get nBathrooms(): number {
		return this._nBathrooms;
	}

	set nBathrooms(value: number) {
		this._nBathrooms = value;
	}
}

@Injectable({
	providedIn: 'root'
})
export class EnlistService {
	private _room: Room = new Room('apartment', 'apartment', 'sharedRoom', 'yes', 'both');
	private _students: Students = new Students(5, 5);
	private _bathrooms: Bathrooms = new Bathrooms(1);

	get room(): Room {
		return this._room;
	}

	get students(): Students {
		return this._students;
	}

	get bathrooms(): Bathrooms {
		return this._bathrooms;
	}
}
