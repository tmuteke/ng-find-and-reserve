const express = require("express");
const Room = require("../models/room");
const router = express.Router();

router.post("", (req, res, next) => {
	const room = new Room({
		roomHostel: req.body.roomHostel,
		roomNumber: req.body.roomNumber,
		roomFee: req.body.roomFee,
		genderAccommodated: req.body.genderAccommodated,
		amenities: req.body.amenities,
		spaces: req.body.spaces,
		policies: req.body.policies,
		student: req.body.student,
		isReserved: req.body.isReserved
	});
	room.save().then(createdRoom => {
		res.status(201).json({
			message: "POST Success",
			roomId: createdRoom._id
		});
	});
});

router.get("", (req, res, next) => {
	Room.find().then(documents => {
		res.status(200).json({
			message: "GET Success",
			rooms: documents
		});
	});
});

router.get("/:id", (req, res, next) => {
	Room.findById(req.params.id).then(room => {
		if (room) {
			res.status(200).json(room);
		} else {
			res.status(404).json({
				message: "Room not found!"
			});
		}
	});
});

router.delete("/:id", (req, res, next) => {
	Room.deleteOne({
		_id: req.params.id
	}).then(result => {
		res.status(200).json({
			message: "Room deleted!"
		});
	});
});

router.put("/:id", (req, res, next) => {
	const room = new Room({
		_id: req.body.id,
		roomHostel: req.body.roomHostel,
		roomNumber: req.body.roomNumber,
		roomFee: req.body.roomFee,
		genderAccommodated: req.body.genderAccommodated,
		amenities: req.body.amenities,
		spaces: req.body.spaces,
		policies: req.body.policies,
		student: req.body.student,
		isReserved: req.body.isReserved
	});
	Room.updateOne({ _id: req.params.id }, room).then(result => {
		res.status(200).json({
			message: "PUT Success"
		});
	});
});

module.exports = router;
