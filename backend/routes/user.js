const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then(hash => {
		const user = new User({
			email: req.body.email,
			name: req.body.name,
			password: hash
		});
		user
			.save()
			.then(result => {
				res.status(201).json({
					message: "User created",
					result: result
				});
			})
			.catch(err => {
				res.status(201).json({
					error: err
				});
			});
	});
});

router.post("/login", (req, res, next) => {
	let fetchedUser;
	User.findOne({
		email: req.body.email
	})
		.then(user => {
			if (!user) {
				return res.status(200).json({ error: "Authorisation failed" });
			}
			fetchedUser = user;
			return bcrypt.compare(req.body.password, user.password);
		})
		.then(result => {
			if (!result) {
				return res.status(200).json({ error: "Authorisation failed" });
			}
			const token = jwt.sign(
				{
					email: fetchedUser.email,
					userId: fetchedUser._id
				},
				"secret_this_should_be_longer",
				{
					expiresIn: "1h"
				}
			);
			res.status(200).json({
				token: token,
				expiresIn: 3600,
				userId: fetchedUser._id
			});
		})
		.catch(err => {
			return res.status(401).json({
				message: "Authorisation failed"
			});
		});
});

router.get("/:id", (req, res, next) => {
	User.findById(req.params.id).then(user => {
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({
				message: "Property not found!"
			});
		}
	});
});

router.get("", (req, res, next) => {
	User.find().then(documents => {
		res.status(200).json({
			message: "GET Success",
			users: documents
		});
	});
});

router.delete("/:id", (req, res, next) => {
	User.deleteOne({
		_id: req.params.id
	}).then(result => {
		res.status(200).json({
			message: "Room deleted!"
		});
	});
});

module.exports = router;
