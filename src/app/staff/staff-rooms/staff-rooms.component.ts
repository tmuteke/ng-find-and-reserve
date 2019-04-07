import { Component, OnInit, OnDestroy } from "@angular/core";
import { RoomService } from "../../room/room.service";
import { Room } from "../../room/room.model";
import { Subscription } from "rxjs";

@Component({
	selector: "app-staff-rooms",
	templateUrl: "./staff-rooms.component.html",
	styleUrls: ["./staff-rooms.component.scss"]
})
export class StaffRoomsComponent implements OnInit, OnDestroy {
	public rooms: Room[] = [];
	private roomsSub: Subscription;

	constructor(private roomService: RoomService) {}

	public ngOnInit(): void {
		this.roomService.getRooms();
		this.roomsSub = this.roomService
			.getRoomUpdateListener()
			.subscribe((rooms: Room[]) => {
				this.rooms = rooms;
			});
	}

	public ngOnDestroy(): void {
		this.roomsSub.unsubscribe();
	}
}
