import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { Subject, Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private _token: string;
	private _isAuthenticated: Subject<boolean> = new Subject();
	private _authStatus = false;

	constructor(private http: HttpClient) {}

	get token(): string {
		return this._token;
	}

	get isAuthenticated(): Observable<boolean> {
		return this._isAuthenticated.asObservable();
	}

	get authStatus(): boolean {
		return this._authStatus;
	}

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
			.post<{ token: string }>(
				"http://localhost:3000/api/users/login",
				authData
			)
			.subscribe(res => {
				const token = res.token;
				this._token = token;
				if (token) {
					this._authStatus = true;
					this._isAuthenticated.next(this._authStatus);
				}
			});
	}
}
