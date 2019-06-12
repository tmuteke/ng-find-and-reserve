import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SuperuserAuthService } from "./superuser-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private superuserAuthService: SuperuserAuthService) {}

	public intercept(req: HttpRequest<any>, next: HttpHandler) {
		const authToken = this.superuserAuthService.superuserToken;
		const authRequest = req.clone({
			headers: req.headers.set("Authorization", "Bearer " + authToken)
		});
		return next.handle(authRequest);
	}
}
