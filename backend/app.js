const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const propertiesRoutes = require('./routes/properties');
const userRoutes = require('./routes/user');
const roomsRoutes = require('./routes/rooms');

const app = express();

mongoose
	.connect('mongodb://localhost:27017/find_and_reserve', {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log('Connected to database');
	})
	.catch(() => {
		console.log('Connection failed');
	});

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS'
	);
	next();
});

app.use('/api/properties', propertiesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomsRoutes);

module.exports = app;
