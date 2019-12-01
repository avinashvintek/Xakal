const express = require('express');
var router = express.Router();
var { SemesterDetails } = require('../models/student-portal/semester-assessment.model.js');
var { InternalDetails } = require('../models/student-portal/internals-assessment.model.js');

router.get('/semesterdetail/:semester', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    SemesterDetails.find({ semester: semester }, { _id: 0, course: 1, grade: 1, result: 1 }).then((eachOne) => {
        res.json(eachOne)
    })
});


router.get('/semesterdetail', (req, res) => {
    SemesterDetails.find({ }, { _id: 0 }).then((eachOne) => {
        res.json(eachOne)
    })
});

router.get('/internaldetail/:semester', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    InternalDetails.find({ semester: semester }, { _id: 0, course: 1, internals: 1, model1: 1, model2: 1, model3: 1 }).then((eachOne) => {
        res.json(eachOne)
    })
});
module.exports = router;