import React, { Component } from 'react';
import axios from 'axios';
class CourseDetailsMaintain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseDetails: [],
            isEdit: false,
            userID: ''
        }
        this.baseState = this.state;
        this.courseArray = [];
        this.courseID = [];
    }

    componentDidMount() {
        if (this.props && this.props.location && this.props.location.userID) {
            this.setState({ routerLink: this.props.location.pathname, userID: this.props.location.userID.userID })
        }
        this.fetchDepartmentDetails();
    }

    fetchDepartmentDetails() {
        axios.get(`http://localhost:4000/xakal/degreecoursedetail`)
            .then((response) => {
                this.setState({ courseDetails: response.data });
            });
    }

    displayCourseDetails() {
        return this.state.courseDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.name}</td>
                    <td className={"left"} key={index++}>{singleData.duration}</td>
                    <td className={"left"} key={index++}>{singleData.startingYear}</td>
                    <td className={"left"} key={index++}>{singleData.studentCapacity}</td>
                </tr>
            )
        })
    }

    /**
     * Reverts back to the original state
     */
    discardChanges() {
        this.courseArray = [];
        this.courseID = [];
        this.setState({ isEdit: false });
        this.displayCourseDetails();
    }

    onEdit(singleElement, changedField, context) {
        const userID = singleElement._id;
        if (this.courseArray.length) {
            this.courseArray.forEach(element => {
                if (element._id === userID) {
                    element[changedField] = context.target.value
                } else {
                    if (!this.courseID.includes(userID)) {
                        this.insertUpdatedDetails(userID, singleElement, changedField, context);
                    }
                }
            });
        } else {
            if (!this.courseID.includes(userID)) {
                this.insertUpdatedDetails(userID, singleElement, changedField, context);
            }
        }
    }

    insertUpdatedDetails(userID, singleElement, changedField, context) {
        this.courseID.push(userID);
        this.courseArray.push(singleElement);
        this.courseArray.forEach(element => {
            if (element._id === userID) {
                element[changedField] = context.target.value
            }
        });
    }

    /**
     * sets the edit flag to true
     */
    redirect() {
        this.setState({ isEdit: true });
    }

    updateDetails() {
        let isUpdated = false;
        if (this.courseArray && this.courseArray.length) {
            this.courseArray.forEach(element => {
                const params = {
                    name: element.name,
                    duration: element.duration,
                    updatedBy: this.state.userID.toUpperCase(),
                    updatedDate: new Date(Date.now()).toLocaleString(),
                    startingYear: element.startingYear,
                    studentCapacity: element.studentCapacity,
                }
                axios.put(`http://localhost:4000/xakal/degreecoursedetail/update/${element._id}`, params)
                    .then(() => {
                        if (!isUpdated) {
                            alert('Updated Successfully');
                        }
                        isUpdated = true;
                        this.setState({ isEdit: false })
                    })
                    .catch((err) => console.log(err));
            });
            this.discardChanges();

        }
    }

    editCourseDetails() {
        return this.state.courseDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'name')} defaultValue={singleData.name}></input></td>
                    <td className={"left"} key={index++}><input type="number" className="add-border" onChange={this.onEdit.bind(this, singleData, 'duration')} defaultValue={singleData.duration}></input></td>
                    <td className={"left"} key={index++}><input type="number" className="add-border" onChange={this.onEdit.bind(this, singleData, 'startingYear')} defaultValue={singleData.startingYear}></input></td>
                    <td className={"left"} key={index++}><input type="number" className="add-border" onChange={this.onEdit.bind(this, singleData, 'studentCapacity')} defaultValue={singleData.studentCapacity}></input></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20">All Courses</h1>
                </div>
                <div className="table-scrollable">
                    <table
                        className="table table-striped table-hover table-responsive table-checkable order-column"
                        id="example4">
                        <thead>
                            <tr>
                                <th> Name </th>
                                <th> Duration (in years) </th>
                                <th> Starting Year </th>
                                <th> Student Capacity </th>
                            </tr>
                        </thead>
                        {this.state.isEdit ?
                            <tbody>
                                {this.editCourseDetails()}
                            </tbody> :
                            <tbody>
                                {this.displayCourseDetails()}
                            </tbody>}
                    </table>
                </div>
                {this.state.routerLink === '/management-portal/course-details' ? <div className="right p-t-20 m-r-100">
                    <button type="button" onClick={this.redirect.bind(this)} className="btn btn-primary m-t-15 m-l-30">Edit Details</button>
                    {this.state.isEdit ? <button type="button" onClick={this.updateDetails.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button> : <p></p>}
                    {this.state.isEdit ? <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button> : <p></p>}
                </div> : <p></p>}
            </div>
        )
    }
}

export default CourseDetailsMaintain;