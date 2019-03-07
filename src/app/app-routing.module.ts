import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PropertyDetailsComponent} from './property/property-item/property-details/property-details.component';
import {LoginComponent} from './header/login/login.component';
import {EntryComponent} from './entry/entry.component';
import {SignUpComponent} from './header/sign-up/sign-up.component';
import {EnlistStartComponent} from './enlist/enlist-start/enlist-start.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {EnlistRoomComponent} from './enlist/enlist-step-1/enlist-room/enlist-room.component';
import {EnlistStudentsComponent} from './enlist/enlist-step-1/enlist-students/enlist-students.component';
import {EnlistBathroomsComponent} from './enlist/enlist-step-1/enlist-bathrooms/enlist-bathrooms.component';
import {EnlistLocationComponent} from './enlist/enlist-step-1/enlist-location/enlist-location.component';
import {EnlistAmenitiesComponent} from './enlist/enlist-step-1/enlist-amenities/enlist-amenities.component';
import {EnlistSpacesComponent} from './enlist/enlist-step-1/enlist-spaces/enlist-spaces.component';
import {EnlistComponent} from './enlist/enlist.component';
import { PropertyListAllComponent } from './property/property-list/property-list-all/property-list-all.component';
import { EnlistPicturesComponent } from './enlist/enlist-step-2/enlist-pictures/enlist-pictures.component';
import { EnlistDescriptionComponent } from './enlist/enlist-step-2/enlist-description/enlist-description.component';
import { EnlistPhoneComponent } from './enlist/enlist-step-2/enlist-phone/enlist-phone.component';
import { EnlistPoliciesComponent } from './enlist/enlist-step-2/enlist-policies/enlist-policies.component';
import { EnlistFinishComponent } from './enlist/enlist-step-2/enlist-finish/enlist-finish.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationDetailsComponent } from './reservation/reservation-details/reservation-details.component';
import { ReservationPoliciesComponent } from './reservation/reservation-policies/reservation-policies.component';
import { ReservationPaymentComponent } from './reservation/reservation-payment/reservation-payment.component';

const routes: Routes = [
	{
		path: '',
		component: EntryComponent,
		pathMatch: 'full'
	},
	{
		path: 'property/:id/details',
		component: PropertyDetailsComponent
	},
	{
		path: 'property/:id/reservation',
		component: ReservationComponent,
		children: [
			{
				path: 'details',
				component: ReservationDetailsComponent
			},
			{
				path: 'policies',
				component: ReservationPoliciesComponent
			},
			{
				path: 'payment',
				component: ReservationPaymentComponent
			},
			{
				path: '',
				redirectTo: 'details',
				pathMatch: 'full'
			}
		]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'signup',
		component: SignUpComponent
	},
	{
		path: 'enlist',
		component: EnlistComponent,
	},
	{
		path: 'enlist/089083',
		component: EnlistStartComponent,
		children: [
			{
				path: 'room',
				component: EnlistRoomComponent
			},
			{
				path: 'students',
				component: EnlistStudentsComponent
			},
			{
				path: 'bathrooms',
				component: EnlistBathroomsComponent
			},
			{
				path: 'location',
				component: EnlistLocationComponent
			},
			{
				path: 'amenities',
				component: EnlistAmenitiesComponent
			},
			{
				path: 'spaces',
				component: EnlistSpacesComponent
			},
			{
				path: 'pictures',
				component: EnlistPicturesComponent
			},
			{
				path: 'description',
				component: EnlistDescriptionComponent
			},
			{
				path: 'phone',
				component: EnlistPhoneComponent
			},
			{
				path: 'policies',
				component: EnlistPoliciesComponent
			}

		]
	},
	{
		path: 'enlist/089083/finish',
		component: EnlistFinishComponent
	},
	{
		path: 'houses',
		component: PropertyListAllComponent
	},
	{
		path: 'page-not-found',
		component: NotFoundComponent
	},
	{
		path: '**',
		redirectTo: 'page-not-found'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
