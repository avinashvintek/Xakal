const express = require('express');
var router = express.Router();
var { Payment } = require('../models/student-portal/payment.model.js');

router.get('/:semester', (req, res) => {
    let semester = req.params.semester.toLowerCase();
    Payment.find({ semester: semester }, { _id: 0, description: 1, uploadedReceipt: 1, paymentDate: 1 }).then((eachOne) => {
        res.json(eachOne)
    })
});

module.exports = router;