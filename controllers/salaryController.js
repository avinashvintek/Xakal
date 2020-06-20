const express = require('express');
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
        salaryReceipt: req.body.salaryReceipt,
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

module.exports = router;