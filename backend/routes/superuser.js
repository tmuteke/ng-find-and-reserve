const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Superuser = require("../models/superuser");

router.post("/signup", (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then(hash => {
		const superuser = new Superuser({
			username: req.body.username,
			password: hash
		});
		superuser
			.save()
			.then(result => {
				res.status(201).json({
					message: "Superuser created",
					result: result
				});
				console.log(result);
			})
			.catch(err => {
				res.status(201).json({
					error: err
				});
			});
	});
});

router.post("/login", (req, res, next) => {
	let fetchedSuperuser;
	Superuser.findOne({
		username: req.body.username
	})
		.then(superuser => {
			if (!superuser) {
				return res.status(200).json({ error: "Authorisation failed" });
			}
			fetchedSuperuser = superuser;
			return bcrypt.compare(req.body.password, superuser.password);
		})
		.then(result => {
			if (!result) {
				return res.status(200).json({ error: "Authorisation failed" });
			}
			const token = jwt.sign(
				{
					username: fetchedSuperuser.username,
					userId: fetchedSuperuser._id
				},
				"secret_this_should_be_longer",
				{
					expiresIn: "1h"
				}
			);
			res.status(200).json({
				token: token,
				expiresIn: 3600,
				userId: fetchedSuperuser._id
			});
		})
		.catch(err => {
			return res.status(401).json({
				message: "Authorisation failed"
			});
		});
});

router.get("/:id", (req, res, next) => {
	Superuser.findById(req.params.id).then(user => {
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
	Superuser.find().then(documents => {
		res.status(200).json({
			message: "GET Success",
			users: documents
		});
	});
});

router.delete("/:id", (req, res, next) => {
	Superuser.deleteOne({
		_id: req.params.id
	}).then(result => {
		res.status(200).json({
			message: "Room deleted!"
		});
	});
});

module.exports = router;
