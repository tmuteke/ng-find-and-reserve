import {Amenity} from './amenity.model';
import {Space} from '../enlist-spaces/space.model';
import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AmenitiesService {
	private _amenities: Amenity[] = [
		new Amenity('WiFi', 'general', 'amenity_wifi'),
		new Amenity('TV', 'general', 'amenity_tv'),
		new Amenity('Heat', 'general', 'amenity_heat'),
		new Amenity('Air conditioning', 'general', 'amenity_air_conditioning'),
		new Amenity('Desk/studyspace', 'general', 'amenity_desk_studyspace'),
		new Amenity('Toiletries', 'general', 'amenity_toiletries'),
		new Amenity('Closet/drawers', 'general', 'amenity_closet_drawers'),
		new Amenity('Iron', 'general', 'amenity_iron'),
		new Amenity('Private entrance', 'general', 'amenity_private_entrance'),
		new Amenity('Smoke detector', 'safety', 'amenity_smoke_detector'),
		new Amenity('First aid kit', 'safety', 'amenity_first_aid_kit'),
		new Amenity('Fire extinguisher', 'safety', 'amenity_fire_extinguisher'),
		new Amenity('Room lock', 'safety', 'amenity_room_lock'),
		new Amenity('Gate lock', 'safety', 'amenity_gate_lock'),
		new Amenity('Security fence', 'safety', 'amenity_security_fence'),
		new Amenity('Guard & watch dogs', 'safety', 'amenity_guard_dogs')
	];

	private _spaces: Space[] = [
		new Space('Pool', 'space_pool'),
		new Space('Common room', 'space_common_room'),
		new Space('Kitchen', 'space_kitchen'),
		new Space('Laundry - washing', 'space_laundry_washer'),
		new Space('Laundry - line', 'space_line'),
		new Space('Laundry - ironing', 'space_laundry_ironing'),
		new Space('Parking', 'space_parking'),
		new Space('Gym', 'space_gym')
	];

	get amenities(): Amenity[] {
		return this._amenities.slice();
	}

	get spaces(): Space[] {
		return this._spaces.slice();
	}

	public generalAmenities(): Amenity[] {
		const generals: Amenity[] = [];
		for (const amenity of this._amenities.slice()) {
			if (amenity.key === 'general') {
				generals.push(amenity);
			}
		}
		return generals;
	}

	public safetyAmenities(): Amenity[] {
		const safeties: Amenity[] = [];
		for (const amenity of this.amenities) {
			if (amenity.key === 'safety') {
				safeties.push(amenity);
			}
		}
		return safeties;
	}
}
