const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const RemitAgent = require("../models/remit-agent-user");

router.post("/user/registration", (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then(hash => {
		const agent = new RemitAgent({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			username: req.body.username,
			password: hash,
			matchingPassword: this.password,
			email: req.body.email,
			agentId: req.body.agentId,
			roleId: req.body.roleId
		});
		agent
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

module.exports = router;
