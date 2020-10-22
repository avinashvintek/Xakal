const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
var loginController = require('./controllers/loginController.js');
var classNotesController = require('./controllers/classNotesController.js');
var assessmentController = require('./controllers/assessmentController.js');
var attendanceController = require('./controllers/attendanceController.js');
var paymentController = require('./controllers/paymentController.js');
var studentController = require('./controllers/studentController.js');
var salaryController = require('./controllers/salaryController.js');
var staffAttendance = require('./controllers/staffAttendanceController.js');
var staffController = require('./controllers/staffController.js');
var departmentController = require('./controllers/departmentController.js');
var degreeCourseController = require('./controllers/degreeCourseController.js');
var courseController = require('./controllers/courseController.js');
var collegeController = require('./controllers/collegeController.js');
var forumController = require('./controllers/forumController.js');
var commentsController = require('./controllers/commentsController.js');
var followerController = require('./controllers/followerController.js');
var followingController = require('./controllers/followingController.js');

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client/public'));
app.use(bodyParser.urlencoded({ extended: false }))
const url = process.env.MONGOLAB_URI || 'mongodb+srv://xakal:xakal@xakal1-bosb0.azure.mongodb.net/xakal?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true })
const connection = mongoose.connection;
connection.once('open', function () {
    console.log('MongoDB database connection established successfully')
})
app.use('/xakal', loginController);
app.use('/xakal/class-notes', classNotesController);
app.use('/xakal/assessment', assessmentController);
app.use('/xakal/attendance', attendanceController);
app.use('/xakal/payment', paymentController);
app.use('/xakal/studentdetail', studentController);
app.use('/xakal/salary', salaryController);
app.use('/xakal/staffattendance', staffAttendance);
app.use('/xakal/staffdetail', staffController);
app.use('/xakal/departmentdetail', departmentController);
app.use('/xakal/degreecoursedetail', degreeCourseController);
app.use('/xakal/coursedetail', courseController);
app.use('/xakal/collegedetail', collegeController);
app.use('/xakal/forumdetail', forumController);
app.use('/xakal/comments', commentsController);
app.use('/xakal/follower', followerController);
app.use('/xakal/following', followingController);

if (process.env.NODE_ENV === 'production') {
    // app.use(express.static("client/build"));
    app.use('/static', express.static(path.join(__dirname, 'client/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
    console.log('Server is running on Port: ' + PORT)
})