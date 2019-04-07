import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-enlist-start",
	templateUrl: "./enlist-start.component.html",
	styleUrls: ["./enlist-start.component.scss"]
})
export class EnlistStartComponent implements OnInit {
	constructor(private route: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {}

	onProceed(): void {
		// const radioValue = this._form.get("enlistType").value;
		// if (radioValue === "new") {
		// 	this._redirectTo = "enlist-new";
		// }
		this.router.navigate(["enlist-new"]);
	}
}
