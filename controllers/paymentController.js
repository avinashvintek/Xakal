const express = require('express');
var router = express.Router();
var { Payment } = require('../models/student-portal/payment.model.js');
var fs = require('fs');

router.get('/:semester', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    let userID = req.query.userID ? req.query.userID.toUpperCase() : null;
    let filter = userID ? { semester: semester, userID: userID } : { semester: semester }
    Payment.find(filter, { _id: 0 }).then((eachOne) => {
        res.json(eachOne)
    })
});

router.post('/', (req, res) => {
    var prdt = new Payment({
        semester: req.body.semester,
        description: req.body.description,
        userID: req.body.userID,
        uploadedReceipt: req.files.uploadedReceipt.name,
        paymentDate: req.body.paymentDate,
    });
    prdt.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('error in controller')
        }
    });

});

router.post('/upload', (req, res) => {
    var files = req.files.uploadedReceipt;
    const userIDDirectory = 'client/public/' + req.body.userID;
    const semesterDirectory = 'client/public/' + req.body.userID + '/' + req.body.semester;
    if (!fs.existsSync(userIDDirectory)) {
        fs.mkdirSync(userIDDirectory);
        fs.mkdirSync(semesterDirectory);
    } else if (!fs.existsSync(semesterDirectory)) {
        fs.mkdirSync(semesterDirectory);
    }
    files.mv(semesterDirectory + '/' + files.name), function (err) {
        if (err) {
            res.json("File not uploaded")
        } else {
            res.json = ("Inserted successfully")
        }
    }
})

module.exports = router;