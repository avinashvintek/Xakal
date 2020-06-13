const express = require('express');
var router = express.Router();
var { Payment } = require('../models/student-portal/payment.model.js');

router.get('/:semester', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    let userID = req.query.userID ? req.query.userID.toUpperCase() : null;
    let filter = userID ? { semester: semester, userID: userID } : { semester: semester }
    Payment.find(filter, { _id: 0 }).then((eachOne) => {
        res.json(eachOne)
    })
});

module.exports = router;