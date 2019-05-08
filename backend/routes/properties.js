const express = require("express");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const checkSuperuserAuth = require("../middleware/check-superuser-auth");
const Property = require("../models/property");
const router = express.Router();
const MIME_TYPE_MAP = {
	"image/png": "png",
	"image/jpeg": "jpg",
	"image/jpg": "jpg"
};

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		const isValid = MIME_TYPE_MAP[file.mimeType];
// 		let err = new Error("Invalid mime type");
// 		if (isValid) {
// 			err = null;
// 		}
// 		cb(err, "backend/img");
// 	},
// 	filename: (req, file, cb) => {
// 		const name = file.originalname.toLowerCase().split(' ').join('_');
// 		const ext = MIME_TYPE_MAP[file.mimeType];
// 		cb(null, name + "-" + Date.now() + "." + ext);
// 	}
// });

router.post("", checkAuth, (req, res, next) => {
	const property = new Property({
		landlord: req.body.landlord,
		address: req.body.address,
		apartmentType: req.body.apartmentType,
		roomType: req.body.roomType,
		isDedicatedSetup: req.body.isDedicatedSetup,
		genderAccommodated: req.body.genderAccommodated,
		numberOfStudents: req.body.numberOfStudents,
		numberOfRooms: req.body.numberOfRooms,
		numberOfBathrooms: req.body.numberOfBathrooms,
		description: req.body.description,
		rent: req.body.rent,
		rating: 0,
		reviews: 0,
		amenities: req.body.amenities,
		spaces: req.body.spaces,
		policies: req.body.policies,
		creator: req.userData.userId,
		student: req.body.student,
		reports: []
	});
	property.save().then(createdProperty => {
		res.status(201).json({
			message: "POST Success",
			propertyId: createdProperty._id
		});
	});
});

router.get("", (req, res, next) => {
	Property.find().then(documents => {
		res.status(200).json({
			message: "GET Success",
			properties: documents
		});
	});
});

router.get("/:id", (req, res, next) => {
	Property.findById(req.params.id).then(property => {
		if (property) {
			res.status(200).json(property);
		} else {
			res.status(404).json({
				message: "Property not found!"
			});
		}
	});
});

router.put("/:id", (req, res, next) => {
	const property = new Property({
		_id: req.body.id,
		landlord: req.body.landlord,
		address: req.body.address,
		apartmentType: req.body.apartmentType,
		roomType: req.body.roomType,
		isDedicatedSetup: req.body.isDedicatedSetup,
		genderAccommodated: req.body.genderAccommodated,
		numberOfStudents: req.body.numberOfStudents,
		numberOfRooms: req.body.numberOfRooms,
		numberOfBathrooms: req.body.numberOfBathrooms,
		description: req.body.description,
		rent: req.body.rent,
		rating: req.body.rating,
		reviews: req.body.reviews,
		amenities: req.body.amenities,
		spaces: req.body.spaces,
		policies: req.body.policies,
		// creator: req.userData.userId,
		student: req.body.student,
		isReserved: req.body.isReserved,
		reports: req.body.reports
	});
	Property.updateOne({ _id: req.params.id }, property).then(result => {
		res.status(200).json({
			message: "PUT Success"
		});
	});
});

router.delete("/:id", (req, res, next) => {
	Property.deleteOne({
		_id: req.params.id
	}).then(result => {
		res.status(200).json({
			message: "Post deleted!"
		});
	});
});

module.exports = router;
