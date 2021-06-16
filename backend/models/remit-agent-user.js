const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const remitAgentSchema = mongoose.Schema({
	firstname: { type: String },
	lastname: { type: String },
	username: { type: String },
	password: { type: String },
	matchingPassword: { type: String },
	email: { type: String, unique: true },
	agentId: { type: String },
	roleId: { type: Number }
});

remitAgentSchema.plugin(uniqueValidator);

module.exports = mongoose.model("RemitAgent", remitAgentSchema);
