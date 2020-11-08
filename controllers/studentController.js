const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { StudentDetails } = require('../models/student-portal/student.model.js');

router.get('/:userID', (req, res) => {
    let userID = req.params.userID.toUpperCase();
    StudentDetails.findOne({ userID: userID }, {}).then((eachOne) => {
        res.json(eachOne)
    })
});

router.get('/department/:departmentID', (req, res) => {
    let departmentID = req.params.departmentID;
    StudentDetails.find({ branch: departmentID }, {}).then((eachOne) => {
        res.json(eachOne)
    })
});

router.get('/', (req, res) => {
    StudentDetails.find({}, {}).then((eachOne) => {
        res.json(eachOne)
    })
});

router.get('/yearwise/:year/:departmentID', (req, res) => {
    let admissionYear = req.params.year;
    let departmentID = req.params.departmentID;
    StudentDetails.find({ admissionYear: admissionYear, branch: departmentID }, {}).then((eachOne) => {
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
        admissionDate: req.body.admissionDate,
        admissionYear: req.body.admissionYear
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

router.post('/', (req, res) => {
    var prdt = new StudentDetails({
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
        admissionDate: req.body.admissionDate,
        userID: '13IT001',
        admissionYear: req.body.admissionYear
    });
    prdt.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('error in controller')
        }
    });

});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No record with id');
    }
    StudentDetails.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in employee')
        }
    })
});
module.exports = router;