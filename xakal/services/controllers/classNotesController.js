const express = require('express');
var router = express.Router();
var { Course } = require('../models/student-portal/course-selection.model.js');
var { ClassNote } = require('../models/student-portal/class-notes.model.js');

router.get('/course/:semester', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    Course.find({ semester: semester }, { _id: 0, course: 1, semester: 1 }).then((eachOne) => {
        res.json(eachOne)
    })
});

//localhost:4000/xakal/class-notes/classnote/semester 1/OS
router.get('/classnote/:semester/:course', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    let course = req.params.course.toLowerCase();
    ClassNote.find({ semester: semester, course: course }).then((eachOne) => {
        res.json(eachOne)
    })
});
module.exports = router;