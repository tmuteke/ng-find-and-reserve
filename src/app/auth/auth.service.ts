import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private _token: string;
	private _authStatusListener: Subject<boolean> = new Subject();
	private _isAuthenticated = false;
	private _userId: string;
	private tokenTimer: any;

	constructor(private http: HttpClient, private router: Router) {}

	get token(): string {
		return this._token;
	}

	get authStatusListener(): Observable<boolean> {
		return this._authStatusListener.asObservable();
	}

	get isAuthenticated(): boolean {
		return this._isAuthenticated;
	}

	get userId(): string {
		return this._userId;
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
			.post<{ token: string; expiresIn: number; userId: string }>(
				"http://localhost:3000/api/users/login",
				authData
			)
			.subscribe(res => {
				const token = res.token;
				this._token = token;
				if (token) {
					const expiresIn = res.expiresIn;
					this.setAuthTimer(expiresIn);
					this._isAuthenticated = true;
					this._userId = res.userId;
					this._authStatusListener.next(true);
					const now = new Date();
					const expiration = new Date(
						now.getTime() + expiresIn * 1000
					);
					this.saveAuthData(token, expiration, this.userId);
					this.router.navigate(["/"]);
				}
			});
	}

	public autoAuthUser(): void {
		const auth = this.getAuthData();
		if (!auth) {
			return;
		}
		const now = new Date();
		const expiresIn = auth.expiration.getTime() - now.getTime();
		if (expiresIn > 0) {
			this._token = auth.token;
			this._isAuthenticated = true;
			this._userId = auth.userId;
			this.setAuthTimer(expiresIn / 1000);
			this._authStatusListener.next(true);
		}
	}

	public logout(): void {
		this._token = null;
		this._isAuthenticated = false;
		this._authStatusListener.next(false);
		this._userId = null;
		clearTimeout(this.tokenTimer);
		this.clearAuthData();
		this.router.navigate(["/"]);
	}

	private setAuthTimer(duration: number) {
		this.tokenTimer = setTimeout(() => {
			this.logout();
		}, duration * 1000);
	}

	private saveAuthData(token: string, expiration: Date, userId: string): void {
		localStorage.setItem("token", token);
		localStorage.setItem("expiration", expiration.toISOString());
		localStorage.setItem("userId", userId);
	}

	private clearAuthData(): void {
		localStorage.removeItem("token");
		localStorage.removeItem("expiration");
		localStorage.removeItem("userId");
	}

	private getAuthData(): { token: string; expiration: Date, userId: string } {
		const token = localStorage.getItem("token");
		const expiration = localStorage.getItem("expiration");
		const userId = localStorage.getItem("userId");
		if (!token || !expiration) {
			return;
		}
		return {
			token: token,
			expiration: new Date(expiration),
			userId: userId
		};
	}
}
