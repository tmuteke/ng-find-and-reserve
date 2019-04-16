import { Component, OnInit } from "@angular/core";

import { Property } from "../../property.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PropertyService } from "../../property.service";

@Component({
	selector: "app-property-details",
	templateUrl: "./property-details.component.html",
	styleUrls: ["./property-details.component.scss"]
})
export class PropertyDetailsComponent implements OnInit {
	property: Property;
	reviews: {}[];
	private id: string;

	constructor(
		private route: ActivatedRoute,
		private propService: PropertyService
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((pm: ParamMap) => {
			if (pm.has("id")) {
				this.id = pm.get("id");
				this.propService.getProperty(this.id).subscribe(property => {
					this.property = {
						id: property._id,
						landlord: property.landlord,
						address: property.address,
						apartmentType: property.apartmentType,
						roomType: property.roomType,
						isDedicatedSetup: property.isDedicatedSetup,
						genderAccommodated: property.genderAccommodated,
						numberOfStudents: property.numberOfStudents,
						numberOfRooms: property.numberOfRooms,
						numberOfBathrooms: property.numberOfBathrooms,
						amenities: property.amenities,
						spaces: property.spaces,
						policies: property.policies,
						description: property.description,
						rent: property.rent,
						rating: property.rating,
						reviews: property.reviews
					};
				});
			}
		});
	}
}
