export class Space {
    constructor(private _name: string, private _value: string) {}

    get name(): string {
        return this._name;
    }

    get value(): string {
        return this._value;
    }
}
