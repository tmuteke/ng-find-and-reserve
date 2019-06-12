import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private _token: string;
	private _authStatusListener: Subject<boolean> = new Subject();
	private _isAuthenticated = false;
	private _userId: string;
	private tokenTimer: any;
	private users: User[] = [];
	private usersUpdated: Subject<User[]> = new Subject();

	constructor(
		private http: HttpClient,
		private router: Router,
		private toastr: ToastrService
	) {}

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
			.post<{ message: string; result: string }>(
				"http://localhost:3000/api/users/signup ",
				authData
			)
			.subscribe(res => {
				if (!res.result) {
					this.toastr.toastrConfig.positionClass = "toast-top-center";
					this.toastr.error(
						"User " +
							authData.email +
							" already exists. Use another email to sign up.",
						"Duplicate Account"
					);
				} else {
					this.toastr.success(
						"You've been signed up successfully",
						"Success!"
					);
					this.router.navigate(["/login"]);
				}
			});
	}

	public login(user: User): any {
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
					const expiration = new Date(now.getTime() + expiresIn * 1000);
					this.saveAuthData(token, expiration, this.userId);
					this.router.navigate(["/"]);
				} else {
					this.toastr.toastrConfig.positionClass = "toast-top-center";
					this.toastr.error(
						"Incorrect email or password.",
						"Login failed!"
					);
				}
			});
	}

	public getUsers() {
		return this.http
			.get<{ message: string; users: any }>(
				"http://localhost:3000/api/users"
			)
			.pipe(
				map(userData => {
					return userData.users.map(user => {
						return {
							id: user._id,
							email: user.email,
							name: user.name,
							password: user.password
						};
					});
				})
			)
			.subscribe(users => {
				this.users = users;
				this.usersUpdated.next([...this.users]);
			});
	}

	public deleteUser(id: string): void {
		this.http
			.delete("http://localhost:3000/api/users/" + id)
			.subscribe(() => {
				this.users = this.users.filter(user => user.id !== id);
				this.usersUpdated.next([...this.users]);
			});
	}

	public getUsersUpdateListener(): Observable<User[]> {
		return this.usersUpdated.asObservable();
	}

	public getUser(id: string) {
		return this.http.get<{
			_id: string;
			email: string;
			name: { first: string; last: string };
			password: string;
		}>("http://localhost:3000/api/users/" + id);
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

	private getAuthData(): { token: string; expiration: Date; userId: string } {
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
