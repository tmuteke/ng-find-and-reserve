import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import { ToastrService } from "ngx-toastr";
import {Router} from '@angular/router';

@Component({
	templateUrl: "./signup.component.html",
	styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
	public signUpForm: FormGroup;
	private email: string;
	private firstName: string;
	private lastName: string;
	private password: string;

	constructor(
		public authService: AuthService,
		private toastr: ToastrService,
		private router: Router
	) {}

	public ngOnInit(): void {
		this.signUpForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			firstName: new FormControl(null, [
				Validators.required,
				Validators.maxLength(20)
			]),
			lastName: new FormControl(null, [
				Validators.required,
				Validators.maxLength(20)
			]),
			password: new FormControl(null, [
				Validators.required,
				Validators.minLength(6)
			])
		});
		this.toastr.toastrConfig.positionClass = "toast-top-center";
	}

	onSignUp(): void {
		this.populateFields();
		if (this.signUpForm.valid) {
			const user = new User();
			user.email = this.email;
			user.name = {
				first: this.firstName,
				last: this.lastName
			};
			user.password = this.password;

			this.authService.createUser(user);
			this.toastr.success("You've been signed up successfully", "Success!");
			this.router.navigate(['/login']);
		} else {
			this.toastr.error("Provide valid data", "Error!");
		}
	}

	public populateFields(): void {
		this.email = this.signUpForm.get("email").value;
		this.firstName = this.signUpForm.get("firstName").value;
		this.lastName = this.signUpForm.get("lastName").value;
		this.password = this.signUpForm.get("password").value;
	}
}
