import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../../auth/login/login.service";

@Component({
	selector: "app-student-header",
	templateUrl: "./student-header.component.html",
	styleUrls: ["./student-header.component.scss"]
})
export class StudentHeaderComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private loginService: LoginService,
		private router: Router
	) {}

	ngOnInit(): void {}

	public onLogout(): void {
		this.loginService.logout();
		console.log(this.loginService.isLoggedIn);
	}
}
