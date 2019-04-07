import {ReviewComment} from './review-comment.model';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ReviewCommentService {
	constructor(private _http: HttpClient) {}

	get comments() {
		return this._http.get('assets/datasets/reviews.json');
	}
}
