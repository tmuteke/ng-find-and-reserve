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
	private _property: Property;
	imgHostAvatar = require('../../../../assets/images/avatar.jpg');
	imgGoogleMaps = require('../../../../assets/images/google_map.png');
	imgReviewCommentAvatar = require('../../../../assets/images/avatar.jpg')
	private _reviews: {}[];
	id: string;
	users: {}[];

	constructor(private route: ActivatedRoute,
				private _propertyService: PropertyService,
				private reviewCommentService: ReviewCommentService) {}

	ngOnInit(): void {
		this.route.params
			.subscribe((params: Params) => {
					this._property = this._propertyService.getPropertyById(params['id']);
				});
		this.reviewCommentService.comments
			.subscribe((reviews: {}[]) => {
				this._reviews = reviews;
			});
		this.reviewCommentService.users
			.subscribe((users: {}[]) => {
			this.users = users;
		});
		
		
	}

	get property(): Property {
		return this._property;
	}

	get reviews(): {}[] {
		return this._reviews;
	}
}
