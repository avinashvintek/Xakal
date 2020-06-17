const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Course } = require('../models/student-portal/course-selection.model.js');

router.get('/', (req, res) => {
    Course.find({}, {}).then((eachOne) => {
        res.json(eachOne)
    })
});


router.put('/update/:id', (req, res) => {
    var details;
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No record with id');
    }
    details = {
        course: req.body.course,
        semester: req.body.semester,
        updatedBy: req.body.updatedBy,
        updatedDate: req.body.updatedDate,
        department: req.body.department,
        degree: req.body.degree,
    };
    var id = req.params.id;
    Course.findByIdAndUpdate(id, { $set: details }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })
});

router.post('/', (req, res) => {
    var prdt = new Course({
        course: req.body.course,
        semester: req.body.semester,
        updatedBy: req.body.updatedBy,
        updatedDate: req.body.updatedDate,
        department: req.body.department,
        degree: req.body.degree,
    });
    prdt.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('error in controller')
        }
    });

});

module.exports = router;