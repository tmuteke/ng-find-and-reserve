import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Room } from "src/app/room/room.model";
import { RoomService } from "src/app/room/room.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
	selector: "app-room-reservation",
	templateUrl: "./room-reservation.component.html",
	styleUrls: ["./room-reservation.component.scss"]
})
export class RoomReservationComponent implements OnInit {
	public roomReservationForm: FormGroup;
	public room: Room;
	private id: string;

	constructor(
		private roomService: RoomService,
		private route: ActivatedRoute
	) {}

	public ngOnInit(): void {
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
						policies: room.policies
					};
				});
			}
		});
		console.log(this.id);
		this.roomReservationForm = new FormGroup({
			regNumber: new FormControl(null),
			name: new FormControl(null),
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
	}
}
