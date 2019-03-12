import { ReviewCommentService } from './review-comment.service';

import { Component, OnInit } from '@angular/core';

import { Property } from '../../property.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PropertyService } from '../../property.service';

@Component({
	selector: 'app-property-details',
	templateUrl: './property-details.component.html',
	styleUrls: ['./property-details.component.scss']
})

export class PropertyDetailsComponent implements OnInit {
	property: Property;
	reviews: {}[];

	constructor(private route: ActivatedRoute,
		private propService: PropertyService,
		private revComService: ReviewCommentService) { }

	ngOnInit(): void {
		this.route.params
			.subscribe((params: Params) => {
				this.property = this.propService.getPropertyById(params['id']);
				console.log(params);
			});
		this.revComService.comments
			.subscribe((reviews: {}[]) => {
				this.reviews = reviews;
			});
		this.propService.postId('posted id');
	}
}
