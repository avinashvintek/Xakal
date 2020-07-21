import React, { Component } from 'react';
import axios from 'axios';
class DepartmentDetailsMaintain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentDetails: [],
            isEdit: false,
            isDelete: false,
            userID: ''
        }
        this.baseState = this.state;
        this.departmentArray = [];
        this.departmentID = [];
    }
    deleteArray = [];
    componentDidMount() {
        if (this.props && this.props.location && this.props.location.userID) {
            this.setState({ routerLink: this.props.location.pathname, userID: this.props.location.userID.userID })
        }
        this.fetchDepartmentDetails();
    }

    fetchDepartmentDetails() {
        this.deleteArray = [];
        axios.get(`/xakal/departmentdetail`)
            .then((response) => {
                this.setState({ departmentDetails: response.data, values: response.data });
            });
    }

    displayDepartmentDetails() {
        return this.state.departmentDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.name}</td>
                    <td className={"left"} key={index++}>{singleData.headOfDepartment}</td>
                    <td className={"left"} key={index++}>{singleData.email}</td>
                    <td className={"left"} key={index++}>{singleData.contact}</td>
                    <td className={"left"} key={index++}>{singleData.startingYear}</td>
                    <td className={"left"} key={index++}>{singleData.studentCapacity}</td>
                </tr>
            )
        })
    }

    /**
     * Adds remove element in the end
     */
    deleteDepartmentDetails() {
        return this.state.departmentDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.name}</td>
                    <td className={"left"} key={index++}>{singleData.headOfDepartment}</td>
                    <td className={"left"} key={index++}>{singleData.email}</td>
                    <td className={"left"} key={index++}>{singleData.contact}</td>
                    <td className={"left"} key={index++}>{singleData.startingYear}</td>
                    <td className={"left"} key={index++}>{singleData.studentCapacity}</td>
                    <td>  <button type="button" onClick={i => this.removeClick(singleData, index -= 7)} className="btn btn-danger m-t-4 m-l-30">X</button>
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
        let departmentDetails = [...this.state.departmentDetails];
        departmentDetails.splice(i, 1);
        this.setState({ departmentDetails });
    }

    /**
     * Reverts back to the original state
     */
    discardChanges() {
        this.departmentArray = [];
        this.departmentID = [];
        this.setState({ isEdit: false, isDelete: false, departmentDetails: this.state.values });
        this.displayDepartmentDetails();
    }

    onEdit(singleElement, changedField, context) {
        const userID = singleElement._id;
        if (this.departmentArray.length) {
            this.departmentArray.forEach(element => {
                if (element._id === userID) {
                    element[changedField] = context.target.value
                } else {
                    if (!this.departmentID.includes(userID)) {
                        this.insertUpdatedDetails(userID, singleElement, changedField, context);
                    }
                }
            });
        } else {
            if (!this.departmentID.includes(userID)) {
                this.insertUpdatedDetails(userID, singleElement, changedField, context);
            }
        }
    }

    insertUpdatedDetails(userID, singleElement, changedField, context) {
        this.departmentID.push(userID);
        this.departmentArray.push(singleElement);
        this.departmentArray.forEach(element => {
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
        if (this.state.isEdit && this.departmentArray && this.departmentArray.length) {
            this.departmentArray.forEach(element => {
                const params = {
                    name: element.name,
                    headOfDepartment: element.headOfDepartment,
                    email: element.email.toLowerCase(),
                    updatedBy: this.state.userID.toUpperCase(),
                    updatedDate: new Date(Date.now()).toLocaleString(),
                    contact: element.contact,
                    startingYear: element.startingYear,
                    studentCapacity: element.studentCapacity,
                }
                axios.put(`/xakal/departmentdetail/update/${element._id}`, params)
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
                axios.delete(`/xakal/departmentdetail/${element._id}`)
                    .then(() => {
                        if (!isUpdated) {
                            alert('Deleted Successfully');
                        }
                        isUpdated = true;
                        this.setState({ isDelete: false, });
                        this.fetchDepartmentDetails();
                    })
                    .catch((err) => console.log(err));
            });
        }
    }

    editDepartmentDetails() {
        return this.state.departmentDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'name')} defaultValue={singleData.name}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'headOfDepartment')} defaultValue={singleData.headOfDepartment}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'email')} defaultValue={singleData.email}></input></td>
                    <td className={"left"} key={index++}><input type="number" className="add-border" onChange={this.onEdit.bind(this, singleData, 'contact')} defaultValue={singleData.contact}></input></td>
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
                    <h1 className="h3 mb-0 text-gray-800 m-t-20">All Departments</h1>
                </div>
                <div className="table-scrollable">
                    <table
                        className="table table-striped table-hover table-responsive table-checkable order-column"
                        id="example4">
                        <thead>
                            <tr>
                                <th> Name </th>
                                <th> Head Of Department </th>
                                <th> Email </th>
                                <th> Mobile </th>
                                <th> Starting Year </th>
                                <th> Student Capacity </th>
                            </tr>
                        </thead>
                        {this.state.isEdit ?
                            <tbody>
                                {this.editDepartmentDetails()}
                            </tbody> : this.state.isDelete ?
                                <tbody>{this.deleteDepartmentDetails()}</tbody>
                                :
                                <tbody>
                                    {this.displayDepartmentDetails()}
                                </tbody>}
                    </table>
                </div>
                {this.state.routerLink === '/management-portal/department-details' || this.state.routerLink === '/hod-portal/department-details' ? <div hidden={this.state.isEdit} className="right p-t-20">
                    <button type="button" onClick={this.deleteRedirect.bind(this)} hidden={this.state.isDelete} className="btn btn-primary m-t-15 m-l-30">Delete Details</button>
                    {this.state.isDelete ? <button type="button" onClick={this.updateDetails.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button> : <p></p>}
                    {this.state.isDelete ? <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button> : <p></p>}
                </div> : <p></p>}

                {this.state.routerLink === '/management-portal/department-details' || this.state.routerLink === '/hod-portal/department-details' ? <div hidden={this.state.isDelete} className="right p-t-20">
                    <button type="button" onClick={this.redirect.bind(this)} hidden={this.state.isEdit} className="btn btn-primary m-t-15 m-l-30">Edit Details</button>
                    {this.state.isEdit ? <button type="button" onClick={this.updateDetails.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button> : <p></p>}
                    {this.state.isEdit ? <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button> : <p></p>}
                </div> : <p></p>}
            </div>
        )
    }
}

export default DepartmentDetailsMaintain;