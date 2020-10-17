const express = require('express');
var fs = require('fs');
var router = express.Router();
var { SalaryDetails } = require('../models/staff-portal/salary.model.js');

router.get('/salarydetail', (req, res) => {
    const filter = { salaryYear: req.query.salaryYear, salaryMonth: req.query.salaryMonth, userID: req.query.userID };
    SalaryDetails.find(filter, { _id: 0 }).then((eachOne) => {
        res.json(eachOne)
    })
});


router.post('/', (req, res) => {
    var prdt = new SalaryDetails({
        salaryStatus: req.body.salaryStatus,
        creditedDate: req.body.creditedDate,
        userID: req.body.userID,
        salaryReceipt: req.files.salaryReceipt.name,
        salaryMonth: req.body.salaryMonth,
        salaryYear: req.body.salaryYear,
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
    const url = req.protocol + '://' + req.get('host')
    var files = req.files.salaryReceipt;
    console.log(req.body);
    const userIDDirectory = 'client/public/' + req.body.userID;
    const yearDirectory = 'client/public/' + req.body.userID + '/' + req.body.salaryYear;
    const monthDirectory = 'client/public/' + req.body.userID + '/' + req.body.salaryYear + '/' + req.body.salaryMonth
    if (!fs.existsSync(userIDDirectory)) {
        fs.mkdirSync(userIDDirectory);
        fs.mkdirSync(yearDirectory);
        fs.mkdirSync(monthDirectory)
    } else if (!fs.existsSync(yearDirectory)) {
        fs.mkdirSync(yearDirectory);
        fs.mkdirSync(monthDirectory);
    } else if (!fs.existsSync(monthDirectory)) {
        fs.mkdirSync(monthDirectory);
    }
    files.mv(monthDirectory + '/' + files.name), function (err) {
        if (err) {
            res.json("File not uploaded")
        } else {
            res.json = ("Inserted successfully")
        }
    }
})

module.exports = router;