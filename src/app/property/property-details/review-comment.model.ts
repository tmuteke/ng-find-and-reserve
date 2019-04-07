export class ReviewComment {
	constructor(private _postId: string,
					private _reviewerName: string,
					private _reviewerEmail: string,
					private _reviewBody: string,
					private _reviewerAvatar) {}


	get postId(): string {
		return this._postId;
	}

	get reviewerName(): string {
		return this._reviewerName;
	}

	get reviewerEmail(): string {
		return this._reviewerEmail;
	}

	get reviewBody(): string {
		return this._reviewBody;
	}

	get reviewAvatar(): string {
		return this._reviewerAvatar;
	}
}
