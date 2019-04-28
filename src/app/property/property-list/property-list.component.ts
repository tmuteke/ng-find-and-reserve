import { Component, OnInit, OnDestroy } from "@angular/core";
import { Property } from "../property.model";
import { Subscription } from "rxjs";
import { PropertyService } from "../property.service";

@Component({
	selector: "app-property-list",
	templateUrl: "./property-list.component.html",
	styleUrls: ["./property-list.component.scss"]
})
export class PropertyListComponent implements OnInit, OnDestroy {
	public properties: Property[];
	private propertySub: Subscription;

	constructor(private propertyService: PropertyService) {}

	public ngOnInit(): void {
		this.propertyService.getProperties();
		this.propertySub = this.propertyService
			.getPropertyUpdateListener()
			.subscribe(properties => {
				const tempProperties: Property[] = [];
				properties.filter(property => {
					if (!property.isReserved) {
						tempProperties.push(property);
					}
				});
				this.properties = tempProperties;
			});
	}

	public ngOnDestroy(): void {
		this.propertySub.unsubscribe();
	}
}
