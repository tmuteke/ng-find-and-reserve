import { Component, OnInit } from "@angular/core";
import { LoginService } from "../auth/login/login.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
	private _isLoggedOn = false;
	private _isLoggingIn = false;

	constructor(
		private loginService: LoginService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this._isLoggedOn = this.loginService.isLoggedIn;
		// this.loginService.isLoggingIn
		// 	.subscribe((loggingInStatus: boolean) => {
		// 		this._isLoggingIn = loggingInStatus;
		// 	});
	}

	get isLoggedOn(): boolean {
		return this._isLoggedOn;
	}

	get isLoggingIn(): boolean {
		return this._isLoggingIn;
	}

	public onLogin(): void {
		this.loginService.isLoggingIn.next("FUCK YOU!");
		this.router.navigate(["/login"]);
	}
}
