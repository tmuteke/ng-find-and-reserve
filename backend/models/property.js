const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	landlord: {
		name: {
			first: {
				type: String,
			},
			last: {
				type: String,
			}
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		avatar: {
			type: String,
		}
	},
	address: {
		houseNumber: {
			type: String,
		},
		street: {
			type: String,
		},
		area: {
			type: String,
		},
		city: {
			type: String,
		},
		geo: {
			lat: {
				type: Number,
			},
			lng: {
				type: Number,
			}
		}
	},
	apartmentType: {
		type: String,
	},
	roomType: {
		type: String,
	},
	isDedicatedSetup: {
		type: Boolean,
	},
	genderAccommodated: {
		type: String,
	},
	numberOfStudents: {
		type: Number,
	},
	amenities: {
		essential: {
			type: Array
		},
		safety: {
			type: Array
		}
	},
	spaces: {
		type: Array
	},
	policies: {
		type: Array
	},
	description: {
		type: String
	},
	numberOfRooms: {
		type: Number,
	},
	numberOfBathrooms: {
		type: Number,
	},
	rent: {
		type: Number,
	},
	rating: {
		type: Number,
	},
	reviews: {
		type: Number,
	},
	student: {
		name: {
			first: {
				type: String
			},
			last: {
				type: String
			}
		},
		email: {
			type: String
		},
		registration: {
			type: String
		},
		academicYear: {
			type: String
		},
		gender: {
			type: String
		}
	},
	isReserved: {
		type: Boolean
	}
});

module.exports = mongoose.model('Property', propertySchema);
