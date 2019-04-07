import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import { ToastrService } from "ngx-toastr";

@Component({
	templateUrl: "./signup.component.html",
	styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
	public signupForm: FormGroup;
	private email: string;
	private firstname: string;
	private lastname: string;
	private password: string;

	constructor(
		public authService: AuthService,
		private toastr: ToastrService
	) {}

	public ngOnInit(): void {
		this.signupForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			firstname: new FormControl(null, [
				Validators.required,
				Validators.maxLength(20)
			]),
			lastname: new FormControl(null, [
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
		if (this.signupForm.valid) {
			const user = new User();
			user.email = this.email;
			user.name = {
				first: this.firstname,
				last: this.lastname
			};
			user.password = this.password;

			this.toastr.success("You've been signed up successfully", "Success!");
			this.authService.createUser(user);
		} else {
			console.log("enter valid data you bitch!");
		}
	}

	public populateFields(): void {
		this.email = this.signupForm.get("email").value;
		this.firstname = this.signupForm.get("firstname").value;
		this.lastname = this.signupForm.get("lastname").value;
		this.password = this.signupForm.get("password").value;
	}
}
