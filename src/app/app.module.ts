import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { MatProgressSpinnerModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { PropertyDetailsComponent } from "./property/property-details/property-details.component";
import { FooterComponent } from "./footer/footer.component";
import { AbrilDirective } from "./shared/directives/abril.directive";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { AppRoutingModule } from "./app-routing.module";
import { StudentHeaderComponent } from "./header/student-header/student-header.component";
import { LandlordHeaderComponent } from "./header/landlord-header/landlord-header.component";
import { LoginComponent } from "./auth/login/login.component";
import { LikeDirective } from "./shared/directives/like.directive";
import { EntryComponent } from "./entry/entry.component";
import { LoginHeaderComponent } from "./auth/login/login-header/login-header.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SignupComponent } from "./auth/signup/signup.component";
import { SignUpHeaderComponent } from "./auth/signup/sign-up-header/sign-up-header.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { EnlistComponent } from "./enlist/enlist.component";
import { EnlistStartComponent } from "./enlist/enlist-start/enlist-start.component";
import { RatingDirective } from "./shared/directives/rating.directive";
import { ReservationComponent } from "./reservation/reservation.component";
import { ReservationDetailsComponent } from "./reservation/reservation-details/reservation-details.component";
import { ReservationPoliciesComponent } from "./reservation/reservation-policies/reservation-policies.component";
import { ReservationPaymentComponent } from "./reservation/reservation-payment/reservation-payment.component";
import { PropertyService } from "./property/property.service";
import { EnlistFinishComponent } from "./enlist/enlist-finish/enlist-finish.component";
import { StaffComponent } from "./staff/staff.component";
import { StaffLoginComponent } from "./staff/auth/staff-login/staff-login.component";
import { StaffRoomsComponent } from "./staff/staff-rooms/staff-rooms.component";
import { StaffEnlistRoomComponent } from "./staff/staff-enlist-room/staff-enlist-room.component";
import { RoomItemComponent } from "./room/room-item/room-item.component";
import { RoomListComponent } from "./room/room-list/room-list.component";
import { PropertyItemComponent } from "./property/property-item/property-item.component";
import { PropertyListComponent } from './property/property-list/property-list.component';

@NgModule({
	declarations: [
		AppComponent,
		AbrilDirective,
		HeaderComponent,
		PropertyDetailsComponent,
		FooterComponent,
		StudentHeaderComponent,
		LandlordHeaderComponent,
		LoginComponent,
		LikeDirective,
		EntryComponent,
		LoginHeaderComponent,
		SignupComponent,
		SignUpHeaderComponent,
		NotFoundComponent,
		EnlistComponent,
		EnlistStartComponent,
		RatingDirective,
		EnlistFinishComponent,
		ReservationComponent,
		ReservationDetailsComponent,
		ReservationPoliciesComponent,
		ReservationPaymentComponent,
		StaffComponent,
		StaffLoginComponent,
		StaffRoomsComponent,
		StaffEnlistRoomComponent,
		RoomItemComponent,
		RoomListComponent,
		PropertyItemComponent,
		PropertyListComponent
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
	providers: [PropertyService],
	bootstrap: [AppComponent]
})
export class AppModule {}
