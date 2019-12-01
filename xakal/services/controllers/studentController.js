const express = require('express');
var router = express.Router();
var { StudentDetails } = require('../models/student-portal/student.model.js');

router.get('/:userID', (req, res) => {
    let userID = req.params.userID.toUpperCase();
    StudentDetails.findOne({ userID: userID }, { _id: 0, }).then((eachOne) => {
        res.json(eachOne)
    })
});

module.exports = router;