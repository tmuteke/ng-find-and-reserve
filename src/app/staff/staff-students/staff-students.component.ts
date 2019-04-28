import { Component, OnDestroy, OnInit } from "@angular/core";
import { Room } from "../../room/room.model";
import { RoomService } from "../../room/room.service";
import { Subscription } from "rxjs";
import { Property } from "../../property/property.model";
import { PropertyService } from "../../property/property.service";

@Component({
	selector: "app-staff-students",
	templateUrl: "./staff-students.component.html",
	styleUrls: ["./staff-students.component.scss"]
})
export class StaffStudentsComponent implements OnInit, OnDestroy {
	rooms: Room[] = [];
	properties: Property[] = [];
	private roomsSub: Subscription;
	private propertiesSub: Subscription;

	constructor(
		private roomService: RoomService,
		private propertyService: PropertyService
	) {}

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
		this.propertyService.getProperties();
		this.propertiesSub = this.propertyService
			.getPropertyUpdateListener()
			.subscribe((properties: Property[]) => {
				const tempProperties: Property[] = [];
				properties.filter(property => {
					if (property.isReserved) {
						tempProperties.push(property);
					}
				});
				this.properties = tempProperties;
			});
	}

	ngOnDestroy(): void {
		this.roomsSub.unsubscribe();
		this.propertiesSub.unsubscribe();
	}
}
