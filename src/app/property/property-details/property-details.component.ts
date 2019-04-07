import { Component, OnInit } from "@angular/core";

import { Property } from "../property.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PropertyService } from "../property.service";

@Component({
	selector: "app-property-details",
	templateUrl: "./property-details.component.html",
	styleUrls: ["./property-details.component.scss"]
})
export class PropertyDetailsComponent implements OnInit {
	public property: Property;
	public reviews: {}[];
	public id: string;

	constructor(
		private route: ActivatedRoute,
		private propService: PropertyService
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((pm: ParamMap) => {
			if (pm.has("id")) {
				this.id = pm.get("id");
				this.propService.getProperty(this.id).subscribe(p => {
					this.property = {
						id: p._id,
						landlord: p.landlord,
						address: p.address,
						apartmentType: p.apartmentType,
						roomType: p.roomType,
						isDedicatedSetup: p.isDedicatedSetup,
						genderAccommodated: p.genderAccommodated,
						numberOfStudents: p.numberOfStudents,
						numberOfRooms: p.numberOfRooms,
						numberOfBathrooms: p.numberOfBathrooms,
						amenities: p.amenities,
						spaces: p.spaces,
						policies: p.policies,
						description: p.description,
						rent: p.rent,
						rating: p.rating,
						reviews: p.reviews
					};
				});
			}
		});
	}
}
