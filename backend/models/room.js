const mongoose = require('mongoose');

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
	}
});

module.exports = mongoose.model('Room', roomSchema);
