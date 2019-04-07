export class Room {
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
}
