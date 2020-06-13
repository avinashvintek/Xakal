import React, { Component } from 'react';
import '../../styles/dashboard.css';
import axios from 'axios';
import profileImage from '../../images/userProfile.jpg';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentDetails: [],
            semester1: 0,
            semester2: 0,
            semester3: 0,
            semester4: 0,
            semester5: 0,
            semester6: 0,
            semester7: 0,
            semester8: 0,
            lastSemester: 0,
            counter: 0,
            cgpa: 0
        };
        this.baseState = this.state;
    }

    componentDidMount() {
        this.fetchStudentDetails();
    }

    fetchStudentDetails() {
        const userID = this.props.location.userID;
        if (userID) {
            axios.get(`http://localhost:4000/xakal/studentdetail/${userID.userID}`)
                .then((response) => {
                    this.fetchGPA();
                    this.setState({ studentDetails: response.data });
                });
        }
    }

    fetchGPA() {
        axios.get(`http://localhost:4000/xakal/assessment/semesterdetail`)
            .then((response) => {
                this.calculateGPA(response.data);
            });
    }

    //gpa = (grades*credits) / credits
    calculateGPA(response) {
        let responseArray = [];
        responseArray = response.filter((data) => data.semester === 'semester 1');
        this.calculateSemesterWise(responseArray, 'semester1');
        responseArray = response.filter((data) => data.semester === 'semester 2');
        this.calculateSemesterWise(responseArray, 'semester2');
        responseArray = response.filter((data) => data.semester === 'semester 3');
        this.calculateSemesterWise(responseArray, 'semester3');
        responseArray = response.filter((data) => data.semester === 'semester 4');
        this.calculateSemesterWise(responseArray, 'semester4');
        responseArray = response.filter((data) => data.semester === 'semester 5');
        this.calculateSemesterWise(responseArray, 'semester5');
        responseArray = response.filter((data) => data.semester === 'semester 6');
        this.calculateSemesterWise(responseArray, 'semester6');
        responseArray = response.filter((data) => data.semester === 'semester 7');
        this.calculateSemesterWise(responseArray, 'semester7');
        responseArray = response.filter((data) => data.semester === 'semester 8');
        this.calculateSemesterWise(responseArray, 'semester8');
        this.calculateCGPA();
    }

    calculateSemesterWise(responseArray, stateValue) {
        let obj = {};
        let totalCredit = 0, gradeCredit = 0;
        if (responseArray && responseArray.length) {
            responseArray.forEach((singleResponse) => {
                gradeCredit = gradeCredit + (singleResponse.gradeValue * singleResponse.credit);
                totalCredit = totalCredit + singleResponse.credit;
            });
            const gpa = gradeCredit / totalCredit;
            const percentage = gpa * 10;
            obj[stateValue] = percentage;
            const counter = this.state.counter + 1;
            this.setState({ lastSemester: gpa, counter: counter })
            this.setState(obj);
        }
    }

    calculateCGPA() {
        const cgpa = (this.state.semester1 + this.state.semester2 + this.state.semester3 + this.state.semester4 + this.state.semester5 + this.state.semester6 + this.state.semester7 + this.state.semester8) / (this.state.counter * 10);
        this.setState({ cgpa: cgpa })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20">Dashboard</h1>
                    {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Change password</a> */}
                </div>
                <div className="row">
                    <div className="col-xl-4 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Login ID</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.studentDetails.userID}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Last semester GPA</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.lastSemester} (out of 10)</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">CGPA</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.cgpa} (out of 10)</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-8 col-lg-7">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Profile</h6>
                            </div>
                            <div className="card-body">
                                <div className="chart-area">
                                    <div className="profile">
                                        <ul className="profile-list list-unstyled">
                                            <li><i className="fa fa-bookmark m-r-10"></i>Name:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Course:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Branch:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Blood group:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Contact number:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Emergency contact number:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Email ID:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Parents name:</li>
                                        </ul>
                                        <ul className="list-unstyled">
                                            <li>{this.state.studentDetails.name}</li>
                                            <li>{this.state.studentDetails.course}</li>
                                            <li>{this.state.studentDetails.branch}</li>
                                            <li>{this.state.studentDetails.bloodGroup}</li>
                                            <li>{this.state.studentDetails.contact}</li>
                                            <li>{this.state.studentDetails.emergencyContact}</li>
                                            <li>{this.state.studentDetails.email}</li>
                                            <li>{this.state.studentDetails.parentName}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">About Me</h6>
                            </div>
                            <div className="card-body">
                                <div className="chart-area">
                                    <div className="chart-pie pt-4 pb-2">
                                        <img src={profileImage} alt="Girl in a jacket" width="100%" height="120%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Academic Performance</h6>
                            </div>
                            <div className="card-body">
                                <h4 className="small font-weight-bold">Semester 1<span className="float-right">{this.state.semester1}%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: this.state.semester1 + '%' }} ></div>
                                </div>
                                <h4 className="small font-weight-bold">Semester 2 <span className="float-right">{this.state.semester2}%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: this.state.semester2 + '%' }}></div>
                                </div>
                                <h4 className="small font-weight-bold">Semester 3 <span className="float-right">{this.state.semester3}%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar" role="progressbar" style={{ width: this.state.semester3 + '%' }}></div>
                                </div>
                                <h4 className="small font-weight-bold">Semester 4<span className="float-right">{this.state.semester4}%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar bg-info" role="progressbar" style={{ width: this.state.semester4 + '%' }}></div>
                                </div>
                                <h4 className="small font-weight-bold">Semester 5<span className="float-right">{this.state.semester5}%</span></h4>
                                <div className="progress  mb-4">
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: this.state.semester5 + '%' }}></div>
                                </div>
                                <h4 className="small font-weight-bold">Semester 6<span className="float-right">{this.state.semester6}%</span></h4>
                                <div className="progress  mb-4">
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: this.state.semester6 + '%' }}></div>
                                </div>
                                <h4 className="small font-weight-bold">Semester 7<span className="float-right">{this.state.semester7}%</span></h4>
                                <div className="progress  mb-4">
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: this.state.semester7 + '%' }}></div>
                                </div>
                                <h4 className="small font-weight-bold">Semester 8<span className="float-right">{this.state.semester8}%</span></h4>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: this.state.semester8 + '%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Other Certifications</h6>
                            </div>
                            <div className="card-body">
                                <div className="text-center">
                                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 25 + 'rem' }} src="img/undraw_posting_photo.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Awards</h6>
                            </div>
                            <div className="card-body">
                                <div className="text-center">
                                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 25 + 'rem' }} src="img/undraw_posting_photo.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;