import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";
import { User } from "../user.model";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	private email: string;
	private password: string;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl(null),
			password: new FormControl(null)
		});
	}

	onSubmitLogin(): void {
		this.populateFields();
		if (this.loginForm.valid) {
			const user: User = new User();
			user.email = this.email;
			user.password = this.password;
			this.authService.login(user);
		}
	}

	private populateFields(): void {
		this.email = this.loginForm.get("email").value;
		this.password = this.loginForm.get("password").value;
	}
}
