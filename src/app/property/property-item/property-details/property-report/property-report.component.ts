import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../../../../auth/auth.service";
import { User } from "../../../../auth/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { PropertyService } from "../../../property.service";
import { Property } from "../../../property.model";

@Component({
	selector: "app-property-report",
	templateUrl: "./property-report.component.html",
	styleUrls: ["./property-report.component.scss"]
})
export class PropertyReportComponent implements OnInit, OnDestroy {
	user: User;
	id: string;
	reportForm: FormGroup;
	private authSub: Subscription;
	private property: Property;

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router,
		private propertyService: PropertyService
	) {}

	ngOnInit() {
		this.reportForm = new FormGroup({
			complaint: new FormControl("It's inaccurate and incorrect"),
			description: new FormControl(null)
		});

		this.authSub = this.authService
			.getUser(this.authService.userId)
			.subscribe(user => {
				this.user = {
					id: user._id,
					email: user.email,
					name: {
						first: user.name.first,
						last: user.name.last
					},
					password: user.password
				};
			});

		this.route.paramMap.subscribe(pm => {
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
						reviews: property.reviews,
						creator: property.creator,
						student: property.student,
						isReserved: property.isReserved,
						reports: property.reports
					};
				});
			}
		});
	}

	onSubmit(): void {
		const reports = this.property.reports;
		const report = {
			creator: {
				name: { first: this.user.name.first, last: this.user.name.last },
				email: this.user.email
			},
			report: this.reportForm.get("complaint").value,
			description: this.reportForm.get("description").value
		};
		reports.push(report);
		this.property.reports = reports;
		this.propertyService.updateProperty(this.id, this.property);
		this.router.navigate(["property", this.id, "details"]);
	}

	ngOnDestroy(): void {
		this.authSub.unsubscribe();
	}
}
