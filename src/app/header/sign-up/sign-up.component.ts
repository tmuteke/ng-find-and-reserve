import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
	private _signupForm: FormGroup;
	private _emailFormControl: FormControl;
	private _firstnameFormControl: FormControl;
	private _lastnameFormControl: FormControl;
	private _passwordFormControl: FormControl;

	constructor(private _authService: AuthService) { }

	ngOnInit() {
		this._signupForm = new FormGroup({
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'firstname': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
			'lastname': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
			'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
		});
		// @ts-ignore
		this._emailFormControl = this._signupForm.get('email');
		// @ts-ignore
		this._firstnameFormControl = this._signupForm.get('firstname');
		// @ts-ignore
		this._lastnameFormControl = this._signupForm.get('lastname');
		// @ts-ignore
		this._passwordFormControl = this._signupForm.get('password');
	}

	get signupForm(): FormGroup {
		return this._signupForm;
	}

	onSignUp(): void {
		if (this._signupForm.valid) {
			console.log(this._signupForm);
			const firstName = this._firstnameFormControl.value;
			const lastName = this._lastnameFormControl.value;
			const email = this._emailFormControl.value;
			const password = this._passwordFormControl.value;
			this._authService.signUpUser(firstName, lastName, email, password)
		} else {
			console.log('enter valid data you bitch!');
		}
	}

}
