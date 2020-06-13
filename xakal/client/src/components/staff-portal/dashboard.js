import React, { Component } from 'react';
import '../../styles/dashboard.css';
import axios from 'axios';
import profileImage from '../../images/staffProfile.png';

class StaffDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffDetails: [],
        };
        this.baseState = this.state;
    }

    componentDidMount() {
        this.fetchStaffDetails();
    }

    fetchStaffDetails() {
        const userID = this.props.location.userID;
        if (userID) {
            axios.get(`http://localhost:4000/xakal/staffdetail/${userID.userID}`)
                .then((response) => {
                    this.setState({ staffDetails: response.data });
                });
        }
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
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.staffDetails.userID}</div>
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
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Last Semester Performance</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">50%</div>
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
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Overall Performance</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">80%</div>
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
                                            <li><i className="fa fa-bookmark m-r-10"></i>Designation:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Qualification:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Blood group:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Contact number:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Emergency contact number:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Email ID:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Parents / Spouse name:</li>
                                        </ul>
                                        <ul className="list-unstyled">
                                            <li>{this.state.staffDetails.name}</li>
                                            <li>{this.state.staffDetails.designation}</li>
                                            <li>{this.state.staffDetails.qualification}</li>
                                            <li>{this.state.staffDetails.bloodGroup}</li>
                                            <li>{this.state.staffDetails.contact}</li>
                                            <li>{this.state.staffDetails.emergencyContact}</li>
                                            <li>{this.state.staffDetails.email}</li>
                                            <li>{this.state.staffDetails.parentSpouse}</li>
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
            </div>
        )
    }
}

export default StaffDashboard;