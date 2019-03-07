import {ReviewCommentService} from './review-comment.service';

declare function require(path: string);
import {Component, OnInit} from '@angular/core';

import { Property } from '../../property.model';
import {ActivatedRoute, Params} from '@angular/router';
import {PropertyService} from '../../property.service';
import {ReviewComment} from './review-comment.model';

@Component({
	selector: 'app-property-details',
	templateUrl: './property-details.component.html',
	styleUrls: ['./property-details.component.scss']
})

export class PropertyDetailsComponent implements OnInit {
	property: Property;
	imgHostAvatar = require('../../../../assets/images/avatar.jpg');
	imgGoogleMaps = require('../../../../assets/images/google_map.png');
	imgReviewCommentAvatar = require('../../../../assets/images/avatar.jpg')
	reviews: {}[];
	id: string;
	users: {}[];

	constructor(private route: ActivatedRoute,
				private propService: PropertyService,
				private revComService: ReviewCommentService) {}

	ngOnInit(): void {
		this.route.params
			.subscribe((params: Params) => {
					this.property = this.propService.getPropertyById(params['id']);
					this.id = params['id'];
				});
		this.revComService.comments
			.subscribe((reviews: {}[]) => {
				this.reviews = reviews;
			});
		this.revComService.users
			.subscribe((users: {}[]) => {
			this.users = users;
		});
	}

	onReserve(): void {
		this.propService.id.next();
	}
}
