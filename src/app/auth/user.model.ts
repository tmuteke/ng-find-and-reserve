export class User {
	public id: string;
	public email: string;
	public name: {
		first: string;
		last: string;
	};
	public password: string;
}
