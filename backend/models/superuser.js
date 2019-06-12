const mongoose = require('mongoose');

const superuserSchema = mongoose.Schema({
	username: {
		type: String,
	},
	password: {
		type: String
	}
});


module.exports = mongoose.model('Superuser', superuserSchema);
