import { Component, OnInit, Input } from "@angular/core";
import { Room } from "../room.model";

@Component({
	selector: "app-room-item",
	templateUrl: "./room-item.component.html",
	styleUrls: ["./room-item.component.scss"]
})
export class RoomItemComponent implements OnInit {
	@Input() public room: Room;

	constructor() {}

	public ngOnInit() {}
}
