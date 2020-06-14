const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { DegreeCourseDetails } = require('../models/management-portal/course.js');

router.get('/', (req, res) => {
    DegreeCourseDetails.find({}, {}).then((eachOne) => {
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
        duration: req.body.duration,
        updatedBy: req.body.updatedBy,
        updatedDate: req.body.updatedDate,
        startingYear: req.body.startingYear,
        studentCapacity: req.body.studentCapacity,
    };
    var id = req.params.id;
    DegreeCourseDetails.findByIdAndUpdate(id, { $set: details }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })
});

module.exports = router;