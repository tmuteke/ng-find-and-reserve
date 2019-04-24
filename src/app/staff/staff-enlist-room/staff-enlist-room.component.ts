import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Room } from "../../room/room.model";
import { RoomService } from "../../room/room.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-staff-enlist-room",
	templateUrl: "./staff-enlist-room.component.html",
	styleUrls: ["./staff-enlist-room.component.scss"]
})
export class StaffEnlistRoomComponent implements OnInit {
	public enlistForm: FormGroup;
	private essentials = [];
	private safeties = [];
	private policies = [];
	private spaces = [];
	private roomHostel: string;
	private roomNumber: number;
	private roomFee: number;
	private genderAccommodated: string;

	constructor(
		private toastr: ToastrService,
		private roomService: RoomService,
		private router: Router
	) {}

	public ngOnInit(): void {
		this.enlistForm = new FormGroup({
			roomHostel: new FormControl("Hostel 1", Validators.required),
			roomNumber: new FormControl(1, Validators.required),
			roomFee: new FormControl(850, Validators.required),
			genderAccommodated: new FormControl(
				"female and male",
				Validators.required
			),
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
				campusPets: new FormControl(null),
				limitedAmenities: new FormControl(null)
			})
		});

		this.toastr.toastrConfig.positionClass = "toast-top-center";
	}

	public onEnlist(): void {
		this.populateFields();
		if (this.enlistForm.valid) {
			const room: Room = new Room();
			room.roomHostel = this.roomHostel;
			room.roomNumber = this.roomNumber;
			room.roomFee = this.roomFee;
			room.genderAccommodated = this.genderAccommodated;
			room.amenities = {
				essential: this.essentials,
				safety: this.safeties
			};
			room.spaces = this.spaces;
			room.policies = this.policies;
			room.student = {
				name: {
					first: "",
					last: ""
				},
				registration: "",
				academicYear: "",
				gender: "",
				email: ""
			};
			room.isReserved = false;

			this.toastr.success("Room has been added successfully", "Success!");
			this.roomService.addRoom(room);
			this.router.navigate(["staff", "dashboard"]);
		} else {
			this.toastr.success(
				"Make sure all required fields are filled",
				"Error!"
			);
		}
	}

	private populateFields(): void {
		this.roomHostel = this.enlistForm.get("roomHostel").value;
		this.roomNumber = this.enlistForm.get("roomNumber").value;
		this.roomFee = this.enlistForm.get("roomFee").value;
		this.genderAccommodated = this.enlistForm.get("genderAccommodated").value;

		this.loadArrays();
	}

	private loadArrays(): void {
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
		if (this.enlistForm.get("policies").get("campusPets").value) {
			this.policies.push("Pets on campus");
		}
		if (this.enlistForm.get("policies").get("limitedAmenities").value) {
			this.policies.push("Amenities can be limited");
		}
	}
}
