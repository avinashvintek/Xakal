const express = require('express');
var router = express.Router();
var { StudentLeave } = require('../models/student-portal/attendance.model.js');

router.get('/studentleave/:semester', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    let userID = req.query.userID ? req.query.userID.toUpperCase() : null;
    let filter = userID ? { semester: semester, userID: userID, isCancelled: false } : { semester: semester, isCancelled: false }
    StudentLeave.find(filter, {}).then((eachOne) => {
        res.json(eachOne)
    })
});

router.post('/studentleave', (req, res) => {
    var prdt = new StudentLeave({
        semester: req.body.semester,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        uploadedDate: req.body.uploadedDate,
        reason: req.body.reason,
        userID: req.body.userID,
        isCancelled: false,
        type: req.body.type,
        uploadedBy: req.body.uploadedBy,
    });
    prdt.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('error in controller')
        }
    });
});

router.put('/cancelLeave/:id', (req, res) => {
    var id = req.params.id;
    StudentLeave.findOneAndUpdate({ _id: id }, { "isCancelled": true }, { new: true, }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })
});

module.exports = router;