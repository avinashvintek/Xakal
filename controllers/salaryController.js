const express = require('express');
var router = express.Router();
var { SalaryDetails } = require('../models/staff-portal/salary.model.js');

router.get('/salarydetail', (req, res) => {
    const filter = { salaryYear: req.query.salaryYear, salaryMonth: req.query.salaryMonth, userID: req.query.userID };
    SalaryDetails.find(filter, { _id: 0 }).then((eachOne) => {
        res.json(eachOne)
    })
});

module.exports = router;