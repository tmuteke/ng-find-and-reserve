const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const propertiesRoutes = require("./routes/properties");
const userRoutes = require("./routes/user");
const roomsRoutes = require("./routes/rooms");
const superuserRouters = require("./routes/superuser");
const remitAgentRoutes = require("./routes/remit-agent-users");

const app = express();

mongoose
	.connect("mongodb://localhost:27017/find_and_reserve", {
		useNewUrlParser: true
	})
	.then(() => {
		console.log("Connected to database");
	})
	.catch(() => {
		console.log("Connection failed");
	});

app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Authorization, Content-Type, Accept"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE, OPTIONS"
	);
	next();
});

app.use("/api/properties", propertiesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/superuser", superuserRouters);
app.use("/api/remit-agent", remitAgentRoutes);

module.exports = app;
