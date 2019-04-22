import {
	Component,
	OnInit,
	OnDestroy, DoCheck
} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { RoomService } from "src/app/room/room.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Room } from "src/app/room/room.model";
import { Subscription } from "rxjs";

@Component({
	selector: "app-staff-room-edit",
	templateUrl: "./staff-room-edit.component.html",
	styleUrls: ["./staff-room-edit.component.scss"]
})
export class StaffRoomEditComponent
	implements OnInit, OnDestroy, DoCheck {
	room: Room;
	editForm: FormGroup;
	private essentials = [];
	private safeties = [];
	private policies = [];
	private spaces = [];
	private roomHostel: string;
	private roomNumber: number;
	private roomFee: number;
	private genderAccommodated: string;
	private id: string;
	private roomSub: Subscription;

	constructor(
		private toastr: ToastrService,
		private roomService: RoomService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((pm: ParamMap) => {
			if (pm.has("id")) {
				this.id = pm.get("id");
				this.roomSub = this.roomService.getRoom(this.id).subscribe(room => {
					this.room = {
						id: room._id,
						roomHostel: room.roomHostel,
						roomNumber: room.roomNumber,
						roomFee: room.roomFee,
						genderAccommodated: room.genderAccommodated,
						amenities: room.amenities,
						spaces: room.spaces,
						policies: room.policies
					};
				});
			}
		});

		this.toastr.toastrConfig.positionClass = "toast-top-center";
	}

	ngDoCheck(): void {
		this.editForm = new FormGroup({
			roomHostel: new FormControl(this.room.roomHostel, Validators.required),
			roomNumber: new FormControl(this.room.roomNumber, Validators.required),
			roomFee: new FormControl(this.room.roomFee, Validators.required),
			genderAccommodated: new FormControl(this.room.genderAccommodated, Validators.required),
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
	}

	onUpdate(): void {
		this.populateFields();
		if (this.editForm.valid) {
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

			this.toastr.success("Room has been updated successfully", "Success!");
			this.roomService.updateRoom(room);
			this.router.navigate(["staff", "dashboard"]);
		} else {
			this.toastr.success(
				"Make sure all required fields are filled",
				"Error!"
			);
		}
	}

	private populateFields(): void {
		this.roomHostel = this.editForm.get("roomHostel").value;
		this.roomNumber = this.editForm.get("roomNumber").value;
		this.roomFee = this.editForm.get("roomFee").value;
		this.genderAccommodated = this.editForm.get("genderAccommodated").value;

		this.loadArrays();
	}

	private loadArrays(): void {
		if (this.editForm.get("essentials").get("wifi").value) {
			this.essentials.push("WiFi");
		}
		if (this.editForm.get("essentials").get("tv").value) {
			this.essentials.push("TV");
		}
		if (this.editForm.get("essentials").get("study").value) {
			this.essentials.push("Study area");
		}
		if (this.editForm.get("essentials").get("toiletries").value) {
			this.essentials.push("Toiletries");
		}
		if (this.editForm.get("essentials").get("closet").value) {
			this.essentials.push("Closet/wardrobe");
		}

		if (this.editForm.get("safeties").get("firstAid").value) {
			this.safeties.push("First aid kit");
		}
		if (this.editForm.get("safeties").get("fireExtinguisher").value) {
			this.safeties.push("Fire extinguisher");
		}
		if (this.editForm.get("safeties").get("roomLock").value) {
			this.safeties.push("Room lock");
		}
		if (this.editForm.get("safeties").get("gateLock").value) {
			this.safeties.push("Gate lock");
		}
		if (this.editForm.get("safeties").get("securityFence").value) {
			this.safeties.push("Security fence");
		}
		if (this.editForm.get("safeties").get("guardDogs").value) {
			this.safeties.push("Security guard and watch dogs");
		}

		if (this.editForm.get("spaces").get("commonRoom").value) {
			this.spaces.push("Common room");
		}
		if (this.editForm.get("spaces").get("kitchen").value) {
			this.spaces.push("Kitchen");
		}
		if (this.editForm.get("spaces").get("laundryRoom").value) {
			this.spaces.push("Laundry room");
		}
		if (this.editForm.get("spaces").get("washingLine").value) {
			this.spaces.push("Washing line");
		}
		if (this.editForm.get("spaces").get("parking").value) {
			this.spaces.push("Parking");
		}
		if (this.editForm.get("spaces").get("gym").value) {
			this.spaces.push("Gym");
		}

		this.policies.push(this.editForm.get("policies").get("visitors").value);
		this.policies.push(
			this.editForm.get("policies").get("smokeAlcohol").value
		);
		this.policies.push(
			this.editForm.get("policies").get("eventsParties").value
		);
		this.policies.push(this.editForm.get("policies").get("pets").value);

		if (this.editForm.get("policies").get("gateTimetable").value) {
			this.policies.push("Strict gate timetable");
		}
		if (this.editForm.get("policies").get("appliances").value) {
			this.policies.push("Students can bring their own appliances");
		}
		if (this.editForm.get("policies").get("campusPets").value) {
			this.policies.push("Pets on campus");
		}
		if (this.editForm.get("policies").get("limitedAmenities").value) {
			this.policies.push("Amenities can be limited");
		}
	}

	ngOnDestroy(): void {
		this.roomSub.unsubscribe();
	}
}
