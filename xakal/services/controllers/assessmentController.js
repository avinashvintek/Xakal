const express = require('express');
var router = express.Router();
var { SemesterDetails } = require('../models/student-portal/semester-assessment.model.js');
var { InternalDetails } = require('../models/student-portal/internals-assessment.model.js');

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
module.exports = router;