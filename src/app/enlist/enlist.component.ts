import { Component, DoCheck, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Property } from "../property/property.model";
import { PropertyService } from "../property/property.service";
import { ToastrService } from "ngx-toastr";
import { mimeType } from "./mime-type.validator";
import { User } from "../auth/user.model";
import { AuthService } from "../auth/auth.service";

@Component({
	selector: "app-enlist",
	templateUrl: "./enlist.component.html",
	styleUrls: ["./enlist.component.scss"]
})
export class EnlistComponent implements OnInit, DoCheck {
	enlistForm: FormGroup;
	private imagePreview: string;
	private essentials = [];
	private safeties = [];
	private spaces = [];
	private policies = [];
	private propertyType: string;
	private roomType: string;
	private rent: number;
	private isDedicatedSetup: boolean;
	private genderAccommodated: string;
	private numberOfStudents: number;
	private numberOfRooms: number;
	private numberOfBathrooms: number;
	private houseNumber: number;
	private street: string;
	private area: string;
	private city: string;
	private description: string;
	private phone: string;
	private userId: string;
	private user: User;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private propertyService: PropertyService,
		private toastr: ToastrService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.enlistForm = new FormGroup({
			propertyType: new FormControl("Rooms", Validators.required),
			roomType: new FormControl("shared rooms", Validators.required),
			rent: new FormControl(100, [Validators.required, Validators.min(1)]),
			isDedicatedSetup: new FormControl("true", Validators.required),
			genderAccommodated: new FormControl(
				"female and male",
				Validators.required
			),
			numberOfStudents: new FormControl(5, [
				Validators.required,
				Validators.min(1)
			]),
			numberOfRooms: new FormControl(5, Validators.required),
			numberOfBathrooms: new FormControl(3, [
				Validators.required,
				Validators.min(1)
			]),
			houseNumber: new FormControl(1, [
				Validators.required,
				Validators.min(1)
			]),
			street: new FormControl(null, Validators.required),
			area: new FormControl(null, Validators.required),
			city: new FormControl(null, Validators.required),
			description: new FormControl(null, Validators.required),
			phone: new FormControl(null, [
				Validators.required,
				Validators.pattern("^\\d{10}$")
			]),
			essentials: new FormGroup({
				wifi: new FormControl(null),
				tv: new FormControl(null),
				study: new FormControl(null),
				toiletries: new FormControl(null),
				closet: new FormControl(null)
			}),
			safeties: new FormGroup({
				firstAid: new FormControl(null),
				fireExtinguisher: new FormControl(null),
				roomLock: new FormControl(null),
				gateLock: new FormControl(null),
				securityFence: new FormControl(null),
				guardDogs: new FormControl(null)
			}),
			spaces: new FormGroup({
				commonRoom: new FormControl(null),
				kitchen: new FormControl(null),
				laundryRoom: new FormControl(null),
				washingLine: new FormControl(null),
				parking: new FormControl(null),
				gym: new FormControl(null)
			}),
			policies: new FormGroup({
				visitors: new FormControl("No visitors allowed"),
				smokeAlcohol: new FormControl("No smoking or drinking alcohol"),
				eventsParties: new FormControl("Events or parties are not allowed"),
				pets: new FormControl("No pets allowed"),
				gateTimetable: new FormControl(null),
				appliances: new FormControl(null),
				eventsHosted: new FormControl(null),
				hostPets: new FormControl(null),
				limitedAmenities: new FormControl(null)
			})
		});

