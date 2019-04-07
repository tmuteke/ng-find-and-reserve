import { Component, OnInit, Input } from "@angular/core";
import { Property } from "../property.model";

@Component({
	selector: "app-property-item",
	templateUrl: "./property-item.component.html",
	styleUrls: ["./property-item.component.scss"]
})
export class PropertyItemComponent implements OnInit {
	@Input() public property: Property;

	constructor() {}

	public ngOnInit(): void {}
}
