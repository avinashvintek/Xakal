const express = require('express');
var router = express.Router();
var { StaffLeave } = require('../models/staff-portal/attendance.js');

router.get('/staffleave', (req, res) => {
    let userID = req.query.userID ? req.query.userID.toUpperCase() : null;
    let filter = userID ? { month: req.query.month, userID: userID } : { month: req.query.month }
    StaffLeave.find(filter, { _id: 0 }).then((eachOne) => {
        res.json(eachOne)
    })
});

module.exports = router;