		this.toastr.toastrConfig.positionClass = "toast-top-center";
	}

	ngDoCheck(): void {
		this.userId = this.authService.userId;
		this.authService.getUser(this.userId).subscribe(user => {
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
	}

	public onEnlist(): void {
		this.populateFormFields();
		if (this.enlistForm.valid) {
			const property = new Property();
			property.landlord = {
				name: { first: this.user.name.first, last: this.user.name.last },
				email: this.user.email,
				phone: this.phone,
				avatar: "http://i.pravatar.cc/300"
			};
			property.address = {
				houseNumber: "" + this.houseNumber,
				street: this.street,
				city: this.city,
				area: this.area,
				geo: { lat: 9.8987898, lng: 88486 }
			};
			property.apartmentType = this.propertyType;
			property.roomType = this.roomType;
			property.isDedicatedSetup = this.isDedicatedSetup;
			property.genderAccommodated = this.genderAccommodated;
			property.numberOfStudents = this.numberOfStudents;
			property.numberOfRooms = this.numberOfRooms;
			property.numberOfBathrooms = this.numberOfBathrooms;
			property.amenities = {
				essential: this.essentials,
				safety: this.safeties
			};
			property.spaces = this.spaces;
			property.policies = this.policies;
			property.description = this.description;
			property.rent = this.rent;
			property.rating = 0;
			property.reviews = 0;
			property.student = {
				name: {
					first: "",
					last: ""
				},
				registration: "",
				academicYear: "",
				gender: "",
				email: ""
			};
			property.isReserved = false;
			this.propertyService.addProperty(property);
			this.toastr.success(
				"Your place has been enlisted successfully",
				"Success!"
			);
			this.router.navigate(["finish"], { relativeTo: this.route });
		} else {
			this.toastr.error(
				"Incorrect data may have been entered. Make sure all fields with a * are filled, as they're required.",
				"Form Invalid!"
			);
		}
	}

	private onImagePicked(event: Event): void {
		const file = (event.target as HTMLInputElement).files[0];
		this.enlistForm.patchValue({
			image: file
		});
		this.enlistForm.get("image").updateValueAndValidity();
		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview = <string>reader.result;
		};
		reader.readAsDataURL(file);
	}

	private populateFormFields(): void {
		this.propertyType = this.enlistForm.get("propertyType").value;
		this.roomType = this.enlistForm.get("roomType").value;
		this.rent = this.enlistForm.get("rent").value;
		this.isDedicatedSetup = this.enlistForm.get("isDedicatedSetup").value;
		this.genderAccommodated = this.enlistForm.get("genderAccommodated").value;
		this.numberOfStudents = this.enlistForm.get("numberOfStudents").value;
		this.numberOfRooms = this.enlistForm.get("numberOfRooms").value;
		this.numberOfBathrooms = this.enlistForm.get("numberOfBathrooms").value;
		this.houseNumber = this.enlistForm.get("houseNumber").value;
		this.street = this.enlistForm.get("street").value;
		this.area = this.enlistForm.get("area").value;
		this.city = this.enlistForm.get("city").value;
		this.description = this.enlistForm.get("description").value;
		this.phone = this.enlistForm.get("phone").value;

		this.loadAmenitiesAndSpaces();
	}

	private loadAmenitiesAndSpaces(): void {
		if (this.enlistForm.get("essentials").get("wifi").value) {
			this.essentials.push("WiFi");
		}
		if (this.enlistForm.get("essentials").get("tv").value) {
			this.essentials.push("TV");
		}
		if (this.enlistForm.get("essentials").get("study").value) {
			this.essentials.push("Study area");
		}
		if (this.enlistForm.get("essentials").get("toiletries").value) {
			this.essentials.push("Toiletries");
		}
		if (this.enlistForm.get("essentials").get("closet").value) {
			this.essentials.push("Closet/wardrobe");
		}

		if (this.enlistForm.get("safeties").get("firstAid").value) {
			this.safeties.push("First aid kit");
		}
		if (this.enlistForm.get("safeties").get("fireExtinguisher").value) {
			this.safeties.push("Fire extinguisher");
		}
		if (this.enlistForm.get("safeties").get("roomLock").value) {
			this.safeties.push("Room lock");
		}
		if (this.enlistForm.get("safeties").get("gateLock").value) {
			this.safeties.push("Gate lock");
		}
		if (this.enlistForm.get("safeties").get("securityFence").value) {
			this.safeties.push("Security fence");
		}
		if (this.enlistForm.get("safeties").get("guardDogs").value) {
			this.safeties.push("Security guard and watch dogs");
		}

		if (this.enlistForm.get("spaces").get("commonRoom").value) {
			this.spaces.push("Common room");
		}
		if (this.enlistForm.get("spaces").get("kitchen").value) {
			this.spaces.push("Kitchen");
		}
		if (this.enlistForm.get("spaces").get("laundryRoom").value) {
			this.spaces.push("Laundry room");
		}
		if (this.enlistForm.get("spaces").get("washingLine").value) {
			this.spaces.push("Washing line");
		}
		if (this.enlistForm.get("spaces").get("parking").value) {
			this.spaces.push("Parking");
		}
		if (this.enlistForm.get("spaces").get("gym").value) {
			this.spaces.push("Gym");
		}

		this.policies.push(this.enlistForm.get("policies").get("visitors").value);
		this.policies.push(
			this.enlistForm.get("policies").get("smokeAlcohol").value
		);
		this.policies.push(
			this.enlistForm.get("policies").get("eventsParties").value
		);
		this.policies.push(this.enlistForm.get("policies").get("pets").value);

		if (this.enlistForm.get("policies").get("gateTimetable").value) {
			this.policies.push("Strict gate timetable");
		}
		if (this.enlistForm.get("policies").get("appliances").value) {
			this.policies.push("Students can bring their own appliances");
		}
		if (this.enlistForm.get("policies").get("eventsHosted").value) {
			this.policies.push("Landlord host events or parties");
		}
		if (this.enlistForm.get("policies").get("hostPets").value) {
			this.policies.push("Pets on the premise");
		}
		if (this.enlistForm.get("policies").get("limitedAmenities").value) {
			this.policies.push("Amenities can be limited");
		}
	}
}
