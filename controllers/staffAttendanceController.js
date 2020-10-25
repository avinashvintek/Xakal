const express = require('express');
var router = express.Router();
var { StaffLeave } = require('../models/staff-portal/attendance.js');

router.get('/staffleave', (req, res) => {
    let userID = req.query.userID ? req.query.userID.toUpperCase() : null;
    let filter = userID ? { month: req.query.month, userID: userID, year: req.query.year, isCancelled: false }
        : { month: req.query.month, year: req.query.year, isCancelled: false }
    StaffLeave.find(filter, {}).then((eachOne) => {
        res.json(eachOne)
    })
});

router.post('/staffleave', (req, res) => {
    var prdt = new StaffLeave({
        month: req.body.month,
        year: req.body.year,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        uploadedDate: req.body.uploadedDate,
        reason: req.body.reason,
        userID: req.body.userID,
        isCancelled: false,
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
    StaffLeave.findOneAndUpdate({ _id: id }, { "isCancelled": true }, { new: true, }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })
});

module.exports = router;