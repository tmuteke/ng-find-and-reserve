import { Component, OnInit } from "@angular/core";
import { User } from "../auth/user.model";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Room } from "../room/room.model";
import { Property } from "../property/property.model";
import { PropertyService } from "../property/property.service";
import { RoomService } from "../room/room.service";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
	user: User;
	roomReservations: Room[];
	propertyReservations: Property[];
	propertyEnlistings: Property[];
	private userSub: Subscription;
	private rooms: Room[];

	constructor(
		private authService: AuthService,
		private propertyService: PropertyService,
		private roomService: RoomService
	) {}

	ngOnInit(): void {
		this.userSub = this.authService
			.getUser(this.authService.userId)
			.subscribe(user => {
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

		this.loadRooms();
		this.loadProperties();
	}

	onCancelRoomReservation(id: string): void {
		const rooms: Room[] = this.rooms.filter(room => room.id === id);
		rooms[0].isReserved = false;
		rooms[0].student = {
			name: {
				first: "",
				last: ""
			},
			email: "",
			registration: "",
			gender: "",
			academicYear: ""
		};
		this.roomService.updateRoom(id, rooms[0]);
		this.loadRooms();
	}

	onCancelPropertyReservation(id: string): void {
		const properties: Property[] = this.propertyReservations.filter(
			property => property.id === id
		);
		properties[0].isReserved = false;
		properties[0].student = {
			name: {
				first: "",
				last: ""
			},
			email: "",
			registration: "",
			gender: "",
			academicYear: ""
		};
		this.propertyService.updateProperty(id, properties[0]);
		this.loadProperties();
	}

	onDeleteProperty(id: string): void {
		this.propertyService.deleteProperty(id);
		this.loadProperties();
	}

	private loadRooms(): void {
		this.roomService.getRooms();
		this.roomService.getRoomUpdateListener().subscribe(rooms => {
			this.rooms = rooms;
			this.roomReservations = rooms.filter(
				room => room.student.email === this.user.email
			);
		});
	}

	private loadProperties(): void {
		this.propertyService.getProperties();
		this.propertyService.getPropertyUpdateListener().subscribe(properties => {
			this.propertyReservations = properties.filter(
				property => property.student.email === this.user.email
			);
			this.propertyEnlistings = properties.filter(
				property => property.landlord.email === this.user.email
			);
		});
	}
}
