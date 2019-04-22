export class Property {
	public id: string;
	public landlord: {
		name: {
			first: string;
			last: string;
		};
		email: string;
		phone: string;
		avatar: string;
	};
	public address: {
		houseNumber: string;
		street: string;
		area: string;
		city: string;
		geo: {
			lat: number;
			lng: number;
		};
	};
	public apartmentType: string;
	public roomType: string;
	public isDedicatedSetup: boolean;
	public genderAccommodated: string;
	public numberOfStudents: number;
	public numberOfRooms: number;
	public numberOfBathrooms: number;
	public amenities: {
		essential: Array<any>;
		safety: Array<any>;
	};
	public spaces: Array<any>;
	public policies: Array<any>;
	public description: string;
	public rent: number;
	public rating: number;
	public reviews: number;
	public creator: string;
}
