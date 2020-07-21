import React, { Component } from 'react';
import axios from 'axios';
class StaffDetailsMaintain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffDetails: [],
            isEdit: false,
            isDelete: false,
            userID: ''
        }
        this.baseState = this.state;
        this.staffArray = [];
        this.staffID = [];
    }
    deleteArray = [];
    componentDidMount() {
        if (this.props && this.props.location && this.props.location.userID) {
            this.setState({ routerLink: this.props.location.pathname, userID: this.props.location.userID.userID })
        }
        this.fetchStaffDetails();
    }

    fetchStaffDetails() {
        this.deleteArray = [];
        axios.get(`/xakal/staffdetail`)
            .then((response) => {
                this.setState({ staffDetails: response.data, values: response.data });
            });
    }

    displayStaffDetails() {
        return this.state.staffDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.userID}</td>
                    <td className={"left"} key={index++}>{singleData.name}</td>
                    <td className={"left"} key={index++}>{singleData.designation}</td>
                    <td className={"left"} key={index++}>{singleData.departmentName}</td>
                    <td className={"left"} key={index++}>{singleData.qualification}</td>
                    <td className={"left"} key={index++}>{singleData.email}</td>
                    <td className={"left"} key={index++}>{singleData.contact}</td>
                    <td className={"left"} key={index++}>{singleData.emergencyContact}</td>
                    <td className={"left"} key={index++}>{singleData.parentSpouse}</td>
                    <td className={"left"} key={index++}>{singleData.joiningDate}</td>
                    <td className={"left"} key={index++}>{singleData.bloodGroup}</td>
                </tr>
            )
        })
    }

    /**
     * Adds remove element in the end
     */
    deleteStaffDetails() {
        return this.state.staffDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.userID}</td>
                    <td className={"left"} key={index++}>{singleData.name}</td>
                    <td className={"left"} key={index++}>{singleData.designation}</td>
                    <td className={"left"} key={index++}>{singleData.departmentName}</td>
                    <td className={"left"} key={index++}>{singleData.qualification}</td>
                    <td className={"left"} key={index++}>{singleData.email}</td>
                    <td className={"left"} key={index++}>{singleData.contact}</td>
                    <td className={"left"} key={index++}>{singleData.emergencyContact}</td>
                    <td className={"left"} key={index++}>{singleData.parentSpouse}</td>
                    <td className={"left"} key={index++}>{singleData.joiningDate}</td>
                    <td className={"left"} key={index++}>{singleData.bloodGroup}</td>
                    <td>  <button type="button" onClick={i => this.removeClick(singleData, index -= 12)} className="btn btn-danger m-t-4 m-l-30">X</button>
                    </td>
                </tr>
            )
        })
    }

    /**
    * Removes the selected row
    * @param index selected row index
    */
    removeClick(singleData, i) {
        this.deleteArray.push(singleData);
        let staffDetails = [...this.state.staffDetails];
        staffDetails.splice(i, 1);
        this.setState({ staffDetails });
    }

    /**
     * Reverts back to the original state
     */
    discardChanges() {
        this.staffArray = [];
        this.staffID = [];
        this.setState({ isEdit: false, isDelete: false, staffDetails: this.state.values });
        this.displayStaffDetails();
    }

    onEdit(singleElement, changedField, context) {
        const userID = singleElement._id;
        if (this.staffArray.length) {
            this.staffArray.forEach(element => {
                if (element._id === userID) {
                    element[changedField] = context.target.value
                } else {
                    if (!this.staffID.includes(userID)) {
                        this.insertUpdatedDetails(userID, singleElement, changedField, context);
                    }
                }
            });
        } else {
            if (!this.staffID.includes(userID)) {
                this.insertUpdatedDetails(userID, singleElement, changedField, context);
            }
        }
    }

    insertUpdatedDetails(userID, singleElement, changedField, context) {
        this.staffID.push(userID);
        this.staffArray.push(singleElement);
        this.staffArray.forEach(element => {
            if (element._id === userID) {
                element[changedField] = context.target.value
            }
        });
    }

    /**
     * sets the edit flag to true
     */
    redirect() {
        this.setState({ isEdit: true, isDelete: false });
    }

    /**
     * sets the delete flag to true
     */
    deleteRedirect() {
        this.setState({ isDelete: true, isEdit: false });
    }

    updateDetails() {
        let isUpdated = false;
        if (this.state.isEdit && this.staffArray && this.staffArray.length) {
            this.staffArray.forEach(element => {
                const params = {
                    name: element.name,
                    qualification: element.qualification,
                    designation: element.designation,
                    email: element.email.toLowerCase(),
                    uploadedBy: this.state.userID.toUpperCase(),
                    uploadedDate: new Date(Date.now()).toLocaleString(),
                    bloodGroup: element.bloodGroup,
                    contact: element.contact,
                    emergencyContact: element.emergencyContact,
                    joiningDate: element.joiningDate,
                    parentSpouse: element.parentSpouse,
                    departmentName: element.departmentName
                }
                axios.put(`/xakal/staffdetail/update/${element._id}`, params)
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
        } else if (this.state.isDelete && this.deleteArray && this.deleteArray.length) {
            this.deleteArray.forEach(element => {
                axios.delete(`/xakal/staffdetail/${element._id}`)
                    .then(() => {
                        if (!isUpdated) {
                            alert('Deleted Successfully');
                        }
                        isUpdated = true;
                        this.setState({ isDelete: false, });
                        this.fetchStaffDetails();
                    })
                    .catch((err) => console.log(err));
            });
        }
    }

    editStaffDetails() {
        return this.state.staffDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.userID}</td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'name')} defaultValue={singleData.name}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'designation')} defaultValue={singleData.designation}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'departmentName')} defaultValue={singleData.departmentName}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'qualification')} defaultValue={singleData.qualification}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'email')} defaultValue={singleData.email}></input></td>
                    <td className={"left"} key={index++}><input type="number" className="add-border" onChange={this.onEdit.bind(this, singleData, 'contact')} defaultValue={singleData.contact}></input></td>
                    <td className={"left"} key={index++}><input type="number" className="add-border" onChange={this.onEdit.bind(this, singleData, 'emergencyContact')} defaultValue={singleData.emergencyContact}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'parentSpouse')} defaultValue={singleData.parentSpouse}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'joiningDate')} defaultValue={singleData.joiningDate}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'bloodGroup')} defaultValue={singleData.bloodGroup}></input></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20">All Staffs</h1>
                </div>
                <div className="table-scrollable">
                    <table
                        className="table table-striped table-hover table-responsive table-checkable order-column"
                        id="example4">
                        <thead>
                            <tr>
                                <th> User ID </th>
                                <th> Name </th>
                                <th> Designation </th>
                                <th> Department Name</th>
                                <th> Qualification </th>
                                <th> Email </th>
                                <th> Mobile </th>
                                <th> Emergency Contact </th>
                                <th> Parents / Spouse </th>
                                <th> Joining Date </th>
                                <th> BG </th>
                            </tr>
                        </thead>
                        {this.state.isEdit ?
                            <tbody>
                                {this.editStaffDetails()}
                            </tbody> : this.state.isDelete ?
                                <tbody>{this.deleteStaffDetails()}</tbody>
                                :
                                <tbody>
                                    {this.displayStaffDetails()}
                                </tbody>}
                    </table>
                </div>
                {this.state.routerLink === '/management-portal/staff-details' || this.state.routerLink === '/hod-portal/staff-details' ? <div hidden={this.state.isEdit} className="right p-t-20">
                    <button type="button" onClick={this.deleteRedirect.bind(this)} hidden={this.state.isDelete} className="btn btn-primary m-t-15 m-l-30">Delete Details</button>
                    {this.state.isDelete ? <button type="button" onClick={this.updateDetails.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button> : <p></p>}
                    {this.state.isDelete ? <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button> : <p></p>}
                </div> : <p></p>}

                {this.state.routerLink === '/management-portal/staff-details' || this.state.routerLink === '/hod-portal/staff-details' ? <div hidden={this.state.isDelete} className="right p-t-20">
                    <button type="button" onClick={this.redirect.bind(this)} hidden={this.state.isEdit} className="btn btn-primary m-t-15 m-l-30">Edit Details</button>
                    {this.state.isEdit ? <button type="button" onClick={this.updateDetails.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button> : <p></p>}
                    {this.state.isEdit ? <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button> : <p></p>}
                </div> : <p></p>}
            </div>
        )
    }
}

export default StaffDetailsMaintain;