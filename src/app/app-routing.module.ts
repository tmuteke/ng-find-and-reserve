import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PropertyDetailsComponent } from "./property/property-details/property-details.component";
import { LoginComponent } from "./auth/login/login.component";
import { EntryComponent } from "./entry/entry.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { EnlistStartComponent } from "./enlist/enlist-start/enlist-start.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { EnlistComponent } from "./enlist/enlist.component";
import { EnlistFinishComponent } from "./enlist/enlist-finish/enlist-finish.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { ReservationDetailsComponent } from "./reservation/reservation-details/reservation-details.component";
import { ReservationPoliciesComponent } from "./reservation/reservation-policies/reservation-policies.component";
import { ReservationPaymentComponent } from "./reservation/reservation-payment/reservation-payment.component";
import { StaffLoginComponent } from "./staff/auth/staff-login/staff-login.component";
import { StaffRoomsComponent } from "./staff/staff-rooms/staff-rooms.component";
import { StaffComponent } from "./staff/staff.component";
import { StaffEnlistRoomComponent } from "./staff/staff-enlist-room/staff-enlist-room.component";

const routes: Routes = [
	{
		path: "",
		component: EntryComponent,
		pathMatch: "full"
	},
	{
		path: "property/:id/details",
		component: PropertyDetailsComponent
	},
	{
		path: "property/:id/reservation",
		component: ReservationComponent,
		children: [
			{
				path: "details",
				component: ReservationDetailsComponent
			},
			{
				path: "policies",
				component: ReservationPoliciesComponent
			},
			{
				path: "payment",
				component: ReservationPaymentComponent
			},
			{
				path: "",
				redirectTo: "details",
				pathMatch: "full"
			}
		]
	},
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "signup",
		component: SignupComponent
	},
	{
		path: "select-enlisting",
		component: EnlistStartComponent
	},
	{
		path: "enlist-new",
		component: EnlistComponent
	},
	{
		path: "enlist-new/finish",
		component: EnlistFinishComponent
	},
	{
		path: "staff/login",
		component: StaffLoginComponent
	},
	{
		path: "staff/dashboard",
		component: StaffComponent,
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "rooms"
			},
			{
				path: "rooms",
				component: StaffRoomsComponent
			},
			{
				path: "enlist-room",
				component: StaffEnlistRoomComponent
			}
		]
	},
	{
		path: "page-not-found",
		component: NotFoundComponent
	},
	{
		path: "**",
		redirectTo: "page-not-found"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
