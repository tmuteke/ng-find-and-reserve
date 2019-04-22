import { Component, OnInit, OnDestroy } from "@angular/core";
import { RoomService } from "../../room/room.service";
import { Room } from "../../room/room.model";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-staff-rooms",
	templateUrl: "./staff-rooms.component.html",
	styleUrls: ["./staff-rooms.component.scss"]
})
export class StaffRoomsComponent implements OnInit, OnDestroy {
	rooms: Room[] = [];
	private roomsSub: Subscription;

	constructor(
		private roomService: RoomService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.roomService.getRooms();
		this.roomsSub = this.roomService
			.getRoomUpdateListener()
			.subscribe((rooms: Room[]) => {
				this.rooms = rooms;
			});
	}

	onEdit(id: string): void {
		this.router.navigate([id, "edit"], { relativeTo: this.route });
	}

	onDelete(id: string): void {
		this.roomService.deleteRoom(id);
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
