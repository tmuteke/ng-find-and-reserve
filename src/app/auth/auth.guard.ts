import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const authStatus = this.authService.isAuthenticated;
		if (!authStatus) {
			this.toastr.toastrConfig.positionClass = "toast-top-center";
			this.toastr.warning("You need to login to do that.", "Login Required!");
			this.router.navigate(["/login"]);
		}
		return authStatus;
	}
}
