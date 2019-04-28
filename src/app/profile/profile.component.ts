import { Component, OnInit } from "@angular/core";
import { User } from "../auth/user.model";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
	user: User;
	private userSub: Subscription;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.userSub = this.authService
			.getUser(this.authService.userId)
			.subscribe(user => {
				this.user = {
					id: user._id,
					email: user.email,
					name: {
						first: user.name.first,
						last: user.name.last
					},
					password: user.password
				};
			});
	}
}
