const express = require('express');
var router = express.Router();
var { SemesterDetails } = require('../models/student-portal/semester-assessment.model.js');
var { InternalDetails } = require('../models/student-portal/internals-assessment.model.js');
var ObjectId = require('mongoose').Types.ObjectId;
router.get('/semesterdetail/:semester', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    let userID = req.query.userID ? req.query.userID.toUpperCase() : null;
    let filter = userID ? { semester: semester, userID: userID } : { semester: semester };
    SemesterDetails.find(filter, { _id: 0 }).then((eachOne) => {
        res.json(eachOne)
    })
});


router.get('/semesterdetail', (req, res) => {
    SemesterDetails.find({}, { _id: 0 }).then((eachOne) => {
        res.json(eachOne)
    })
});

router.get('/internaldetail/:semester', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    let userID = req.query.userID ? req.query.userID.toUpperCase() : null;
    let filter = userID ? { semester: semester, userID: userID } : { semester: semester }
    InternalDetails.find(filter, { _id: 0 }).then((eachOne) => {
        res.json(eachOne)
    })
});

router.get('/internaldetail', (req, res) => {
    InternalDetails.find(req.query, { }).then((eachOne) => {
        res.json(eachOne)
    })
});

router.put('/internaldetail/update/:id', (req, res) => {
    var marks;
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No record with id');
    }
    if (req.body.model === 'model 1') {
        marks = {
            semester: req.body.semester,
            course: req.body.course,
            uploadedBy: req.body.uploadedBy,
            uploadedDate: req.body.uploadedDate,
            model1: req.body.marksObtained,
        };
    } else if (req.body.model === 'model 2') {
        marks = {
            semester: req.body.semester,
            course: req.body.course,
            uploadedBy: req.body.uploadedBy,
            uploadedDate: req.body.uploadedDate,
            model2: req.body.marksObtained,
        };
    } else if (req.body.model === 'model 3') {
        marks = {
            semester: req.body.semester,
            course: req.body.course,
            uploadedBy: req.body.uploadedBy,
            uploadedDate: req.body.uploadedDate,
            model3: req.body.marksObtained,
            internals: req.body.internals
        };
    }
    var id = req.params.id;
    InternalDetails.findByIdAndUpdate(id, { $set: marks }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })
});
module.exports = router;