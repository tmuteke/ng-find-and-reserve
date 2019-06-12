import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-staff-login",
	templateUrl: "./staff-login.component.html",
	styleUrls: ["./staff-login.component.scss"]
})
export class StaffLoginComponent implements OnInit {
	public loginForm: FormGroup;

	constructor(private router: Router) {}

	ngOnInit() {
		this.loginForm = new FormGroup({
			username: new FormControl(null),
			password: new FormControl(null)
		});
	}

	public onLogin(): void {
		this.router.navigate(["staff", "dashboard"]);
	}
}
