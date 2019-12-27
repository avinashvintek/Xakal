const express = require('express');
var router = express.Router();
var { StaffDetails } = require('../models/staff-portal/staff.model.js');

router.get('/:userID', (req, res) => {
    let userID = req.params.userID.toUpperCase();
    StaffDetails.findOne({ userID: userID }, { _id: 0, }).then((eachOne) => {
        res.json(eachOne)
    })
});

module.exports = router;