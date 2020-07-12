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
    Followers.find({ userID: userID }, { _id: 0 }).then((eachOne) => {
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

module.exports = router;