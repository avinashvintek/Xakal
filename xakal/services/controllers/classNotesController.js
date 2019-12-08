const express = require('express');
var router = express.Router();
var { Course } = require('../models/student-portal/course-selection.model.js');
var { ClassNote } = require('../models/student-portal/class-notes.model.js');
var { QuestionPaper } = require('../models/student-portal/question-paper.model.js');
var { XakalNote } = require('../models/student-portal/xakal-notes.model.js');

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

//localhost:4000/xakal/class-notes/xakalnote/semester 1/OS
router.get('/xakalnote/:semester/:course', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    let course = req.params.course.toLowerCase();
    XakalNote.find({ semester: semester, course: course }).then((eachOne) => {
        res.json(eachOne)
    })
});

//localhost:4000/xakal/class-notes/questionpaper/semester 1/OS
router.get('/questionpaper/:semester/:course', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    let course = req.params.course.toLowerCase();
    QuestionPaper.find({ semester: semester, course: course }).then((eachOne) => {
        res.json(eachOne)
    })
});

router.post('/questionpaper', function (req, res) {
    var questionPaper = new QuestionPaper({
        semester: req.body.semester.toLowerCase(),
        course: req.body.course.toLowerCase(),
        description: req.body.description,
        uploadedBy: req.body.uploadedBy,
        uploadedFile: req.body.uploadedFile,
        uploadedDate: req.body.uploadedDate,
    });
    questionPaper.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('error in controller', err)
        }
    });

});
module.exports = router;