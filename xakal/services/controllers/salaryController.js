const express = require('express');
var router = express.Router();
var { SalaryDetails } = require('../models/staff-portal/salary.model.js');

router.get('/salarydetail', (req, res) => {
    SalaryDetails.find(req.params, { _id: 0 }).then((eachOne) => {
        res.json(eachOne)
    })
});

module.exports = router;