import { Component, OnInit } from "@angular/core";
import { SuperuserAuthService } from "./superuser-auth/superuser-auth.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-superuser",
	templateUrl: "./superuser.component.html",
	styleUrls: ["./superuser.component.scss"]
})
export class SuperuserComponent implements OnInit {
	isSuperuserAuthenticated = false;
	private superuserAuthSub: Subscription;

	constructor(private superuserAuthService: SuperuserAuthService) {}

	ngOnInit() {
		this.isSuperuserAuthenticated = this.superuserAuthService.isSuperuserAuthenticated;
		this.superuserAuthSub = this.superuserAuthService.superuserAuthStatusListener.subscribe(
			isSuperuserAuthenticated => {
				this.isSuperuserAuthenticated = isSuperuserAuthenticated;
			}
		);
	}

	onLogout(): void {
		this.superuserAuthService.superuserLogout();
	}
}
