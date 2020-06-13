const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { DepartmentDetails } = require('../models/management-portal/department.js');

router.get('/', (req, res) => {
    DepartmentDetails.find({}, {}).then((eachOne) => {
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
        headOfDepartment: req.body.headOfDepartment,
        updatedBy: req.body.uploadedBy,
        updatedDate: req.body.uploadedDate,
        email: req.body.email,
        contact: req.body.contact,
        startingYear: req.body.startingYear,
        studentCapacity: req.body.studentCapacity,
    };
    var id = req.params.id;
    DepartmentDetails.findByIdAndUpdate(id, { $set: details }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })
});

module.exports = router;