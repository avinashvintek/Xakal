const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { StudentDetails } = require('../models/student-portal/student.model.js');

router.get('/:userID', (req, res) => {
    let userID = req.params.userID.toUpperCase();
    StudentDetails.findOne({ userID: userID }, { _id: 0, }).then((eachOne) => {
        res.json(eachOne)
    })
});

router.get('/', (req, res) => {
    StudentDetails.find({}, {}).then((eachOne) => {
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
        course: req.body.course,
        uploadedBy: req.body.uploadedBy,
        uploadedDate: req.body.uploadedDate,
        branch: req.body.branch,
        email: req.body.email,
        bloodGroup: req.body.bloodGroup,
        contact: req.body.contact,
        emergencyContact: req.body.emergencyContact,
        parentName: req.body.parentName,
        admissionDate: req.body.admissionDate
    };
    var id = req.params.id;
    StudentDetails.findByIdAndUpdate(id, { $set: details }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })
});
module.exports = router;