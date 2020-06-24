import React, { Component } from 'react';
import '../../styles/dashboard.css';
import axios from 'axios';
import profileImage from '../../images/staffProfile.png';

class StaffDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffDetails: [],
            isEdit: false,
        };
        this.baseState = this.state;
    }

    componentDidMount() {
        if (this.props && this.props.location && this.props.location.userID) {
            this.setState({ routerLink: this.props.location.pathname, userID: this.props.location.userID.userID })
        }
        this.fetchStaffDetails();
    }

    fetchStaffDetails() {
        const userID = this.props.location.userID;
        if (userID) {
            axios.get(`/xakal/staffdetail/${userID.userID}`)
                .then((response) => {
                    this.setState({ staffDetails: response.data });
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
        const params = {
            name: this.state.staffDetails.name,
            qualification: this.state.staffDetails.qualification,
            uploadedBy: this.state.userID.toUpperCase(),
            uploadedDate: new Date(Date.now()).toLocaleString(),
            designation: this.state.staffDetails.designation,
            email: this.state.email ? this.state.email : this.state.staffDetails.email,
            bloodGroup: this.state.staffDetails.bloodGroup,
            contact: this.state.contact ? this.state.contact : this.state.staffDetails.contact,
            emergencyContact: this.state.emergencyContact ? this.state.emergencyContact : this.state.staffDetails.emergencyContact,
            parentSpouse: this.state.parentSpouse ? this.state.parentSpouse : this.state.staffDetails.parentSpouse,
            joiningDate: this.state.staffDetails.joiningDate,
            departmentName: this.state.staffDetails.departmentName,
        }
        axios.put(`/xakal/staffdetail/update/${this.state.staffDetails._id}`, params)
            .then(() => {
                if (!isUpdated) {
                    alert('Updated Successfully');
                }
                isUpdated = true;
                this.setState({ isEdit: false });
                this.fetchStaffDetails()
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
                                        {this.state.isEdit === true ? <ul>
                                            <li>{this.state.staffDetails.name}</li>
                                            <li>{this.state.staffDetails.designation}</li>
                                            <li>{this.state.staffDetails.qualification}</li>
                                            <li>{this.state.staffDetails.bloodGroup}</li>
                                            <li><input name="contact" onChange={this.handleFormChange.bind(this)} className="add-border"
                                                type="text" defaultValue={this.state.staffDetails.contact}></input></li>
                                            <li><input name="emergencyContact" onChange={this.handleFormChange.bind(this)} className="add-border"
                                                type="text" defaultValue={this.state.staffDetails.emergencyContact}></input></li>
                                            <li><input name="email" onChange={this.handleFormChange.bind(this)} className="add-border"
                                                type="text" defaultValue={this.state.staffDetails.email}></input></li>
                                            <li><input name="parentSpouse" onChange={this.handleFormChange.bind(this)} className="add-border"
                                                type="text" defaultValue={this.state.staffDetails.parentSpouse}></input></li>
                                        </ul> :
                                            <ul className="list-unstyled">
                                                <li>{this.state.staffDetails.name}</li>
                                                <li>{this.state.staffDetails.designation}</li>
                                                <li>{this.state.staffDetails.qualification}</li>
                                                <li>{this.state.staffDetails.bloodGroup}</li>
                                                <li>{this.state.staffDetails.contact}</li>
                                                <li>{this.state.staffDetails.emergencyContact}</li>
                                                <li>{this.state.staffDetails.email}</li>
                                                <li>{this.state.staffDetails.parentSpouse}</li>
                                            </ul>}
                                    </div>
                                    <button type="button" onClick={this.redirect.bind(this)} className="btn btn-primary m-t-15 m-l-30">Edit Details</button>
                                    {this.state.isEdit ? <button type="button" onClick={this.updateDetails.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button> : <p></p>}
                                    {this.state.isEdit ? <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button> : <p></p>}

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