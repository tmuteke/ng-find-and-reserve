import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { User } from "../auth/user.model";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
	isAuthenticated = false;
	userId: string;
	user: User;
	private authSubscription: Subscription;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.isAuthenticated = this.authService.isAuthenticated;
		this.authSubscription = this.authService.authStatusListener.subscribe(
			isAuthenticated => {
				this.isAuthenticated = isAuthenticated;
			}
		);
		this.userId = this.authService.userId;
	}

	onLogout(): void {
		this.authService.logout();
	}

	ngOnDestroy(): void {
		this.authSubscription.unsubscribe();
	}
}
