import {
	AfterContentChecked,
	AfterContentInit,
	AfterViewChecked,
	AfterViewInit,
	Component,
	DoCheck,
	OnChanges,
	OnInit,
	SimpleChanges
} from "@angular/core";
import { PropertyService } from "../property/property.service";
import { RoomService } from "../room/room.service";
import { Chart } from "chart.js";

@Component({
	selector: "app-entry",
	templateUrl: "./entry.component.html",
	styleUrls: ["./entry.component.scss"]
})
export class EntryComponent
	implements
		OnChanges,
		OnInit,
		DoCheck,
		AfterContentInit,
		AfterContentChecked,
		AfterViewInit,
		AfterViewChecked {
	chart = [];

	constructor(
		private propService: PropertyService,
		private roomService: RoomService
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
		console.log("ngOnChanges");
	}

	ngOnInit() {
		this.roomService.getRoomUpdateListener().subscribe(rooms => {
			const ar = [];
			const rr = [];
			rooms.forEach(room => {
				if (room.isReserved) {
					ar.push(room);
				} else {
					rr.push(room)
				}
			});
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

	ngDoCheck(): void {
		// console.log("ngDoCheck");
	}
	ngAfterContentInit(): void {
		// console.log("ngAfterContentInit");
	}
	ngAfterContentChecked(): void {
		// console.log("ngAfterContentChecked");
	}
	ngAfterViewInit(): void {
		// console.log("ngAfterViewInit");
	}
	ngAfterViewChecked(): void {
		// console.log("ngAfterViewChecked");
	}
}
