import { Component, OnInit, OnDestroy } from "@angular/core";
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
export class StaffRoomEditComponent implements OnInit, OnDestroy {
	room: Room;
	updateForm: FormGroup;
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
		console.log(this.id);
		console.log(this.room);
		this.updateForm = new FormGroup({
			roomHostel: new FormControl(this.room.roomHostel, Validators.required),
			roomNumber: new FormControl(this.room.roomNumber, Validators.required),
			roomFee: new FormControl(this.room.roomFee, Validators.required),
			genderAccommodated: new FormControl(
				this.room.genderAccommodated,
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
		if (this.updateForm.valid) {
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
		this.roomHostel = this.updateForm.get("roomHostel").value;
		this.roomNumber = this.updateForm.get("roomNumber").value;
		this.roomFee = this.updateForm.get("roomFee").value;
		this.genderAccommodated = this.updateForm.get("genderAccommodated").value;

		this.loadArrays();
	}

	private loadArrays(): void {
		if (this.updateForm.get("essentials").get("wifi").value) {
			this.essentials.push("WiFi");
		}
		if (this.updateForm.get("essentials").get("tv").value) {
			this.essentials.push("TV");
		}
		if (this.updateForm.get("essentials").get("study").value) {
			this.essentials.push("Study area");
		}
		if (this.updateForm.get("essentials").get("toiletries").value) {
			this.essentials.push("Toiletries");
		}
		if (this.updateForm.get("essentials").get("closet").value) {
			this.essentials.push("Closet/wardrobe");
		}

		if (this.updateForm.get("safeties").get("firstAid").value) {
			this.safeties.push("First aid kit");
		}
		if (this.updateForm.get("safeties").get("fireExtinguisher").value) {
			this.safeties.push("Fire extinguisher");
		}
		if (this.updateForm.get("safeties").get("roomLock").value) {
			this.safeties.push("Room lock");
		}
		if (this.updateForm.get("safeties").get("gateLock").value) {
			this.safeties.push("Gate lock");
		}
		if (this.updateForm.get("safeties").get("securityFence").value) {
			this.safeties.push("Security fence");
		}
		if (this.updateForm.get("safeties").get("guardDogs").value) {
			this.safeties.push("Security guard and watch dogs");
		}

		if (this.updateForm.get("spaces").get("commonRoom").value) {
			this.spaces.push("Common room");
		}
		if (this.updateForm.get("spaces").get("kitchen").value) {
			this.spaces.push("Kitchen");
		}
		if (this.updateForm.get("spaces").get("laundryRoom").value) {
			this.spaces.push("Laundry room");
		}
		if (this.updateForm.get("spaces").get("washingLine").value) {
			this.spaces.push("Washing line");
		}
		if (this.updateForm.get("spaces").get("parking").value) {
			this.spaces.push("Parking");
		}
		if (this.updateForm.get("spaces").get("gym").value) {
			this.spaces.push("Gym");
		}

		this.policies.push(this.updateForm.get("policies").get("visitors").value);
		this.policies.push(
			this.updateForm.get("policies").get("smokeAlcohol").value
		);
		this.policies.push(
			this.updateForm.get("policies").get("eventsParties").value
		);
		this.policies.push(this.updateForm.get("policies").get("pets").value);

		if (this.updateForm.get("policies").get("gateTimetable").value) {
			this.policies.push("Strict gate timetable");
		}
		if (this.updateForm.get("policies").get("appliances").value) {
			this.policies.push("Students can bring their own appliances");
		}
		if (this.updateForm.get("policies").get("campusPets").value) {
			this.policies.push("Pets on campus");
		}
		if (this.updateForm.get("policies").get("limitedAmenities").value) {
			this.policies.push("Amenities can be limited");
		}
	}

	ngOnDestroy(): void {
		this.roomSub.unsubscribe();
	}
}
