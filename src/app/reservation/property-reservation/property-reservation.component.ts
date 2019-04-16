import { Component, OnInit } from "@angular/core";
import { Property } from "src/app/property/property.model";
import { PropertyService } from "src/app/property/property.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
	selector: "app-property-reservation",
	templateUrl: "./property-reservation.component.html",
	styleUrls: ["./property-reservation.component.scss"]
})
export class PropertyReservationComponent implements OnInit {
	public property: Property;
	private id: string;
	public propertyReservationForm: FormGroup;

	constructor(
		private propertyService: PropertyService,
		private route: ActivatedRoute
	) {}

	public ngOnInit(): void {
		this.route.paramMap.subscribe((pm: ParamMap) => {
			if (pm.has("id")) {
				this.id = pm.get("id");
				this.propertyService.getProperty(this.id).subscribe(property => {
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
		console.log(this.id);
		console.log(this.property);
		this.propertyReservationForm = new FormGroup({
			regNumber: new FormControl(null),
			name: new FormControl(null),
			academicYear: new FormControl("Part 1"),
			gender: new FormControl("Female")
		});
	}

	public onReserve(): void {
		console.log("Hello World!");
	}
}
