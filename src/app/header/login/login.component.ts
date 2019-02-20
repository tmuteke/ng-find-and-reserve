import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	private _emailFormControl: FormControl;
	private _passwordFormControl: FormControl;
	private _loginForm: FormGroup;

	constructor(private loginService: LoginService, private router: Router) {}

	ngOnInit(): void {
		this._loginForm = new FormGroup({
			'email': new FormControl(null),
			'password': new FormControl(null)
		});
	}

	get loginForm(): FormGroup {
		return this._loginForm;
	}

	onSubmitLogin(): void {
		if (this._loginForm.valid) {
			this.loginService.login();
			this.router.navigate(['/']);
		}
	}
}
