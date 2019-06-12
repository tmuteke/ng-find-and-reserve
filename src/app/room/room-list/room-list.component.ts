import { Component, OnInit, OnDestroy } from "@angular/core";
import { RoomService } from "../room.service";
import { Room } from "../room.model";
import { Subscription } from "rxjs";

@Component({
	selector: "app-room-list",
	templateUrl: "./room-list.component.html",
	styleUrls: ["./room-list.component.scss"]
})
export class RoomListComponent implements OnInit, OnDestroy {
	rooms: Room[] = [];
	private roomsSub: Subscription;

	constructor(private roomService: RoomService) {}

	ngOnInit(): void {
		this.roomService.getRooms();
		this.roomsSub = this.roomService
			.getRoomUpdateListener()
			.subscribe(rooms => {
				const tempRooms: Room[] = [];
				rooms.filter(room => {
					if (!room.isReserved) {
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
