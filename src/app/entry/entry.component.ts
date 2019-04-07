import { Component, OnInit } from "@angular/core";
import { PropertyService } from "../property/property.service";
import { Property } from "../property/property.model";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-entry",
	templateUrl: "./entry.component.html",
	styleUrls: ["./entry.component.scss"]
})
export class EntryComponent implements OnInit {
	public totalProperties: number;
	public isLoading = false;

	constructor(
		private propService: PropertyService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.isLoading = true;
		this.propService
			.getPropertyUpdateListener()
			.subscribe((properties: Property[]) => {
				this.totalProperties = properties.length;
			});
		this.isLoading = false;
	}
}
