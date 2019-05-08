import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { PropertyDetailsComponent } from "./property/property-item/property-details/property-details.component";
import { FooterComponent } from "./footer/footer.component";
import { AbrilDirective } from "./shared/directives/abril.directive";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./auth/login/login.component";
import { LikeDirective } from "./shared/directives/like.directive";
import { EntryComponent } from "./entry/entry.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { EnlistComponent } from "./enlist/enlist.component";
import { EnlistStartComponent } from "./enlist/enlist-start/enlist-start.component";
import { RatingDirective } from "./shared/directives/rating.directive";
import { EnlistFinishComponent } from "./enlist/enlist-finish/enlist-finish.component";
import { StaffComponent } from "./staff/staff.component";
import { StaffLoginComponent } from "./staff/auth/staff-login/staff-login.component";
import { StaffRoomsComponent } from "./staff/staff-rooms/staff-rooms.component";
import { StaffEnlistRoomComponent } from "./staff/staff-enlist-room/staff-enlist-room.component";
import { RoomItemComponent } from "./room/room-item/room-item.component";
import { RoomListComponent } from "./room/room-list/room-list.component";
import { PropertyItemComponent } from "./property/property-item/property-item.component";
import { PropertyListComponent } from "./property/property-list/property-list.component";
import { PropertyReservationComponent } from "./reservation/property-reservation/property-reservation.component";
import { RoomReservationComponent } from "./reservation/room-reservation/room-reservation.component";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { AuthService } from "./auth/auth.service";
import { StaffRoomEditComponent } from "./staff/staff-room-edit/staff-room-edit.component";
import { StaffStudentsComponent } from "./staff/staff-students/staff-students.component";
import { ProfileComponent } from "./profile/profile.component";
import { PropertyReportComponent } from "./property/property-item/property-details/property-report/property-report.component";
import { SuperuserComponent } from "./superuser/superuser.component";
import { SuperuserUsersComponent } from "./superuser/superuser-users/superuser-users.component";
import { SuperuserRoomsComponent } from "./superuser/superuser-rooms/superuser-rooms.component";
import { SuperuserPropertiesComponent } from "./superuser/superuser-properties/superuser-properties.component";
import { SuperuserStaffComponent } from "./superuser/superuser-staff/superuser-staff.component";
import { SuperuserReservationsComponent } from "./superuser/superuser-reservations/superuser-reservations.component";
import { SuperuserLoginComponent } from "./superuser/superuser-auth/superuser-login/superuser-login.component";

@NgModule({
	declarations: [
		AppComponent,
		AbrilDirective,
		HeaderComponent,
		PropertyDetailsComponent,
		FooterComponent,
		LoginComponent,
		LikeDirective,
		EntryComponent,
		SignupComponent,
		NotFoundComponent,
		EnlistComponent,
		EnlistStartComponent,
		RatingDirective,
		EnlistFinishComponent,
		StaffComponent,
		StaffLoginComponent,
		StaffRoomsComponent,
		StaffEnlistRoomComponent,
		RoomItemComponent,
		RoomListComponent,
		PropertyItemComponent,
		PropertyListComponent,
		PropertyReservationComponent,
		RoomReservationComponent,
		StaffRoomEditComponent,
		StaffStudentsComponent,
		ProfileComponent,
		PropertyReportComponent,
		SuperuserComponent,
		SuperuserUsersComponent,
		SuperuserRoomsComponent,
		SuperuserPropertiesComponent,
		SuperuserStaffComponent,
		SuperuserReservationsComponent,
		SuperuserLoginComponent
	],
	imports: [
		BrowserModule,
		AngularFontAwesomeModule,
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot(),
		MatProgressSpinnerModule
	],
	providers: [
		AuthService,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
