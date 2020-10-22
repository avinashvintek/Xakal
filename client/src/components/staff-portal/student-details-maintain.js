import React, { Component } from 'react';
import axios from 'axios';
class StudentDetailsMaintain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentDetails: [],
            isEdit: false,
            isDelete: false,
            userID: '',
            selectedYear: '',
            departmentDetails: [],
            hasDepartmentValue: false,
            selectedDepartment: '',
            managementPortal: false
        }
        this.baseState = this.state;
        this.studentsArray = [];
        this.studentID = [];
    }
    deleteArray = [];
    componentDidMount() {
        if (this.props && this.props.location && this.props.location.userID) {
            this.setState({ routerLink: this.props.location.pathname, userID: this.props.location.userID.userID });
        }
        if (this.props.location.pathname === '/hod-portal/view-student-details' ||
            this.props.location.pathname === '/staff-portal/view-student-details') {
            this.fetchStaffDetails();
        } else {
            this.setState({ managementPortal: true })
            this.fetchDepartmentDetails();
        }
    }

    fetchStaffDetails() {
        if (this.props.location && this.props.location.userID && this.props.location.userID.userID) {
            axios.get(`/xakal/staffdetail/${this.props.location.userID.userID}`)
                .then((response) => {
                    this.setState({ staffDetails: response.data, values: response.data, selectedDepartment: response.data.departmentName });
                });
        }
    }

    fetchStudentDetails() {
        this.deleteArray = [];
        axios.get(`/xakal/studentdetail/department/${this.state.selectedDepartment}`)
            .then((response) => {
                this.setState({ studentDetails: response.data, values: response.data });
            });
    }

    fetchYearwiseStudentDetails() {
        this.deleteArray = [];
        axios.get(`/xakal/studentdetail/yearwise/${this.state.selectedYear}/${this.state.selectedDepartment}`)
            .then((response) => {
                this.setState({ studentDetails: response.data, values: response.data });
            });
    }

    displayStudentDetails() {
        return this.state.studentDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.userID}</td>
                    <td className={"left"} key={index++}>{singleData.name}</td>
                    <td className={"left"} key={index++}>{singleData.course}</td>
                    <td className={"left"} key={index++}>{singleData.branch}</td>
                    <td className={"left"} key={index++}>{singleData.email}</td>
                    <td className={"left"} key={index++}>{singleData.contact}</td>
                    <td className={"left"} key={index++}>{singleData.emergencyContact}</td>
                    <td className={"left"} key={index++}>{singleData.parentName}</td>
                    <td className={"left"} key={index++}>{singleData.admissionDate}</td>
                    <td className={"left"} key={index++}>{singleData.bloodGroup}</td>
                </tr>
            )
        })
    }

    /**
     * Adds remove element in the end
     */
    deleteStudentDetails() {
        return this.state.studentDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.userID}</td>
                    <td className={"left"} key={index++}>{singleData.name}</td>
                    <td className={"left"} key={index++}>{singleData.course}</td>
                    <td className={"left"} key={index++}>{singleData.branch}</td>
                    <td className={"left"} key={index++}>{singleData.email}</td>
                    <td className={"left"} key={index++}>{singleData.contact}</td>
                    <td className={"left"} key={index++}>{singleData.emergencyContact}</td>
                    <td className={"left"} key={index++}>{singleData.parentName}</td>
                    <td className={"left"} key={index++}>{singleData.admissionDate}</td>
                    <td className={"left"} key={index++}>{singleData.bloodGroup}</td>
                    <td>  <button type="button" onClick={i => this.removeClick(singleData, index -= 10)} className="btn btn-danger m-t-4 m-l-30">X</button>
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
        let studentDetails = [...this.state.studentDetails];
        studentDetails.splice(i, 1);
        this.setState({ studentDetails });
    }

    /**
     * Reverts back to the original state
     */
    discardChanges() {
        this.studentsArray = [];
        this.studentID = [];
        this.setState({ isEdit: false, isDelete: false, studentDetails: this.state.values });
        this.displayStudentDetails();
    }

    onEdit(singleElement, changedField, context) {
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
                    if (changedField === "admissionDate") {
                        const admissionYear = (new Date(context.target.value)).getFullYear();
                        element["admissionYear"] = admissionYear
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
                if (changedField === "admissionDate") {
                    const admissionYear = (new Date(context.target.value)).getFullYear();
                    element["admissionYear"] = admissionYear
                }
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
        if (this.state.isEdit && this.studentsArray && this.studentsArray.length) {
            this.studentsArray.forEach(element => {
                const params = {
                    name: element.name,
                    course: element.course,
                    branch: element.branch,
                    email: element.email.toLowerCase(),
                    uploadedBy: this.state.userID.toUpperCase(),
                    uploadedDate: new Date(Date.now()).toLocaleString(),
                    bloodGroup: element.bloodGroup,
                    contact: element.contact,
                    emergencyContact: element.emergencyContact,
                    parentName: element.parentName,
                    admissionDate: element.admissionDate,
                    admissionYear: element.admissionYear
                }
                axios.put(`/xakal/studentdetail/update/${element._id}`, params)
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
                axios.delete(`/xakal/studentdetail/${element._id}`)
                    .then(() => {
                        if (!isUpdated) {
                            alert('Deleted Successfully');
                        }
                        isUpdated = true;
                        this.setState({ isDelete: false, });
                        this.getResult();
                    })
                    .catch((err) => console.log(err));
            });
        }
    }

    editStudentDetails() {
        return this.state.studentDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.userID}</td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'name')} defaultValue={singleData.name}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'course')} defaultValue={singleData.course}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'branch')} defaultValue={singleData.branch}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'email')} defaultValue={singleData.email}></input></td>
                    <td className={"left"} key={index++}><input type="number" className="add-border" onChange={this.onEdit.bind(this, singleData, 'contact')} defaultValue={singleData.contact}></input></td>
                    <td className={"left"} key={index++}><input type="number" className="add-border" onChange={this.onEdit.bind(this, singleData, 'emergencyContact')} defaultValue={singleData.emergencyContact}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'parentName')} defaultValue={singleData.parentName}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'admissionDate')} defaultValue={singleData.admissionDate}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'bloodGroup')} defaultValue={singleData.bloodGroup}></input></td>
                </tr>
            )
        })
    }

    onYearFocus() {
        this.setState({ isYearFocussed: 'is-focused', onFocus: false, onYearFocus: true, yearBackground: 'is-shown', background: 'is-hidden', onDepartmentFocus: false, backgroundDepartment: 'is-hidden' });
    }

    /**
     * Gets the previous 5 years
     */
    getYear() {
        const year = (new Date()).getFullYear();
        const years = Array.from(new Array(5), (val, index) => -(index - year));
        return years.map((year, index) => {
            return (
                <li id={year} key={index++} className="mdl-menu__item animation" onClick={this.onYearSelect.bind(this)} >{year}</li>
            )
        })
    }

    /**
     * Sets the year selected
     */
    onYearSelect(event) {
        this.setState({ selectedYear: event.target.id, onYearFocus: false, yearBackground: 'is-hidden' });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    /**
     * Allows the grid to display the values
     */
    getResult() {
        if (this.state.managementPortal === false) {
            if (this.state.selectedYear === '') {
                this.fetchStudentDetails();
                this.setState({ searchAllowed: true })
            } else {
                this.fetchYearwiseStudentDetails();
                this.setState({ searchAllowed: true })
            }
        } else {
            if (this.state.selectedYear !== '' && this.state.selectedDepartment !== '') {
                this.fetchStudentDetails();
                this.setState({ searchAllowed: true })
            } else {
                alert('Please select year and department')
            }
        }
    }

    /**
     * Fetches all department
     */
    fetchDepartmentDetails() {
        axios.get(`/xakal/departmentdetail`)
            .then((response) => {
                this.setState({ departmentDetails: response.data });
            });
    }


    /**
     * Displays the list of department based on the API response
     */
    displayDepartment(i) {
        if (this.state && this.state.departmentDetails && this.state.departmentDetails.length) {
            return this.state.departmentDetails.map((singleDepartment, index) => {
                return (<li className="mdl-menu__item animation" key={index}><button id={singleDepartment.name} name={singleDepartment.name} onClick={this.handleDepartmentChange.bind(this, i)}>{singleDepartment.name}</button></li>)
            });
        }
    }

    /**
     * Triggers when department dropdown is focused
     */
    onDeptDropDownFocus() {
        this.setState({ isDepartmentFocussed: 'is-focused', onDepartmentFocus: true, backgroundDepartment: 'is-shown', onYearFocus: false, yearBackground: 'is-hidden' });
    }

    /**
     * Resets the department focus based on the value selected
     */
    handleDepartmentFocus() {
        if (this.state.hasDepartmentValue === true) {
            this.setState({ isDepartmentFocussed: 'is-focused', onDepartmentFocus: false, backgroundDepartment: 'is-hidden' });
        } else {
            this.setState({ onDepartmentFocus: false, backgroundDepartment: 'is-hidden' });
        }
    }

    /**
     * Triggers when the department is changed and stores the values in state
     * @param event form values 
     */
    handleDepartmentChange(i, event) {
        this.setState({ selectedDepartment: event.target.id, onDepartmentFocus: false, backgroundDepartment: 'is-hidden', background: 'is-hidden', hasDepartmentValue: true });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20">All Students</h1>
                </div>
                <div className="row">
                    <div className="col-lg-3 p-t-20">
                        <div
                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isYearFocussed}>
                            <input onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onYearFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                value={this.state.selectedYear} />
                            <label className={"mdl-textfield__label " + this.state.yearBackground}>Year</label>
                            {this.state.onYearFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                    <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                        {this.getYear()}
                                    </ul>
                                </div>
                            </div> : <p></p>}
                        </div>

                    </div>
                    {this.state.routerLink === '/management-portal/view-student-details' ?
                        <div className="col-lg-3 p-t-20">
                            <div
                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isDepartmentFocussed}>
                                <input name="selectedDepartment" onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onDeptDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id={`department`}
                                    value={this.state.selectedDepartment} />
                                <label className={"mdl-textfield__label " + this.state.backgroundDepartment}>Department</label>
                                {this.state.onDepartmentFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                    <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                        <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                            {this.displayDepartment()}
                                        </ul>
                                    </div>
                                </div> : <p></p>}
                            </div></div> : <></>}
                    <div className="col-sm-4 p-t-20">
                        <button type="button" onClick={this.getResult.bind(this)} className="btn btn-primary m-t-15 m-l-30">Get Results!</button>
                    </div></div>
                {this.state.searchAllowed === true ?
                    <div>
                        <div className="table-scrollable">
                            <table
                                className="table table-striped table-responsive table-hover table-checkable order-column"
                                id="example4">
                                <thead>
                                    <tr>
                                        <th> Roll No </th>
                                        <th> Name </th>
                                        <th> Degree </th>
                                        <th> Department </th>
                                        <th> Email </th>
                                        <th> Mobile </th>
                                        <th> Emergency Contact </th>
                                        <th> Parents/Guardian </th>
                                        <th> Admission Date </th>
                                        <th> BG </th>
                                    </tr>
                                </thead>
                                {this.state.isEdit ?
                                    <tbody>
                                        {this.editStudentDetails()}
                                    </tbody> :
                                    this.state.isDelete ?
                                        <tbody>{this.deleteStudentDetails()}</tbody>
                                        :
                                        <tbody>
                                            {this.state.studentDetails && this.state.studentDetails.length ?
                                                this.displayStudentDetails() : <></>}
                                        </tbody>}
                            </table>
                        </div>
                        {this.state.routerLink === '/management-portal/view-student-details' || this.state.routerLink === '/hod-portal/view-student-details' ? <div hidden={this.state.isEdit} className="right p-t-20">
                            <button type="button" onClick={this.deleteRedirect.bind(this)} hidden={this.state.isDelete} className="btn btn-primary m-t-15 m-l-30">Delete Details</button>
                            {this.state.isDelete ? <button type="button" onClick={this.updateDetails.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button> : <p></p>}
                            {this.state.isDelete ? <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button> : <p></p>}
                        </div> : <p></p>}

                        {this.state.routerLink === '/management-portal/view-student-details' || this.state.routerLink === '/hod-portal/view-student-details' ? <div hidden={this.state.isDelete} className="right p-t-20">
                            <button type="button" onClick={this.redirect.bind(this)} hidden={this.state.isEdit} className="btn btn-primary m-t-15 m-l-30">Edit Details</button>
                            {this.state.isEdit ? <button type="button" onClick={this.updateDetails.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button> : <p></p>}
                            {this.state.isEdit ? <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button> : <p></p>}
                        </div> : <p></p>}
                    </div> : <></>}
            </div>
        )
    }
}

export default StudentDetailsMaintain;