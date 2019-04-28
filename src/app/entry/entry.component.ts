import { Component, DoCheck, OnInit } from "@angular/core";
import { PropertyService } from "../property/property.service";
import { Property } from "../property/property.model";
import * as CanvasJS from "../../assets/js/canvasjs.min";
import { RoomService } from "../room/room.service";
import { Room } from "../room/room.model";

@Component({
	selector: "app-entry",
	templateUrl: "./entry.component.html",
	styleUrls: ["./entry.component.scss"]
})
export class EntryComponent implements OnInit, DoCheck {
	public totalProperties: number;

	constructor(
		private propService: PropertyService,
		private roomService: RoomService
	) {}

	ngOnInit() {
		this.propService
			.getPropertyUpdateListener()
			.subscribe((properties: Property[]) => {
				this.totalProperties = properties.length;
			});
	}

	ngDoCheck(): void {
		this.roomService.getRoomUpdateListener().subscribe(rooms => {
			const reservedRooms: Room[] = [];
			const nReservedRooms: Room[] = [];
			rooms.filter(room => {
				if (room.isReserved) {
					reservedRooms.push(room);
				} else {
					nReservedRooms.push(room);
				}
			});

			CanvasJS.addColorSet("chartColorSet", ["#26A69A", "#FFCA28"]);
			let chart = new CanvasJS.Chart("chart", {
				theme: "light2",
				animationEnabled: true,
				// exportEnabled: true,
				creditText: " ",
				colorSet: "chartColorSet",
				// title: {
				// 	text: "On-Campus Residence"
				// },
				data: [
					{
						type: "doughnut",
						showInLegend: true,
						toolTipContent: "<b>{name}</b>: {y} rooms (#percent%)",
						indexLabel: "{name} - #percent%",
						dataPoints: [
							{ y: reservedRooms.length, name: "Reserved Rooms" },
							{
								y: nReservedRooms.length,
								name: "Available Rooms"
							}
						]
					}
				]
			});

			chart.render();
		});
	}
}
