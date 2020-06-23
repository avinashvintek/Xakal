import React, { Component } from 'react';
import '../../styles/dashboard.css';
import axios from 'axios';
import profileImage from '../../images/collegefacade.jpg';

class ManagementDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseDetails: [],
            studentDetails: [],
            collegeDetail: {},
            isEdit: false
        };
        this.baseState = this.state;
    }

    componentDidMount() {
        if (this.props && this.props.location && this.props.location.userID) {
            this.setState({ routerLink: this.props.location.pathname, userID: this.props.location.userID.userID })
        }
        this.fetchCollegeDetails();
        this.fetchStudentDetails();
        this.fetchCourseDetails();
    }

    /**
     * Fetches all students
     */
    fetchStudentDetails() {
        const userID = this.props.location.userID;
        if (userID) {
            axios.get(`/xakal/studentdetail`)
                .then((response) => {
                    this.setState({ studentDetails: response.data });
                });
        }
    }

    /**
     * Fetches all courses
     */
    fetchCourseDetails() {
        const userID = this.props.location.userID;
        if (userID) {
            axios.get(`/xakal/departmentdetail`)
                .then((response) => {
                    this.setState({ courseDetails: response.data });
                });
        }
    }

    /**
     * Fetches college details
     */
    fetchCollegeDetails() {
        const userID = this.props.location.userID;
        if (userID) {
            axios.get(`/xakal/collegedetail`)
                .then((response) => {
                    this.setState({ collegeDetail: response.data[0] });
                });
        }
    }

    /**
     * sets the edit flag to true
     */
    redirect() {
        this.setState({ isEdit: true });
    }

    /**
     * Reverts back to the original state
     */
    discardChanges() {
        this.setState({ isEdit: false });
    }

    /**
     * Triggers when the form is changed and stores the values in state
     * @param event form values 
     */
    handleFormChange(event) {
        if (event.target.value) {
            this.setState({ [event.target.name]: event.target.value })
        }
    }

    updateDetails() {
        let isUpdated = false;
        console.log(this.state)
        const params = {
            name: this.state.name ? this.state.name : this.state.collegeDetail.name,
            collegeCode: this.state.collegeDetail.collegeCode,
            updatedBy: this.state.userID.toUpperCase(),
            updatedDate: new Date(Date.now()).toLocaleString(),
            address: this.state.address ? this.state.address : this.state.collegeDetail.address,
            email: this.state.email ? this.state.email : this.state.collegeDetail.email,
            awards: this.state.awards ? this.state.awards : this.state.collegeDetail.awards,
            contact: this.state.contact ? this.state.contact : this.state.collegeDetail.contact,
        }
        axios.put(`/xakal/collegedetail/update/${this.state.collegeDetail._id}`, params)
            .then(() => {
                if (!isUpdated) {
                    alert('Updated Successfully');
                }
                isUpdated = true;
                this.setState({ isEdit: false });
                this.fetchCollegeDetails()
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20">Dashboard</h1>
                    {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Change password</a> */}
                </div>
                <div className="row">
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">College Code</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.collegeDetail.collegeCode}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Students</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.studentDetails.length}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Last Year Performance</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">50%</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
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
                                            <li><i className="fa fa-bookmark m-r-10"></i>College Name:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Address:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Total courses offered:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Contact number:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Email ID:</li>
                                            <li><i className="fa fa-bookmark m-r-10"></i>Awards and accrediations</li>
                                        </ul>
                                        {this.state.isEdit === true ?
                                            <ul className="list-unstyled">
                                                <li><input onChange={this.handleFormChange.bind(this)} className="add-border"
                                                    type="text" name="name" defaultValue={this.state.collegeDetail.name}></input></li>
                                                <li><input onChange={this.handleFormChange.bind(this)} className="add-border"
                                                    type="text" name="address" defaultValue={this.state.collegeDetail.address}></input></li>
                                                <li>{this.state.courseDetails.length}</li>
                                                <li><input name="contact" onChange={this.handleFormChange.bind(this)} className="add-border"
                                                    type="text" defaultValue={this.state.collegeDetail.contact}></input></li>
                                                <li><input name="email" onChange={this.handleFormChange.bind(this)} className="add-border"
                                                    type="text" defaultValue={this.state.collegeDetail.email}></input></li>
                                                <li><input name="awards" onChange={this.handleFormChange.bind(this)} className="add-border"
                                                    type="text" defaultValue={this.state.collegeDetail.awards}></input></li>
                                            </ul> :
                                            <ul className="list-unstyled">
                                                <li>{this.state.collegeDetail.name}</li>
                                                <li>{this.state.collegeDetail.address}</li>
                                                <li>{this.state.courseDetails.length}</li>
                                                <li>{this.state.collegeDetail.contact}</li>
                                                <li>{this.state.collegeDetail.email}</li>
                                                <li>{this.state.collegeDetail.awards}</li>
                                            </ul>
                                        }
                                    </div>
                                    <button type="button" onClick={this.redirect.bind(this)} className="btn btn-primary m-t-45 m-l-30">Edit Details</button>
                                    {this.state.isEdit ? <button type="button" onClick={this.updateDetails.bind(this)} className="btn btn-primary m-t-45 m-l-30">Save</button> : <p></p>}
                                    {this.state.isEdit ? <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-45 m-l-30">Cancel</button> : <p></p>}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Facade</h6>
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

export default ManagementDashboard;