import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { Router, NavigationEnd } from "@angular/router";
import {SuperuserAuthService} from './superuser/superuser-auth/superuser-auth.service';

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	title = "findandreserve";

	constructor(private authService: AuthService, private router: Router, private superuserAuthService: SuperuserAuthService) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				window.scrollTo(0, 0);
			}
		});
	}

	ngOnInit(): void {
		this.authService.autoAuthUser();
		this.superuserAuthService.autoAuthSuperuser();
	}
}
