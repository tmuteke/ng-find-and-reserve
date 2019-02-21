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
		component: EnlistStartComponent
	},
	{
		path: 'enlist/089083/room',
		component: EnlistRoomComponent
	},
	{
		path: 'enlist/089083/students',
		component: EnlistStudentsComponent
	},
	{
		path: 'enlist/089083/bathrooms',
		component: EnlistBathroomsComponent
	},
	{
		path: 'enlist/089083/location',
		component: EnlistLocationComponent
	},
	{
		path: 'enlist/089083/amenities',
		component: EnlistAmenitiesComponent
	},
	{
		path: 'enlist/089083/spaces',
		component: EnlistSpacesComponent
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
