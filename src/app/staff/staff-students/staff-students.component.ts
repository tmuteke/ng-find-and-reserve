import { Component, OnDestroy, OnInit } from "@angular/core";
import { Room } from "../../room/room.model";
import { RoomService } from "../../room/room.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-staff-students",
	templateUrl: "./staff-students.component.html",
	styleUrls: ["./staff-students.component.scss"]
})
export class StaffStudentsComponent implements OnInit, OnDestroy {
	rooms: Room[] = [];
	private roomsSub: Subscription;

	constructor(private roomService: RoomService) {}

	ngOnInit() {
		this.roomService.getRooms();
		this.roomsSub = this.roomService
			.getRoomUpdateListener()
			.subscribe((rooms: Room[]) => {
				const tempRooms: Room[] = [];
				rooms.filter(room => {
					if (room.isReserved) {
						tempRooms.push(room);
					}
				});
				this.rooms = tempRooms;
			});
	}

	ngOnDestroy(): void {
		this.roomsSub.unsubscribe();
	}
}
