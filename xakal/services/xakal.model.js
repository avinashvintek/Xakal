const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Xakal = new Schema({
    semester: {
        type: String
    },
    course: {
        type: String
    }
});

module.exports = mongoose.model('Xakal', Xakal)