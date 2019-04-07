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
	public rooms: Room[] = [];
	private roomsSub: Subscription;

	constructor(private roomService: RoomService) {}

	public ngOnInit(): void {
		this.roomService.getRooms();
		this.roomsSub = this.roomService
			.getRoomUpdateListener()
			.subscribe(rooms => {
				this.rooms = rooms;
			});
	}

	public ngOnDestroy(): void {
		this.roomsSub.unsubscribe();
	}
}
