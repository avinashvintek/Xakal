const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { CollegeDetails } = require('../models/management-portal/college.js');


router.get('/', (req, res) => {
    CollegeDetails.find({}, {}).then((eachOne) => {
        res.json(eachOne)
    })
});

router.put('/update/:id', (req, res) => {
    var details;
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No record with id');
    }
    details = {
        name: req.body.name,
        collegeCode: req.body.collegeCode,
        updatedBy: req.body.updatedBy,
        updatedDate: req.body.updatedDate,
        address: req.body.address,
        email: req.body.email,
        awards: req.body.awards,
        contact: req.body.contact,
    };
    var id = req.params.id;
    CollegeDetails.findByIdAndUpdate(id, { $set: details }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })
});

module.exports = router;