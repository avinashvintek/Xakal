const express = require('express');
var router = express.Router();
var { Followers } = require('../models/forum/followers-model');
router.get('/', (req, res) => {
    Followers.find({}, {}).then((eachOne) => {
        res.json(eachOne)
    })
});

router.get('/:id', (req, res) => {
    let userID = req.params.id;
    Followers.find({ userID: userID, isDeleted: false }, {}).then((eachOne) => {
        res.json(eachOne)
    })
});

router.post('/', (req, res) => {
    var prdt = new Followers({
        followerUserID: req.body.followerUserID.toUpperCase(),
        userID: req.body.userID.toUpperCase(),
        updatedDate: req.body.updatedDate,
        isDeleted: false
    });
    prdt.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('error in controller')
        }
    });

});

router.put('/update/:id', (req, res) => {
    var id = req.params.id;
    Followers.findOneAndUpdate({ _id: id }, { "isDeleted": req.body.isDeleted, "updatedDate": req.body.updatedDate }, { new: true, }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in controller', err)
        }
    })

});

module.exports = router;