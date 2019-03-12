import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PropertyService } from 'src/app/property/property.service';

@Component({
	selector: 'app-reservation-details',
	templateUrl: './reservation-details.component.html',
	styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {
	form: FormGroup;

	constructor(private route: ActivatedRoute, private propService: PropertyService) { }

	ngOnInit() {
		this.onFormInit();
		// this.route.params.subscribe((params: Params) => { console.log(params); });
	}

	onFormInit(): void {
		this.form = new FormGroup({
			'regNumber': new FormControl(null),
			'year': new FormControl(null),
			'gender': new FormControl(null)
		});
	}

	onSubmit(): void {
	}
}
