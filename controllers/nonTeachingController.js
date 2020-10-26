const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { NonTeachingDetails } = require('../models/non-teaching-portal/nonTeaching.model.js');

router.get('/:userID', (req, res) => {
    let userID = req.params.userID.toUpperCase();
    NonTeachingDetails.findOne({ userID: userID }, {}).then((eachOne) => {
        res.json(eachOne)
    })
});

router.get('/department/:departmentID', (req, res) => {
    let departmentID = req.params.departmentID.toUpperCase();
    NonTeachingDetails.find({ departmentName: departmentID }, { _id: 0, }).then((eachOne) => {
        res.json(eachOne)
    })
});

router.get('/', (req, res) => {
    NonTeachingDetails.find({}, {}).then((eachOne) => {
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
        qualification: req.body.qualification,
        uploadedBy: req.body.uploadedBy,
        uploadedDate: req.body.uploadedDate,
        designation: req.body.designation,
        email: req.body.email,
        bloodGroup: req.body.bloodGroup,
        contact: req.body.contact,
        emergencyContact: req.body.emergencyContact,
        parentSpouse: req.body.parentSpouse,
        joiningDate: req.body.joiningDate,
        departmentName: req.body.departmentName
    };
    var id = req.params.id;
    NonTeachingDetails.findByIdAndUpdate(id, { $set: details }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })
});

router.post('/', (req, res) => {
    var prdt = new NonTeachingDetails({
        name: req.body.name,
        qualification: req.body.qualification,
        uploadedBy: req.body.uploadedBy,
        uploadedDate: req.body.uploadedDate,
        designation: req.body.designation,
        email: req.body.email,
        bloodGroup: req.body.bloodGroup,
        contact: req.body.contact,
        emergencyContact: req.body.emergencyContact,
        parentSpouse: req.body.parentSpouse,
        joiningDate: req.body.joiningDate,
        departmentName: req.body.departmentName,
        userID: 'Sample ID'
    });
    prdt.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('error in controller')
        }
    });

});


router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No record with id');
    }
    NonTeachingDetails.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in employee')
        }
    })
});

router.post('/upload', (req, res) => {
    var files = req.files.salaryReceipt;
    const userIDDirectory = 'client/public/' + req.body.userID;
    const yearDirectory = 'client/public/' + req.body.userID + '/' + req.body.salaryYear;
    const monthDirectory = 'client/public/' + req.body.userID + '/' + req.body.salaryYear + '/' + req.body.salaryMonth
    if (!fs.existsSync(userIDDirectory)) {
        fs.mkdirSync(userIDDirectory);
        fs.mkdirSync(yearDirectory);
        fs.mkdirSync(monthDirectory)
    } else if (!fs.existsSync(yearDirectory)) {
        fs.mkdirSync(yearDirectory);
        fs.mkdirSync(monthDirectory);
    } else if (!fs.existsSync(monthDirectory)) {
        fs.mkdirSync(monthDirectory);
    }
    files.mv(monthDirectory + '/' + files.name, function (err) {
        if (err) {
            res.json("File not uploaded")
        } else {
            res.json = ("Inserted successfully")
        }
    })
})
module.exports = router;