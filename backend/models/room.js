const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
	roomHostel: {
		type: String
	},
	roomNumber: {
		type: Number
	},
	roomFee: {
		type: Number
	},
	genderAccommodated: {
		type: String
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

module.exports = mongoose.model("Room", roomSchema);
