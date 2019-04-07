import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	constructor(private http: HttpClient) {}

	public createUser(user: User): void {
		const authData: AuthData = {
			email: user.email,
			name: user.name,
			password: user.password
		};
		this.http
			.post("http://localhost:3000/api/users/signup ", authData)
			.subscribe(res => {
				console.log(res);
			});
	}

	public login(user: User): void {
		const authData: AuthData = {
			email: user.email,
			name: user.name,
			password: user.password
		};
		this.http
			.post("http://localhost:3000/api/users/login", authData)
			.subscribe(res => {
				console.log(res);
			});
	}
}
