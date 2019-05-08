import { Injectable } from "@angular/core";
import {Superuser} from './superuser.model';
import { HttpClient } from "@angular/common/http";
import { SuperuserAuthData } from "./superuser-auth-data.model";
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable({
	providedIn: "root"
})
export class SuperuserAuthService {
	private _superuserToken: string;
	private _superuserAuthStatusListener: Subject<boolean> = new Subject();
	private _isSuperuserAuthenticated = false;
	private _superuserId: string;
	private tokenTimer: any;
	private superusers: Superuser[] = [];
	private usersUpdated: Subject<Superuser[]> = new Subject();

	constructor(
		private http: HttpClient,
		private router: Router,
		private toastr: ToastrService
	) {}

	get superuserToken(): string {
		return this._superuserToken;
	}

	get superuserAuthStatusListener(): Observable<boolean> {
		return this._superuserAuthStatusListener.asObservable();
	}

	get isSuperuserAuthenticated(): boolean {
		return this._isSuperuserAuthenticated;
	}

	get superuserId(): string {
		return this._superuserId;
	}

	public createSuperuser(superuser: Superuser): void {
		const authData: SuperuserAuthData = {
			username: superuser.username,
			password: superuser.password
		};
		this.http
			.post<{ message: string; result: string }>(
				"http://localhost:3000/api/superuser/signup ",
				authData
			)
			.subscribe(res => {
				if (!res.result) {
					this.toastr.toastrConfig.positionClass = "toast-top-center";
					this.toastr.error(
						"Superuser " +
							authData.username +
							" already exists. Use another email to sign up.",
						"Duplicate Account"
					);
				} else {
					this.toastr.success(
						"You've been signed up successfully",
						"Success!"
					);
					this.router.navigate(["/superuser/login"]);
				}
			});
	}

	public superuserLogin(user: Superuser): any {
		const authData: SuperuserAuthData = {
			username: user.username,
			password: user.password
		};
		this.http
			.post<{ token: string; expiresIn: number; userId: string }>(
				"http://localhost:3000/api/superuser/login",
				authData
			)
			.subscribe(res => {
				const token = res.token;
				this._superuserToken = token;
				if (token) {
					const expiresIn = res.expiresIn;
					this.setAuthTimer(expiresIn);
					this._isSuperuserAuthenticated = true;
					this._superuserId = res.userId;
					this._superuserAuthStatusListener.next(true);
					const now = new Date();
					const expiration = new Date(now.getTime() + expiresIn * 1000);
					this.saveSuperuserAuthData(token, expiration, this.superuserId);
					this.router.navigate(["/superuser/dashboard"]);
				} else {
					this.toastr.toastrConfig.positionClass = "toast-top-center";
					this.toastr.error(
						"Incorrect username or password.",
						"Login failed!"
					);
				}
			});
	}

	public getUsers() {
		return this.http
			.get<{ message: string; users: any }>(
				"http://localhost:3000/api/superuser"
			)
			.pipe(
				map(userData => {
					return userData.users.map(user => {
						return {
							id: user._id,
							username: user.username,
							password: user.password
						};
					});
				})
			)
			.subscribe(users => {
				this.superusers = users;
				this.usersUpdated.next([...this.superusers]);
			});
	}

	public deleteUser(id: string): void {
		this.http
			.delete("http://localhost:3000/api/users/" + id)
			.subscribe(() => {
				this.superusers = this.superusers.filter(user => user.id !== id);
				this.usersUpdated.next([...this.superusers]);
			});
	}

	public getUsersUpdateListener(): Observable<Superuser[]> {
		return this.usersUpdated.asObservable();
	}

	public getUser(id: string) {
		return this.http.get<{
			_id: string;
			username: string;
			password: string;
		}>("http://localhost:3000/api/superuser/" + id);
	}

	public autoAuthSuperuser(): void {
		const auth = this.getSuperuserAuthData();
		if (!auth) {
			return;
		}
		const now = new Date();
		const expiresIn = auth.expiration.getTime() - now.getTime();
		if (expiresIn > 0) {
			this._superuserToken = auth.token;
			this._isSuperuserAuthenticated = true;
			this._superuserId = auth.userId;
			this.setAuthTimer(expiresIn / 1000);
			this._superuserAuthStatusListener.next(true);
		}
	}

	public superuserLogout(): void {
		this._superuserToken = null;
		this._isSuperuserAuthenticated = false;
		this._superuserAuthStatusListener.next(false);
		this._superuserId = null;
		clearTimeout(this.tokenTimer);
		this.clearSuperuserAuthData();
		this.router.navigate(["/"]);
	}

	private setAuthTimer(duration: number) {
		this.tokenTimer = setTimeout(() => {
			this.superuserLogout();
		}, duration * 1000);
	}

	private saveSuperuserAuthData(token: string, expiration: Date, userId: string): void {
		localStorage.setItem("superuserToken", token);
		localStorage.setItem("superuserExpiration", expiration.toISOString());
		localStorage.setItem("superuserId", userId);
	}

	private clearSuperuserAuthData(): void {
		localStorage.removeItem("superuserToken");
		localStorage.removeItem("superuserExpiration");
		localStorage.removeItem("superuserId");
	}

	private getSuperuserAuthData(): { token: string; expiration: Date; userId: string } {
		const token = localStorage.getItem("superuserToken");
		const expiration = localStorage.getItem("superuserExpiration");
		const userId = localStorage.getItem("superuserId");
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
