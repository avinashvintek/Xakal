import React, { Component } from 'react';
import '../../styles/dashboard.css';
import axios from 'axios';
import profileImage from '../../images/userProfile.jpg';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentDetails: []
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
                    this.setState({ studentDetails: response.data });
                });
        }
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800 m-t-20">Dashboard</h1>
                    {/* <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Change password</a> */}
                </div>
                <div class="row">
                    <div class="col-xl-4 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Login ID</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{this.state.studentDetails.userID}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Last semester GPA</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">8.5 (out of 10)</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">cGPA</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">8.2 (out of 10)</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-8 col-lg-7">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">Profile</h6>
                            </div>
                            <div class="card-body">
                                <div class="chart-area">
                                    <div class="profile">
                                        <ul class="profile-list list-unstyled">
                                            <li><i class="fa fa-bookmark m-r-10"></i>Name:</li>
                                            <li><i class="fa fa-bookmark m-r-10"></i>Course:</li>
                                            <li><i class="fa fa-bookmark m-r-10"></i>Branch:</li>
                                            <li><i class="fa fa-bookmark m-r-10"></i>Blood group:</li>
                                            <li><i class="fa fa-bookmark m-r-10"></i>Contact number:</li>
                                            <li><i class="fa fa-bookmark m-r-10"></i>Emergency contact number:</li>
                                            <li><i class="fa fa-bookmark m-r-10"></i>Email ID:</li>
                                            <li><i class="fa fa-bookmark m-r-10"></i>Parents name:</li>
                                        </ul>
                                        <ul class="list-unstyled">
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
                    <div class="col-xl-4 col-lg-5">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">About Me</h6>
                            </div>
                            <div class="card-body">
                                <div class="chart-area">
                                    <div class="chart-pie pt-4 pb-2">
                                        <img src={profileImage} alt="Girl in a jacket" width="100%" height="120%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 mb-4">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Academic Performance</h6>
                            </div>
                            <div class="card-body">
                                <h4 class="small font-weight-bold">Semester 1<span class="float-right">20%</span></h4>
                                <div class="progress mb-4">
                                    <div class="progress-bar bg-danger" role="progressbar" style={{ width: 20 + '%' }} ></div>
                                </div>
                                <h4 class="small font-weight-bold">Semester 2 <span class="float-right">40%</span></h4>
                                <div class="progress mb-4">
                                    <div class="progress-bar bg-warning" role="progressbar" style={{ width: 40 + '%' }}></div>
                                </div>
                                <h4 class="small font-weight-bold">Semester 3 <span class="float-right">60%</span></h4>
                                <div class="progress mb-4">
                                    <div class="progress-bar" role="progressbar" style={{ width: 60 + '%' }}></div>
                                </div>
                                <h4 class="small font-weight-bold">Semester 4<span class="float-right">80%</span></h4>
                                <div class="progress mb-4">
                                    <div class="progress-bar bg-info" role="progressbar" style={{ width: 80 + '%' }}></div>
                                </div>
                                <h4 class="small font-weight-bold">Semester 5<span class="float-right">Complete!</span></h4>
                                <div class="progress  mb-4">
                                    <div class="progress-bar bg-success" role="progressbar" style={{ width: 100 + '%' }}></div>
                                </div>
                                <h4 class="small font-weight-bold">Semester 6<span class="float-right">Complete!</span></h4>
                                <div class="progress  mb-4">
                                    <div class="progress-bar bg-success" role="progressbar" style={{ width: 100 + '%' }}></div>
                                </div>
                                <h4 class="small font-weight-bold">Semester 7<span class="float-right">Complete!</span></h4>
                                <div class="progress  mb-4">
                                    <div class="progress-bar bg-success" role="progressbar" style={{ width: 100 + '%' }}></div>
                                </div>
                                <h4 class="small font-weight-bold">Semester 8<span class="float-right">Complete!</span></h4>
                                <div class="progress">
                                    <div class="progress-bar bg-success" role="progressbar" style={{ width: 100 + '%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 mb-4">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Other Certifications</h6>
                            </div>
                            <div class="card-body">
                                <div class="text-center">
                                    <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 25 + 'rem' }} src="img/undraw_posting_photo.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Awards</h6>
                            </div>
                            <div class="card-body">
                                <div class="text-center">
                                    <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 25 + 'rem' }} src="img/undraw_posting_photo.svg" alt="" />
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