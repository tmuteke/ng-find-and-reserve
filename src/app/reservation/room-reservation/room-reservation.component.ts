import { Component, DoCheck, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Room } from "src/app/room/room.model";
import { RoomService } from "src/app/room/room.service";
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { AuthService } from "../../auth/auth.service";
import { User } from "../../auth/user.model";
import {ToastrService} from 'ngx-toastr';

@Component({
	selector: "app-room-reservation",
	templateUrl: "./room-reservation.component.html",
	styleUrls: ["./room-reservation.component.scss"]
})
export class RoomReservationComponent implements OnInit, DoCheck {
	roomReservationForm: FormGroup;
	room: Room;
	private id: string;
	private student: {
		registration: string;
		firstName: string;
		lastName: string;
		academicYear: string;
		gender: string;
	};
	private user: User;

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

		this.roomReservationForm = new FormGroup({
			registration: new FormControl(null),
			firstName: new FormControl(null),
			lastName: new FormControl(null),
			academicYear: new FormControl("Part 1"),
			gender: new FormControl("Female"),
			activities: new FormGroup({
				src: new FormControl(null),
				trainee: new FormControl(null),
				choir: new FormControl(null),
				sport: new FormControl(null),
				club: new FormControl(null)
			})
		});

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
				registration: this.student.registration,
				name: {
					first: this.student.firstName,
					last: this.student.lastName
				},
				academicYear: this.student.academicYear,
				gender: this.student.gender,
				email: this.user.email
			};
			this.room.isReserved = true;

			this.roomService.updateRoom(this.id, this.room);
			this.toastr.success("Your room reservation was successful", "Success!");
			this.router.navigate(['/']);
		} else {
			this.toastr.error("Make sure you provide all information", "Error!");
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
}
