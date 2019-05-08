import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { SuperuserAuthService } from "./superuser-auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class SuperuserAuthGuard implements CanActivate {
	constructor(
		private superuserAuthService: SuperuserAuthService,
		private router: Router,
		private toastr: ToastrService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const authStatus = this.superuserAuthService.isSuperuserAuthenticated;
		if (!authStatus) {
			this.toastr.toastrConfig.positionClass = "toast-top-center";
			this.toastr.error(
				"You need Superuser access to do that.",
				"Superuser Login Required!"
			);
			this.router.navigate(["/superuser/login"]);
		}
		return authStatus;
	}
}
