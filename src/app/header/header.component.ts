import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
	isAuthenticated = false;
	private authSubscription: Subscription;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authSubscription = this.authService.isAuthenticated.subscribe(
			isAuthenticated => {
				this.isAuthenticated = isAuthenticated;
			}
		);
	}

	ngOnDestroy(): void {
		this.authSubscription.unsubscribe();
	}
}
