import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Room } from "./room.model";

@Injectable({
	providedIn: "root"
})
export class RoomService {
	private rooms: Room[] = [];
	private roomsUpdated: Subject<Room[]> = new Subject();

	constructor(private http: HttpClient) {}

	public getRooms() {
		return this.http
			.get<{ message: string; rooms: any }>(
				"http://localhost:3000/api/rooms"
			)
			.pipe(
				map(roomsData => {
					return roomsData.rooms.map(room => {
						return {
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
				})
			)
			.subscribe(rooms => {
				this.rooms = rooms;
				this.roomsUpdated.next([...this.rooms]);
			});
	}

	public getRoom(id: string) {
		return this.http.get<{
			_id: string;
			roomHostel: string;
			roomNumber: number;
			roomFee: number;
			genderAccommodated: string;
			amenities: {
				essential: Array<any>;
				safety: Array<any>;
			};
			spaces: Array<any>;
			policies: Array<any>;
		}>("http://localhost:3000/api/rooms/" + id);
	}

	public addRoom(newRoom: Room) {
		const room: Room = newRoom;
		this.http
			.post<{ message: string }>("http://localhost:3000/api/rooms", room)
			.subscribe(() => {
				this.rooms.push(room);
				this.roomsUpdated.next([...this.rooms]);
			});
	}

	public deleteRoom(id: string): void {
		this.http.delete<{
			_id: string;
			roomHostel: string;
			roomNumber: number;
			roomFee: number;
			genderAccommodated: string;
			amenities: {
				essential: Array<any>;
				safety: Array<any>;
			};
			spaces: Array<any>;
			policies: Array<any>;
		}>("http://localhost:3000/api/rooms/" + id);
	}

	getRoomUpdateListener() {
		return this.roomsUpdated.asObservable();
	}
}
