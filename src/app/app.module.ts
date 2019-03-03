import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {PropertyItemComponent} from './property/property-item/property-item.component';
import {PropertyDetailsComponent} from './property/property-item/property-details/property-details.component';
import {PropertyListComponent} from './property/property-list/property-list.component';
import {FooterComponent} from './footer/footer.component';
import {AbrilDirective} from './shared/directives/abril.directive';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {AppRoutingModule} from './app-routing.module';
import {StudentHeaderComponent} from './header/student-header/student-header.component';
import {LandlordHeaderComponent} from './header/landlord-header/landlord-header.component';
import {LoginComponent} from './header/login/login.component';
import {LikeDirective} from './shared/directives/like.directive';
import {EntryComponent} from './entry/entry.component';
import {LoginHeaderComponent} from './header/login/login-header/login-header.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { SignUpComponent } from './header/sign-up/sign-up.component';
import { SignUpHeaderComponent } from './header/sign-up/sign-up-header/sign-up-header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {EnlistComponent} from './enlist/enlist.component';
import { EnlistStartComponent } from './enlist/enlist-start/enlist-start.component';
import { EnlistRoomComponent } from './enlist/enlist-step-1/enlist-room/enlist-room.component';
import { EnlistStudentsComponent } from './enlist/enlist-step-1/enlist-students/enlist-students.component';
import { EnlistBathroomsComponent } from './enlist/enlist-step-1/enlist-bathrooms/enlist-bathrooms.component';
import { EnlistLocationComponent } from './enlist/enlist-step-1/enlist-location/enlist-location.component';
import { EnlistAmenitiesComponent } from './enlist/enlist-step-1/enlist-amenities/enlist-amenities.component';
import { EnlistSpacesComponent } from './enlist/enlist-step-1/enlist-spaces/enlist-spaces.component';
import { HttpClientModule } from '@angular/common/http';
import { RatingDirective } from './shared/directives/rating.directive';
import { PropertyListAllComponent } from './property/property-list/property-list-all/property-list-all.component';
import { EnlistPicturesComponent } from './enlist/enlist-step-2/enlist-pictures/enlist-pictures.component';
import { EnlistDescriptionComponent } from './enlist/enlist-step-2/enlist-description/enlist-description.component';
import { EnlistPhoneComponent } from './enlist/enlist-step-2/enlist-phone/enlist-phone.component';
import { EnlistPoliciesComponent } from './enlist/enlist-step-2/enlist-policies/enlist-policies.component';
import { EnlistFinishComponent } from './enlist/enlist-step-2/enlist-finish/enlist-finish.component';

@NgModule({
  declarations: [
  	  AppComponent,
	  AbrilDirective,
	  HeaderComponent,
	  PropertyItemComponent,
	  PropertyDetailsComponent,
	  PropertyListComponent,
	  FooterComponent,
	  StudentHeaderComponent,
	  LandlordHeaderComponent,
	  LoginComponent,
	  LikeDirective,
	  EntryComponent,
	  LoginHeaderComponent,
	  SignUpComponent,
	  SignUpHeaderComponent,
	  NotFoundComponent,
	  EnlistComponent,
	  EnlistStartComponent,
	  EnlistRoomComponent,
	  EnlistStudentsComponent,
	  EnlistBathroomsComponent,
	  EnlistLocationComponent,
	  EnlistAmenitiesComponent,
	  EnlistSpacesComponent,
	  RatingDirective,
	  PropertyListAllComponent,
	  EnlistPicturesComponent,
	  EnlistDescriptionComponent,
	  EnlistPhoneComponent,
	  EnlistPoliciesComponent,
	  EnlistFinishComponent
  ],
  imports: [
  	  BrowserModule,
	  AngularFontAwesomeModule,
	  AppRoutingModule,
	  ReactiveFormsModule,
	  FormsModule,
	  HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
