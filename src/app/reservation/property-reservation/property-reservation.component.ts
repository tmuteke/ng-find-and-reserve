import { Component, DoCheck, OnInit } from "@angular/core";
import { Property } from "src/app/property/property.model";
import { PropertyService } from "src/app/property/property.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { User } from "../../auth/user.model";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-property-reservation",
	templateUrl: "./property-reservation.component.html",
	styleUrls: ["./property-reservation.component.scss"],
})
export class PropertyReservationComponent implements OnInit, DoCheck {
	property: Property;
	propertyReservationForm: FormGroup;
	private id: string;
	private student: {
		name: {
			first: string;
			last: string;
		};
		registration: string;
		academicYear: string;
		gender: string;
	};
	private user: User;
	private properties: Property[];

	constructor(
		private propertyService: PropertyService,
		private route: ActivatedRoute,
		private authService: AuthService,
		private toastr: ToastrService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.authService.getUser(this.authService.userId).subscribe((user) => {
			this.user = {
				id: user._id,
				email: user.email,
				name: {
					first: user.name.first,
					last: user.name.last,
				},
				password: user.password,
			};
		});

		this.route.paramMap.subscribe((pm: ParamMap) => {
			if (pm.has("id")) {
				this.id = pm.get("id");
				this.propertyService.getProperty(this.id).subscribe((property) => {
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
						reports: property.reports,
					};
				});
			}
		});

		this.propertyService.getProperties();
		this.propertyService
			.getPropertyUpdateListener()
			.subscribe((properties) => {
				this.properties = properties;
			});

		this.propertyReservationForm = new FormGroup({
			registration: new FormControl(null, [
				Validators.required,
				Validators.pattern("^((H|h)[1])\\d{5}([A-Z]|[a-z]){1}$"),
			]),
			firstName: new FormControl(null, [
				Validators.required,
				Validators.pattern("^([A-Z])([a-z]+)$"),
			]),
			lastName: new FormControl(null, [
				Validators.required,
				Validators.pattern("^([A-Z])([a-z]+)$"),
			]),
			academicYear: new FormControl("Part 1"),
			gender: new FormControl("Female"),
		});

		this.toastr.toastrConfig.positionClass = "toast-top-center";
	}

	ngDoCheck(): void {
		// this.authService.getUser(this.authService.userId).subscribe(user => {
		// 	this.user = {
		// 		id: user._id,
		// 		email: user.email,
		// 		name: {
		// 			first: user.name.first,
		// 			last: user.name.last
		// 		},
		// 		password: user.password
		// 	};
		// });
	}

	onReserve(): void {
		this.populateFields();
		if (this.propertyReservationForm.valid) {
			this.property.student = {
				name: {
					first: this.student.name.first,
					last: this.student.name.last,
				},
				registration: this.student.registration.toUpperCase(),
				academicYear: this.student.academicYear,
				gender: this.student.gender,
				email: this.user.email,
			};
			this.property.isReserved = true;

			if (this.isDuplicateStudent(this.properties)) {
				this.toastr.error(
					"Student " +
						this.student.registration +
						" has already made a reservation, therefore, reservation cannot be processed.",
					"Duplicate Room Reservation"
				);
			} else {
				this.propertyService.updateProperty(this.id, this.property);
				this.toastr.success(
					"Your room reservation was successful",
					"Success!"
				);
				this.router.navigate(["/"]);
			}
		} else {
			this.toastr.error("Make you provide all information", "Error!");
		}
	}

	private populateFields(): void {
		this.student = {
			name: {
				first: this.propertyReservationForm.get("firstName").value,
				last: this.propertyReservationForm.get("lastName").value,
			},
			registration: this.propertyReservationForm.get("registration").value,
			academicYear: this.propertyReservationForm.get("academicYear").value,
			gender: this.propertyReservationForm.get("gender").value,
		};
	}

	private isDuplicateStudent(properties: Property[]): boolean {
		for (const property of properties) {
			if (
				property.student.registration ===
				this.student.registration.toUpperCase()
			) {
				return true;
			}
		}
		return false;
	}
}
