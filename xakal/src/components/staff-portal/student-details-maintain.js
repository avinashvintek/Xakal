import React, { Component } from 'react';
import axios from 'axios';
class StudentDetailsMaintain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentDetails: [],
            isEdit: false,
            userID: ''
        }
        this.baseState = this.state;
        this.studentsArray = [];
        this.studentID = [];
    }

    componentDidMount() {
        debugger;
        if (this.props && this.props.location && this.props.location.userID) {
            this.setState({ routerLink: this.props.location.pathname, userID: this.props.location.userID.userID })
        }
        this.fetchStudentDetails();
    }

    fetchStudentDetails() {
        axios.get(`http://localhost:4000/xakal/studentdetail`)
            .then((response) => {
                this.setState({ studentDetails: response.data });
            });
    }

    displayStudentDetails() {
        return this.state.studentDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.userID}</td>
                    <td className={"left"} key={index++}>{singleData.name}</td>
                    <td className={"left"} key={index++}>{singleData.course} - {singleData.branch}</td>
                    <td className={"left"} key={index++}>{singleData.email}</td>
                    <td className={"left"} key={index++}>{singleData.contact}</td>
                    <td className={"left"} key={index++}>{singleData.emergencyContact}</td>
                    <td className={"left"} key={index++}>{singleData.parentName}</td>
                    <td className={"left"} key={index++}>{singleData.bloodGroup}</td>
                </tr>
            )
        })
    }

    /**
     * Reverts back to the original state
     */
    discardChanges() {
        this.studentsArray = [];
        this.studentID = [];
        this.setState({ isEdit: false });
        this.displayStudentDetails();
    }

    onEdit(singleElement, changedField, context) {
        debugger;
        const userID = singleElement._id;
        if (this.studentsArray.length) {
            this.studentsArray.forEach(element => {
                if (element._id === userID) {
                    if (changedField === 'branchCourse') {
                        const result = context.target.value.split("-");
                        element.course = result[0];
                        element.branch = result[1];
                    } else {
                        element[changedField] = context.target.value
                    }
                } else {
                    if (!this.studentID.includes(userID)) {
                        this.insertUpdatedDetails(userID, singleElement, changedField, context);
                    }
                }
            });
        } else {
            if (!this.studentID.includes(userID)) {
                this.insertUpdatedDetails(userID, singleElement, changedField, context);
            }
        }
    }

    insertUpdatedDetails(userID, singleElement, changedField, context) {
        this.studentID.push(userID);
        this.studentsArray.push(singleElement);
        this.studentsArray.forEach(element => {
            if (element._id === userID) {
                if (changedField === 'branchCourse') {
                    const result = context.target.value.split("-");
                    element.course = result[0];
                    element.branch = result[1];
                } else {
                    if (changedField === 'branchCourse') {
                        const result = context.target.value.split("-");
                        element.course = result[0];
                        element.branch = result[1];
                    } else {
                        element[changedField] = context.target.value
                    }
                }
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
        debugger;
        let isUpdated = false;
        if (this.studentsArray && this.studentsArray.length) {
            this.studentsArray.forEach(element => {
                const params = {
                    name: element.name,
                    course: element.course,
                    email: element.email.toLowerCase(),
                    uploadedBy: this.state.userID.toUpperCase(),
                    uploadedDate: new Date(Date.now()).toLocaleString(),
                    bloodGroup: element.bloodGroup,
                    contact: element.contact,
                    emergencyContact: element.emergencyContact,
                    parentName: element.parentName
                }
                axios.put(`http://localhost:4000/xakal/studentdetail/update/${element._id}`, params)
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

    editStudentDetails() {
        return this.state.studentDetails.map((singleData, index) => {
            const courseBranch = singleData.course + ' - ' + singleData.branch
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.userID}</td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'name')} defaultValue={singleData.name}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'branchCourse')} defaultValue={courseBranch}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'email')} defaultValue={singleData.email}></input></td>
                    <td className={"left"} key={index++}><input type="number" className="add-border" onChange={this.onEdit.bind(this, singleData, 'contact')} defaultValue={singleData.contact}></input></td>
                    <td className={"left"} key={index++}><input type="number" className="add-border" onChange={this.onEdit.bind(this, singleData, 'emergencyContact')} defaultValue={singleData.emergencyContact}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'parentName')} defaultValue={singleData.parentName}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'bloodGroup')} defaultValue={singleData.bloodGroup}></input></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20">All Students</h1>
                </div>
                <div className="table-scrollable">
                    <table
                        className="table table-striped table-bordered table-hover table-checkable order-column"
                        id="example4">
                        <thead>
                            <tr>
                                <th> Roll No </th>
                                <th> Name </th>
                                <th> Department </th>
                                <th> Email </th>
                                <th> Mobile </th>
                                <th> Emergency Contact </th>
                                <th> Parents/Guardian </th>
                                <th> BG </th>
                            </tr>
                        </thead>
                        {this.state.isEdit ?
                            <tbody>
                                {this.editStudentDetails()}
                            </tbody> :
                            <tbody>
                                {this.displayStudentDetails()}
                            </tbody>}
                    </table>
                </div>
                {this.state.routerLink === '/management-portal/view-student-details' ? <div className="right p-t-20 m-r-100">
                    <button type="button" onClick={this.redirect.bind(this)} className="btn btn-primary m-t-15 m-l-30">Edit Details</button>
                    {this.state.isEdit ? <button type="button" onClick={this.updateDetails.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button> : <p></p>}
                    {this.state.isEdit ? <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button> : <p></p>}
                </div> : <p></p>}
            </div>
        )
    }
}

export default StudentDetailsMaintain;