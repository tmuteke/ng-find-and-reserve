export class Property {
	constructor(
		private _id: string,
		private _landlord: {
			name: {
				first: string,
				last: string
			}
			email: string,
			phone: string,
			avatar: string
		},
		private _address: {
			houseNumber: string,
			street: string,
			city: string,
			state: string,
			geo: {
				lat: number,
				lng: number
			}
		},
		private _rent: string,
		private _rating: string,
		private _reviews: number
	) {}

	get id(): string {
		return this._id;
	}

	get landlord(): { name: { first: string; last: string }; email: string; phone: string; avatar: string } {
		return this._landlord;
	}

	get address(): { houseNumber: string; street: string; city: string; state: string; geo: { lat: number; lng: number } } {
		return this._address;
	}

	get rent(): string {
		return this._rent;
	}

	get rating(): string {
		return this._rating;
	}

	get reviews(): number {
		return this._reviews;
	}
}
