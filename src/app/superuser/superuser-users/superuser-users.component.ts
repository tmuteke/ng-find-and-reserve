import { Component, OnDestroy, OnInit } from "@angular/core";
import { User } from "../../auth/user.model";
import { AuthService } from "../../auth/auth.service";
import { Subscription } from "rxjs";
import { Room } from "../../room/room.model";

@Component({
	selector: "app-superuser-users",
	templateUrl: "./superuser-users.component.html",
	styleUrls: ["./superuser-users.component.scss"]
})
export class SuperuserUsersComponent implements OnInit, OnDestroy {
	users: User[] = [];
	private authSub: Subscription;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.authService.getUsers();
		this.authSub = this.authService
			.getUsersUpdateListener()
			.subscribe(users => {
				this.users = users;
			});
	}

	onDelete(id: string): void {
		this.authService.deleteUser(id);
		this.authService.getUsers();
		this.authSub = this.authService
			.getUsersUpdateListener()
			.subscribe(users => {
				this.users = users;
			});
	}

	ngOnDestroy(): void {
		this.authSub.unsubscribe();
	}
}
