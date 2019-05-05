import { Component, OnInit, OnDestroy } from "@angular/core";
import { RoomService } from "../../room/room.service";
import { Room } from "../../room/room.model";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Chart } from "chart.js";

@Component({
	selector: "app-staff-rooms",
	templateUrl: "./staff-rooms.component.html",
	styleUrls: ["./staff-rooms.component.scss"]
})
export class StaffRoomsComponent implements OnInit, OnDestroy {
	rooms: Room[] = [];
	chart = [];
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
			.subscribe(rooms => {
				const tr: Room[] = [];
				const ar = [];
				const rr = [];
				rooms.forEach(room => {
					if (room.isReserved) {
						ar.push(room);
					} else {
						rr.push(room);
						tr.push(room);
					}
				});
				this.rooms = tr;
				this.chart = new Chart("ctx", {
					type: "doughnut",
					data: {
						labels: ["Reserved Rooms", "Available Rooms"],
						datasets: [
							{
								label: "# of Votes",
								data: [ar.length, rr.length],
								backgroundColor: [
									"rgba(255, 202, 40, 0.75)",
									"rgba(38, 166, 154, 0.75)"
								],
								borderColor: [
									"rgba(255, 202, 40, 1)",
									"rgba(38, 166, 154, 1)"
								],
								borderWidth: 3
							}
						]
					}
				});
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
