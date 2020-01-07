const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { StaffDetails } = require('../models/staff-portal/staff.model.js');

router.get('/:userID', (req, res) => {
    let userID = req.params.userID.toUpperCase();
    StaffDetails.findOne({ userID: userID }, { _id: 0, }).then((eachOne) => {
        res.json(eachOne)
    })
});

router.get('/', (req, res) => {
    StaffDetails.find({}, {}).then((eachOne) => {
        res.json(eachOne)
    })
});

router.put('/update/:id', (req, res) => {
    var details;
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No record with id');
    }
    details = {
        name: req.body.name,
        qualification: req.body.qualification,
        uploadedBy: req.body.uploadedBy,
        uploadedDate: req.body.uploadedDate,
        designation: req.body.designation,
        email: req.body.email,
        bloodGroup: req.body.bloodGroup,
        contact: req.body.contact,
        emergencyContact: req.body.emergencyContact,
        parentSpouse: req.body.parentSpouse,
    };
    var id = req.params.id;
    StaffDetails.findByIdAndUpdate(id, { $set: details }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })
});
module.exports = router;