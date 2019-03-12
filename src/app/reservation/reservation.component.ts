import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PropertyService } from '../property/property.service';

@Component({
	selector: 'app-reservation',
	templateUrl: './reservation.component.html',
	styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
	pleaseId: any;

	constructor(private route: ActivatedRoute, private propService: PropertyService) { }

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			console.log(params['id']);
		});
		this.propService.getId().subscribe(id => { this.pleaseId = id; });
		console.log(this.pleaseId);
	}

}
