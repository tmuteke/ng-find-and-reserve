export class Room {
	public id: string;
	public roomHostel: string;
	public roomNumber: number;
	public roomFee: number;
	public genderAccommodated: string;
	public amenities: {
		essential: Array<any>;
		safety: Array<any>;
	};
	public spaces: Array<any>;
	public policies: Array<any>;
	public student: {
		name: {
			first: string;
			last: string;
		};
		email: string;
		registration: string;
		academicYear: string;
		gender: string;
	};
	public isReserved: boolean;
}
