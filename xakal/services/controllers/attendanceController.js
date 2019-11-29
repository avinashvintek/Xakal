const express = require('express');
var router = express.Router();
var { StudentLeave } = require('../models/student-portal/attendance.model.js');

router.get('/studentleave/:semester', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    StudentLeave.find({ semester: semester }, { _id: 0, leaveDate: 1, reason: 1 }).then((eachOne) => {
        res.json(eachOne)
    })
});

module.exports = router;