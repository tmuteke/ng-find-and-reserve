export class Amenity {
	constructor(private _name: string, private _key: string, private _value: string) {}

	get name(): string {
		return this._name;
	}

	get key(): string {
		return this._key;
	}

	get value(): string {
		return this._value;
	}
}
