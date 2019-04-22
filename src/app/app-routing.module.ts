import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PropertyDetailsComponent } from "./property/property-item/property-details/property-details.component";
import { LoginComponent } from "./auth/login/login.component";
import { EntryComponent } from "./entry/entry.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { EnlistStartComponent } from "./enlist/enlist-start/enlist-start.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { EnlistComponent } from "./enlist/enlist.component";
import { EnlistFinishComponent } from "./enlist/enlist-finish/enlist-finish.component";
import { StaffLoginComponent } from "./staff/auth/staff-login/staff-login.component";
import { StaffRoomsComponent } from "./staff/staff-rooms/staff-rooms.component";
import { StaffComponent } from "./staff/staff.component";
import { StaffEnlistRoomComponent } from "./staff/staff-enlist-room/staff-enlist-room.component";
import { PropertyReservationComponent } from "./reservation/property-reservation/property-reservation.component";
import { RoomReservationComponent } from "./reservation/room-reservation/room-reservation.component";
import { StaffRoomEditComponent } from "./staff/staff-room-edit/staff-room-edit.component";
import {AuthGuard} from './auth/auth.guard';

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
		component: PropertyReservationComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "room/:id/reservation",
		component: RoomReservationComponent,
		canActivate: [AuthGuard]
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
		component: EnlistStartComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "enlist-new",
		component: EnlistComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "enlist-new/finish",
		component: EnlistFinishComponent,
		canActivate: [AuthGuard]
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
				path: "rooms/:id/edit",
				component: StaffRoomEditComponent
			},
			{
				path: "enlist-room",
				component: StaffEnlistRoomComponent
			}
		],
		canActivate: [AuthGuard]
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
	exports: [RouterModule],
	providers: [AuthGuard]
})
export class AppRoutingModule {}
