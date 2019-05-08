import { Component, HostListener, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SuperuserAuthService } from "../superuser-auth.service";
import { Superuser } from "../superuser.model";
import { User } from "../../../auth/user.model";
import {ToastrService} from 'ngx-toastr';

@Component({
	selector: "app-superuser-login",
	templateUrl: "./superuser-login.component.html",
	styleUrls: ["./superuser-login.component.scss"]
})
export class SuperuserLoginComponent implements OnInit {
	loginForm: FormGroup;
	private username: string;
	private password: string;

	constructor(private superuserAuthService: SuperuserAuthService, private toastr: ToastrService) {}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			username: new FormControl(null, Validators.required),
			password: new FormControl(null, Validators.required)
		});
	}

	@HostListener("window:enter", ["$event"])
	keyEvent(event: KeyboardEvent) {}

	onSignUp(): void {
		this.populateFields();
		if (this.loginForm.valid) {
			const superuser = new Superuser();
			superuser.username = this.username;
			superuser.password = this.password;

			this.superuserAuthService.createSuperuser(superuser);
			this.toastr.success("Success");

		} else {
			this.toastr.error(
				"Provide valid data. Names should start with capitals.",
				"Error!"
			);
		}
	}

	onSubmitLogin(): void {
		this.populateFields();
		if (this.loginForm.valid) {
			const superuser: Superuser = new Superuser();
			superuser.username = this.username;
			superuser.password = this.password;
			this.superuserAuthService.superuserLogin(superuser);
		}
	}

	private populateFields(): void {
		this.username = this.loginForm.get("username").value;
		this.password = this.loginForm.get("password").value;
	}
}
