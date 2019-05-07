import { Component, OnDestroy, OnInit } from "@angular/core";
import { Room } from "../../room/room.model";
import { Subscription } from "rxjs";
import { RoomService } from "../../room/room.service";

@Component({
	selector: "app-superuser-rooms",
	templateUrl: "./superuser-rooms.component.html",
	styleUrls: ["./superuser-rooms.component.scss"]
})
export class SuperuserRoomsComponent implements OnInit, OnDestroy {
	rooms: Room[] = [];
	private roomsSub: Subscription;

	constructor(private roomService: RoomService) {}

	ngOnInit(): void {
		this.loadRooms();
	}

	onCancelReservation(id: string): void {
		const rooms: Room[] = this.rooms.filter(room => room.id === id);
		rooms[0].isReserved = false;
		this.roomService.updateRoom(id, rooms[0]);
		this.loadRooms();
	}

	onDelete(id: string): void {
		this.roomService.deleteRoom(id);
	}

	private loadRooms(): void {
		this.roomService.getRooms();
		this.roomsSub = this.roomService
			.getRoomUpdateListener()
			.subscribe((rooms: Room[]) => {
				this.rooms = rooms;
			});
	}

	ngOnDestroy(): void {
		this.roomsSub.unsubscribe();
	}
}
