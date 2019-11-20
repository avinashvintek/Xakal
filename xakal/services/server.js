const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const xakalRoutes = express.Router();
const PORT = 4000;

let xakal = require('./xakal.model');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/xakal', { useNewUrlParser: true })
const connection = mongoose.connection;
connection.once('open', function () {
    console.log('MongoDB database connection established successfully')
})

xakalRoutes.route('/').get(function(req, res) {
    xakal.find(function(err, values) {
        if (err) {
            console.log(err);
        } else {
            res.json(values);
        }
    });
});

app.use('/students-portal', xakalRoutes)

app.listen(PORT, function () {
    console.log('Server is running on Port: ' + PORT)
})