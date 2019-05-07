import { Component, OnDestroy, OnInit } from "@angular/core";
import { Property } from "../../property/property.model";
import { Subscription } from "rxjs";
import { PropertyService } from "../../property/property.service";
import { Room } from "../../room/room.model";

@Component({
	selector: "app-superuser-properties",
	templateUrl: "./superuser-properties.component.html",
	styleUrls: ["./superuser-properties.component.scss"]
})
export class SuperuserPropertiesComponent implements OnInit, OnDestroy {
	properties: Property[];
	private propertySub: Subscription;

	constructor(private propertyService: PropertyService) {}

	ngOnInit() {
		this.loadProperties();
	}

	onUnflag(id: string) {
		const properties: Property[] = this.properties.filter(
			property => property.id === id
		);
		properties[0].reports = [];
		this.propertyService.updateProperty(id, properties[0]);
		this.loadProperties();
	}

	onCancelReservation(id: string): void {
		const properties: Property[] = this.properties.filter(
			property => property.id === id
		);
		properties[0].isReserved = false;
		this.propertyService.updateProperty(id, properties[0]);
		this.loadProperties();
	}

	onDelete(id: string): void {
		this.propertyService.deleteProperty(id);
		this.loadProperties();
	}

	private loadProperties(): void {
		this.propertyService.getProperties();
		this.propertySub = this.propertyService
			.getPropertyUpdateListener()
			.subscribe(properties => {
				this.properties = properties;
			});
	}

	ngOnDestroy(): void {
		this.propertySub.unsubscribe();
	}
}
