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
            cgpa: 0,
            isSameProfile: true,
            followText: 'Follow',
            alreadyFollowed: false,
            followedElement: null,
            followingElement: null
        };
        this.baseState = this.state;
    }

    componentDidMount() {
        if (this.props && this.props.location && this.props.location.userID) {
            this.setState({ routerLink: this.props.location.pathname, userID: this.props.location.userID.userID })
        } else if (this.props && this.props.location.state && this.props.location.state.userID) {
            this.setState({
                routerLink: this.props.location.state.pathname, userID: this.props.location.state.userID,
                isSameProfile: this.props.location.state.isSameProfile === true,
                loginID: this.props.location.state.loginID
            })
        }
        this.fetchStudentDetails();
        this.fetchFollowersCount();
        this.fetchFollowingCount();
    }

    /**
     * Gets the selected student detail
     */
    fetchStudentDetails() {
        const userID = this.props.location.userID || this.props.location.state;
        if (userID) {
            axios.get(`/xakal/studentdetail/${userID.userID}`)
                .then((response) => {
                    this.fetchGPA();
                    this.setState({ studentDetails: response.data });
                });
        }
    }

    /**
     * Gets the followers count to display
     */
    fetchFollowersCount() {
        const userID = this.props.location.userID || this.props.location.state;
        if (userID) {
            axios.get(`/xakal/follower/${userID.userID}`)
                .then((response) => {
                    this.setState({ followerCount: response.data.length });
                    this.checkFollowing(response.data);
                });
        }
    }

    /**
     * Gets the following count to display
     */
    fetchFollowingCount() {
        const userID = this.props.location.userID || this.props.location.state;
        if (userID) {
            axios.get(`/xakal/following/${userID.userID}`)
                .then((response) => {
                    this.setState({ followingCount: response.data.length });
                });
        }
        this.checkFollower()
    }

    /**
     * Sets the follow text if already followed
     */
    checkFollowing(followerCount) {
        if (followerCount.length) {
            followerCount.forEach(element => {
                if (element.followerUserID.toUpperCase() === this.props.location.state.loginID.toUpperCase()) {
                    this.setState({ alreadyFollowed: true, followedElement: element })
                    if (!element.isDeleted) {
                        this.setState({ followText: 'UnFollow' })
                    }
                }
            });
        }
    }

    fetchGPA() {
        axios.get(`/xakal/assessment/semesterdetail`)
            .then((response) => {
                this.calculateGPA(response.data);
            });
    }

    /**
    * Sets the follow text if already followed
    */
    checkFollower() {
        const userID = this.props.location && this.props.location.state;
        if (userID) {
            axios.get(`/xakal/following/${userID.loginID.toUpperCase()}`)
                .then((response) => {
                    let followingCount = response.data;
                    if (followingCount.length) {
                        followingCount.forEach(element => {
                            if (element.followedUserID.toUpperCase() === this.props.location.state.userID.toUpperCase()) {
                                console.log(element)
                                this.setState({ alreadyFollowed: true, followingElement: element })
                            }
                        });
                    }
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
            name: this.state.studentDetails.name,
            course: this.state.studentDetails.course,
            uploadedBy: this.state.userID.toUpperCase(),
            uploadedDate: new Date(Date.now()).toLocaleString(),
            branch: this.state.studentDetails.branch,
            email: this.state.email ? this.state.email : this.state.studentDetails.email,
            bloodGroup: this.state.studentDetails.bloodGroup,
            contact: this.state.contact ? this.state.contact : this.state.studentDetails.contact,
            emergencyContact: this.state.emergencyContact ? this.state.emergencyContact : this.state.studentDetails.emergencyContact,
            parentName: this.state.parentName ? this.state.parentName : this.state.studentDetails.parentName,
            admissionDate: this.state.studentDetails.admissionDate,
        }
        axios.put(`/xakal/studentdetail/update/${this.state.studentDetails._id}`, params)
            .then(() => {
                if (!isUpdated) {
                    alert('Updated Successfully');
                }
                isUpdated = true;
                this.setState({ isEdit: false });
                this.fetchStudentDetails()
            })
            .catch((err) => console.log(err));
    }

    /**
     * Triggers to insert follow details
     */
    handleFollowClick() {
        if (this.state.alreadyFollowed) {
            // update
            if (this.state.followText === 'Follow') {
                this.updateFollowerDetails(false);
                this.updateFollowingDetails(false);
            } else {
                this.updateFollowerDetails(true);
                this.updateFollowingDetails(true);
            }
        } else if (this.state.followText === 'Follow') {
            this.insertFollowerDetails();
            this.insertFollowingDetails();
        }
    }

    /**
     * Inserts the following user
     */
    insertFollowingDetails() {
        let isUpdated = false;
        const params = {
            userID: this.state.loginID,
            followedUserID: this.state.userID,
            updatedDate: new Date(Date.now()).toLocaleString(),
        }
        axios.post(`/xakal/following/`, params)
            .then(() => {
                if (!isUpdated) {
                    alert('Updated Successfully');
                }
                isUpdated = true;
                this.fetchFollowingCount()
            })
            .catch((err) => console.log(err));
    }

    /**
     * Inserts the follower user
     */
    insertFollowerDetails() {
        let isUpdated = false;
        const params = {
            followerUserID: this.state.loginID,
            userID: this.state.userID,
            updatedDate: new Date(Date.now()).toLocaleString(),
        }
        axios.post(`/xakal/follower/`, params)
            .then(() => {
                if (!isUpdated) {
                    alert('Updated Successfully');
                }
                this.setState({ followText: 'UnFollow' })
                isUpdated = true;
                this.fetchFollowersCount()
            })
            .catch((err) => console.log(err));
    }

    /**
   * update the following user
   */
    updateFollowingDetails(isDeleted) {
        console.log('aaf', this.state.followingElement)
        let isUpdated = false;
        const params = {
            isDeleted: isDeleted,
            updatedDate: new Date(Date.now()).toLocaleString(),
        }
        axios.put(`/xakal/following/update/${this.state.followingElement._id}`, params)
            .then(() => {
                if (!isUpdated) {
                    alert('Updated Successfully');
                }
                isUpdated = true;
                this.fetchFollowingCount()
            })
            .catch((err) => console.log(err));
    }

    /**
     * update the follower user
     */
    updateFollowerDetails(isDeleted) {
        let isUpdated = false;
        const params = {
            isDeleted: isDeleted,
            updatedDate: new Date(Date.now()).toLocaleString(),
        }
        axios.put(`/xakal/follower/update/${this.state.followedElement._id}`, params)
            .then(() => {
                if (!isUpdated) {
                    alert('Updated Successfully');
                }
                if (isDeleted) {
                    this.setState({ followText: 'Follow' })
                } else {
                    this.setState({ followText: 'UnFollow' })
                }
                isUpdated = true;
                this.fetchFollowersCount()
            })
            .catch((err) => console.log(err));
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
            obj[stateValue] = percentage > 0 ? percentage : 0;
            const counter = this.state.counter + 1;
            this.setState({ lastSemester: gpa, counter: counter })
            this.setState(obj);
        }
    }

    calculateCGPA() {
        const cgpa = (this.state.semester1 + this.state.semester2 + this.state.semester3 + this.state.semester4 + this.state.semester5 + this.state.semester6 + this.state.semester7 + this.state.semester8) / (this.state.counter * 10);
        if (cgpa > 0) {
            this.setState({ cgpa: cgpa })
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
                                        {this.state.isEdit === true ? <ul>
                                            <li>{this.state.studentDetails.name}</li>
                                            <li>{this.state.studentDetails.course}</li>
                                            <li>{this.state.studentDetails.branch}</li>
                                            <li>{this.state.studentDetails.bloodGroup}</li>
                                            <li><input name="contact" onChange={this.handleFormChange.bind(this)} className="add-border"
                                                type="text" defaultValue={this.state.studentDetails.contact}></input></li>
                                            <li><input name="emergencyContact" onChange={this.handleFormChange.bind(this)} className="add-border"
                                                type="text" defaultValue={this.state.studentDetails.emergencyContact}></input></li>
                                            <li><input name="email" onChange={this.handleFormChange.bind(this)} className="add-border"
                                                type="text" defaultValue={this.state.studentDetails.email}></input></li>
                                            <li><input name="parentName" onChange={this.handleFormChange.bind(this)} className="add-border"
                                                type="text" defaultValue={this.state.studentDetails.parentName}></input></li>
                                        </ul> :
                                            <ul className="list-unstyled">
                                                <li>{this.state.studentDetails.name}</li>
                                                <li>{this.state.studentDetails.course}</li>
                                                <li>{this.state.studentDetails.branch}</li>
                                                <li>{this.state.studentDetails.bloodGroup}</li>
                                                <li>{this.state.studentDetails.contact}</li>
                                                <li>{this.state.studentDetails.emergencyContact}</li>
                                                <li>{this.state.studentDetails.email}</li>
                                                <li>{this.state.studentDetails.parentName}</li>
                                            </ul>}
                                    </div>
                                    <button hidden={!this.state.isSameProfile} type="button" onClick={this.redirect.bind(this)} className="btn btn-primary m-t-15 m-l-30">Edit Details</button>
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
                                        <img src={profileImage} alt="Girl in a jacket" width="80%" height="100%" />
                                    </div>
                                    <button hidden={this.state.isSameProfile} type="button" onClick={this.handleFollowClick.bind(this)}
                                        className="btn btn-primary m-r-5 m-l-110">{this.state.followText}</button>
                                    <span className=" m-r-5">Followers: {this.state.followerCount}</span>
                                    <span>Following: {this.state.followingCount}</span>
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
                                    {/* <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 25 + 'rem' }} src="img/undraw_posting_photo.svg" alt="" /> */}
                                </div>
                            </div>
                        </div>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Awards</h6>
                            </div>
                            <div className="card-body">
                                <div className="text-center">
                                    {/* <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 25 + 'rem' }} src="img/undraw_posting_photo.svg" alt="" /> */}
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