import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	private _isLoggedIn: boolean = false;
	private _isLoggingIn: Subject<any> = new Subject();

	get isLoggedIn(): boolean {
		return this._isLoggedIn;
	}

	get isLoggingIn(): Subject<any> {
		return this._isLoggingIn;
	}

	public login(): void {
		this._isLoggedIn = true;
	}

	public logout(): void {
		this._isLoggedIn = false;
	}
}
