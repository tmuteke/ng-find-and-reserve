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
import { AuthGuard } from "./auth/auth.guard";
import { StaffStudentsComponent } from "./staff/staff-students/staff-students.component";
import { ProfileComponent } from "./profile/profile.component";
import { PropertyReportComponent } from "./property/property-item/property-details/property-report/property-report.component";
import { SuperuserComponent } from "./superuser/superuser.component";
import { SuperuserUsersComponent } from "./superuser/superuser-users/superuser-users.component";
import { SuperuserRoomsComponent } from "./superuser/superuser-rooms/superuser-rooms.component";
import { SuperuserStaffComponent } from "./superuser/superuser-staff/superuser-staff.component";
import { SuperuserPropertiesComponent } from "./superuser/superuser-properties/superuser-properties.component";
import { SuperuserReservationsComponent } from "./superuser/superuser-reservations/superuser-reservations.component";
import { SuperuserAuthGuard } from "./superuser/superuser-auth/superuser-auth.guard";
import {SuperuserLoginComponent} from './superuser/superuser-auth/superuser-login/superuser-login.component';

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
		path: "property/:id/report-property",
		component: PropertyReportComponent,
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
			},
			{
				path: "students",
				component: StaffStudentsComponent
			}
		],
		canActivate: [SuperuserAuthGuard]
	},
	{
		path: "superuser/login",
		component: SuperuserLoginComponent
	},
	{
		path: "superuser/dashboard",
		component: SuperuserComponent,
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "users"
			},
			{
				path: "users",
				component: SuperuserUsersComponent
			},
			{
				path: "rooms",
				component: SuperuserRoomsComponent
			},
			{
				path: "properties",
				component: SuperuserPropertiesComponent
			},
			{
				path: "staff",
				component: SuperuserStaffComponent
			},
			{
				path: "reservations",
				component: SuperuserReservationsComponent
			}
		],
		canActivate: [SuperuserAuthGuard]
	},
	{
		path: "user/:id/profile",
		component: ProfileComponent
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
	imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
	exports: [RouterModule],
	providers: [AuthGuard, SuperuserAuthGuard]
})
export class AppRoutingModule {}
