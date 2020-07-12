const express = require('express');
var router = express.Router();
var { Followings } = require('../models/forum/followings-model');
router.get('/', (req, res) => {
    Followings.find({}, {}).then((eachOne) => {
        res.json(eachOne)
    })
});

router.get('/:id', (req, res) => {
    let userID = req.params.id;
    Followings.find({ userID: userID }, { _id: 0 }).then((eachOne) => {
        res.json(eachOne)
    })
    // User.find({}, { userID: req.params.id }).then((eachOne) => {
    //     res.json(eachOne)
    // })
});

router.post('/', (req, res) => {
    var prdt = new Followings({
        followedUserID: req.body.followedUserID.toUpperCase(),
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