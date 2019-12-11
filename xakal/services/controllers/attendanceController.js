const express = require('express');
var router = express.Router();
var { StudentLeave } = require('../models/student-portal/attendance.model.js');

router.get('/studentleave/:semester', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    let userID = req.query.userID ? req.query.userID.toUpperCase() : null;
    let filter = userID ? { semester: semester, userID: userID } : { semester: semester }
    StudentLeave.find(filter, { _id: 0 }).then((eachOne) => {
        res.json(eachOne)
    })
});

module.exports = router;