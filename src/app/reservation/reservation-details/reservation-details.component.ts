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
	id: string;

	constructor(private route: ActivatedRoute, private propService: PropertyService) { }

	ngOnInit() {
		this.onFormInit();
		this.propService.getPropertySelectedId().subscribe((id: string) => { this.id = id});
	}

	onFormInit(): void {
		this.form = new FormGroup({
			'regNumber': new FormControl(null),
			'year': new FormControl(null),
			'gender': new FormControl(null)
		});
	}

	test(): void {
		console.log(this.id);
	}
}
