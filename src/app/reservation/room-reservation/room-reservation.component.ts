import { Component, DoCheck, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Room } from "src/app/room/room.model";
import { RoomService } from "src/app/room/room.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { User } from "../../auth/user.model";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-room-reservation",
	templateUrl: "./room-reservation.component.html",
	styleUrls: ["./room-reservation.component.scss"]
})
export class RoomReservationComponent implements OnInit, DoCheck {
	roomReservationForm: FormGroup;
	room: Room;
	isPart1Enabled = true;
	isPart2Enabled = true;
	isPart3Enabled = true;
	isPart4Enabled = true;
	private id: string;
	private student: {
		registration: string;
		firstName: string;
		lastName: string;
		academicYear: string;
		gender: string;
	};
	private user: User;
	private rooms: Room[];

	constructor(
		private roomService: RoomService,
		private route: ActivatedRoute,
		private authService: AuthService,
		private toastr: ToastrService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((pm: ParamMap) => {
			if (pm.has("id")) {
				this.id = pm.get("id");
				this.roomService.getRoom(this.id).subscribe(room => {
					this.room = {
						id: room._id,
						roomHostel: room.roomHostel,
						roomNumber: room.roomNumber,
						roomFee: room.roomFee,
						genderAccommodated: room.genderAccommodated,
						amenities: room.amenities,
						spaces: room.spaces,
						policies: room.policies,
						student: room.student,
						isReserved: room.isReserved
					};
				});
			}
		});

		this.roomService.getRooms();
		this.roomService.getRoomUpdateListener().subscribe(rooms => {
			this.rooms = rooms;
		});

		this.roomReservationForm = new FormGroup({
			registration: new FormControl(null, [
				Validators.required,
				Validators.pattern("^((H|h)[1])\\d{5}([A-Z]|[a-z]){1}$")
			]),
			firstName: new FormControl(null, [
				Validators.required,
				Validators.pattern("^([A-Z])([a-z]+)$"),
				Validators.max(20)
			]),
			lastName: new FormControl(null, [
				Validators.required,
				Validators.pattern("^([A-Z])([a-z]+)$"),
				Validators.max(20)
			]),
			academicYear: new FormControl("Part 1"),
			gender: new FormControl(null, Validators.required),
			activities: new FormGroup({
				src: new FormControl(null),
				trainee: new FormControl(null),
				choir: new FormControl(null),
				sport: new FormControl(null),
				club: new FormControl(null)
			})
		});

		this.isPart1Enabled = localStorage.getItem("isPart1Enabled") == "true";
		this.isPart2Enabled = localStorage.getItem("isPart2Enabled") == "true";
		this.isPart3Enabled = localStorage.getItem("isPart3Enabled") == "true";
		this.isPart4Enabled = localStorage.getItem("isPart4Enabled") == "true";

		this.toastr.toastrConfig.positionClass = "toast-top-center";
	}

	ngDoCheck(): void {
		this.authService.getUser(this.authService.userId).subscribe(user => {
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

	onReserve(): void {
		this.populateFields();
		if (this.roomReservationForm.valid) {
			this.room.student = {
				registration: this.student.registration.toUpperCase(),
				name: {
					first: this.student.firstName,
					last: this.student.lastName
				},
				academicYear: this.student.academicYear,
				gender: this.student.gender,
				email: this.user.email
			};
			this.room.isReserved = true;

			if (this.isDuplicateStudent(this.rooms)) {
				this.toastr.error(
					"Student " +
						this.student.registration +
						" has already made a reservation, therefore, reservation cannot be processed.",
					"Duplicate Room Reservation"
				);
			} else {
				this.roomService.updateRoom(this.id, this.room);
				this.toastr.success(
					"Your room reservation was successful",
					"Success!"
				);
				this.router.navigate(["/"]);
			}
		} else {
			this.toastr.error(
				"Make sure you provide all information",
				"Invalid Form!"
			);
		}
	}

	private populateFields(): void {
		this.student = {
			registration: this.roomReservationForm.get("registration").value,
			firstName: this.roomReservationForm.get("firstName").value,
			lastName: this.roomReservationForm.get("lastName").value,
			academicYear: this.roomReservationForm.get("academicYear").value,
			gender: this.roomReservationForm.get("gender").value
		};
	}

	private isDuplicateStudent(rooms: Room[]): boolean {
		for (const room of rooms) {
			if (
				room.student.registration ===
				this.student.registration.toUpperCase()
			) {
				return true;
			}
		}
		return false;
	}
}
