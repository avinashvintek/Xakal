import React, { Component } from 'react';
import '../styles/navbar.css'
import { BrowserRouter as Router } from 'react-router-dom'
import '../styles/table.css';
import '../minified-css/material-min.css';
import '../styles/dropdowns.css';
import '../styles/theme-style.css';
import axios from 'axios';
import moment from 'moment';

class XakalAdminPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showClassNotes: false,
            assessments: false,
            routerLink: '',
            degreeDetails: [],
            departmentDetails: [],
            userID: props.location.state.userID,
            values: [{
                userID: '', password: '', collegeCode: '', collegeName: '', selectedDepartment: '', degreeName: '', studentName: '',
                admissionDate: moment(new Date()).format('YYYY-MM-DD'), admissionYear: 2020, email: '', contact: '', emergencyContact: '', parentName: '', address: '', gender: '', dob: moment(new Date()).format('YYYY-MM-DD'), motherTongue: '', bloodGroup: ''
            }]
        }
        this.baseState = this.state;
    }
    fetchPaperDetails() {
        this.setState({ searchAllowed: true });
        this.deleteArray = [];
        axios.get(`/xakal/degreecoursedetail`)
            .then((response) => {
                this.setState({ degreeDetails: response.data });
            });
    }

    logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state && !this.props.location.state.userID) {
            alert('Please login again! Session expired!')
            this.logout()
        } else {
            this.fetchPaperDetails();
            this.fetchDepartmentDetails();
            if (this.props && this.props.state && this.props.state.location && this.props.state.location.state) {
                if (this.props.state.location.state.userRole === 'student') {
                    this.setState({ routerLink: '/students-portal' });
                } else if (this.props.state.location.state.userRole === 'staff') {
                    this.setState({ routerLink: '/staff-portal' });
                }
                else if (this.props.state.location.state.userRole === 'non-teaching') {
                    this.setState({ routerLink: '/non-teaching-portal' });
                }
            }
        }
    }

    componentWillUnmount() {
        // this.unlisten();
    }

    /**
     * Triggers when semester dropdown is focused
     */
    onSemesterDropDownFocus(i) {
        this.setState({ isFocussed: 'is-focused', selectedIndex: i, onFocus: true, background: 'is-shown' });
        this.handleDepartmentFocus()

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
     * Triggers when name dropdown is focused
     */
    onDropDownFocus(event) {
        if (event.target) {
            event.target.parentNode.classList.add('is-focused');
            event.target.nextSibling.classList.add('is-shown');
        }
        this.handleDepartmentFocus();
    }

    onFocusOut(event) {
        if (event.target) {
            if (event.target.value === '') {
                event.target.parentNode.classList.remove('is-focused');
            }
            event.target.nextSibling.classList.remove('is-shown');
        }
    }

    /**
     * Triggers when the form is changed and stores the values in state
     * @param event form values 
     */
    handleFormChange(i, event) {
        if (event && event.target) {
            let values = [...this.state.values];
            const { name, value } = event.target;
            if (event.target.value !== '') {
                values[i][name] = value;
                this.setState({ values });

            } else {
                let values = [...this.state.values];
                const { name } = event.target;
                values[i][name] = '';
                this.setState({ values });
            }
            if (event.target.name === "admissionDate") {
                const admissionYear = (new Date(event.target.value)).getFullYear();
                values[i]['admissionYear'] = admissionYear;
                this.setState({ values });
            }
        }
    }

    /**
     * Adds the empty form element
     */
    addClick() {
        this.setState(prevState => ({
            values: [...prevState.values, {
                userID: '', password: '', collegeCode: '', collegeName: '', selectedDepartment: '', degreeName: '', studentName: '',
                admissionDate: moment(new Date()).format('YYYY-MM-DD'), admissionYear: 2020, email: '', contact: '', emergencyContact: '', parentName: '', address: '', gender: '', dob: moment(new Date()).format('YYYY-MM-DD'), motherTongue: '', bloodGroup: ''
            },]
        }))
    }

    /**
     * Removes the selected row
     * @param i selected row index
     */
    removeClick(i) {
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }

    /**
     * Resets to base state
     */
    resetForm() {
        this.setState({
            values: [{
                userID: '', password: '', collegeCode: '', collegeName: '', selectedDepartment: '', degreeName: '', studentName: '',
                admissionDate: moment(new Date()).format('YYYY-MM-DD'), admissionYear: 2020, email: '', contact: '', emergencyContact: '', parentName: '', address: '', gender: '', dob: moment(new Date()).format('YYYY-MM-DD'), motherTongue: '', bloodGroup: ''
            }]
        })
    }

    /**
     * Triggers when the form is submitted
     * Checks whether the values are entered properly
     */
    formSubmit() {
        let isUpdated = false;
        if (this.state.values && this.state.values.length > 0) {
            this.state.values.forEach(element => {
                if (element.userID && element.password && this.state.collegeCode && this.state.collegeName) {
                    const params = {
                        userID: element.userID.toUpperCase(),
                        password: element.password,
                        userRole: 'student',
                        updatedBy: this.state.userID.toUpperCase(),
                        updatedDate: new Date(Date.now()).toLocaleString(),
                        collegeCode: this.state.collegeCode,
                        collegeName: this.state.collegeName,
                        registerNr: ''
                    }
                    axios.post(`/xakal/adduser`, params)
                        .then(() => {
                            if (!isUpdated) {
                                alert('Updated Successfully');
                            }
                            isUpdated = true;
                        })
                        .catch((err) => console.log(err));
                } else {
                    alert('Please give all the details')
                }
            });
            this.insertStudentDetails()

        } else {
            alert('Please give atleast one record to proceed')
        }
    }

    insertStudentDetails() {
        let isUpdated = false;
        if (this.state.values && this.state.values.length > 0) {
            this.state.values.forEach(element => {
                if (element.studentName && element.degreeName && element.selectedDepartment) {
                    const params = {
                        userID: element.userID.toUpperCase(),
                        name: element.studentName,
                        course: element.degreeName,
                        branch: element.selectedDepartment,
                        email: element.email,
                        bloodGroup: element.bloodGroup,
                        contact: element.contact,
                        emergencyContact: element.emergencyContact,
                        parentName: element.parentName,
                        admissionDate: element.admissionDate,
                        admissionYear: element.admissionYear,
                        updatedBy: this.state.userID.toUpperCase(),
                        updatedDate: new Date(Date.now()).toLocaleString(),
                        gender: element.gender,
                        motherTongue: element.motherTongue,
                        address: element.address,
                        dob: element.dob
                    }
                    axios.post(`/xakal/studentdetail`, params)
                        .then(() => {
                            if (!isUpdated) {
                                alert('Updated Successfully');
                            }
                            isUpdated = true;
                            this.setState(this.baseState)
                        })
                        .catch((err) => console.log(err));
                } else {
                    alert('Please give all the details')
                }
            });
            this.resetForm()
        }
    }

    /**
    * Triggers when degree dropdown is focused
    */
    onDegreeDropDownFocus(i) {
        this.setState({ isDegreeFocussed: 'is-focused', selectedDegreeIndex: i, onDegreeFocus: true, backgroundDegree: 'is-shown' });
    }

    /**
    * Triggers when blood group dropdown is focused
    */
    onBloodGroupDropDownFocus(i) {
        this.setState({ isBloodFocussed: 'is-focused', selectedBGIndex: i, onBloodFocus: true, backgroundBlood: 'is-shown' });
    }

    onGenderDropDownFocus(i) {
        this.setState({ isGenderFocussed: 'is-focused', selectedGenderIndex: i, onGenderFocus: true, backgroundGender: 'is-shown' });
    }

    displayDegree(i) {
        if (this.state && this.state.degreeDetails && this.state.degreeDetails.length) {
            return this.state.degreeDetails.map((singleDegree, index) => {
                return (<li className="mdl-menu__item animation" key={index}><button id={singleDegree.name} name={singleDegree.name} onClick={this.handleDegreeChange.bind(this, i)}>{singleDegree.name}</button></li>)
            });
        }
    }

    /**
     * Triggers when the Degree is changed and stores the values in state
     * @param event form values 
     */
    handleDegreeChange(i, event) {
        this.setState({ degreeName: event.target.id, onDegreeFocus: false, backgroundDegree: 'is-hidden', background: 'is-hidden', hasDegreeValue: true });
        let values = [...this.state.values];
        values[i]['degreeName'] = event.target.name;
        this.setState({ values });
    }

    /**
    * Triggers when the Degree is changed and stores the values in state
    * @param event form values 
    */
    onBloodGroupSelect(i, event) {
        this.setState({ bloodGroup: event.target.id, onBloodFocus: false, backgroundBlood: 'is-hidden', background: 'is-hidden', hasBloodValue: true });
        let values = [...this.state.values];
        values[i]['bloodGroup'] = event.target.id;
        this.setState({ values });
    }

    onGenderGroupSelect(i, event) {
        this.setState({ gender: event.target.id, onGenderFocus: false, backgroundGender: 'is-hidden', backgroundBlood: 'is-hidden', hasGenderValue: true });
        let values = [...this.state.values];
        values[i]['gender'] = event.target.id;
        this.setState({ values });
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
    * Triggers when the department is changed and stores the values in state
    * @param event form values 
    */
    handleDepartmentChange(i, event) {
        this.setState({ selectedDepartment: event.target.id, onDepartmentFocus: false, backgroundDepartment: 'is-hidden', background: 'is-hidden', hasDepartmentValue: true });
        let values = [...this.state.values];
        values[i]['selectedDepartment'] = event.target.name;
        this.setState({ values });
    }

    /**
     * Triggers when department dropdown is focused
     */
    onDeptDropDownFocus(i) {
        this.setState({ isDepartmentFocussed: 'is-focused', selectedDepartmentIndex: i, onDepartmentFocus: true, backgroundDepartment: 'is-shown' });
    }

    collegeDetailsChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <Router>
                <div id="wrapper bg-color-white">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <button className="btn btn-sm btn-primary shadow-sm logout m-t-20 m-r-20" onClick={this.logout.bind(this)}> <i className="fa fa-power-off m-r-15"></i>Logout</button>
                            {this.props && this.props.location && this.props.location.state && this.props.location.state.userDetails ?
                                <><p className="logout m-t-30 m-r-40">{this.props.location.state.userDetails.userRole.charAt(0).toUpperCase() + this.props.location.state.userDetails.userRole.slice(1)} Dashboard</p>
                                    <p className="logout m-t-30 m-r-40">{this.props.location.state.userDetails.userID}</p>
                                </> : <></>}
                            <div>
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800 m-t-20 m-l-20">Add User Details</h1>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card-box">
                                            <div className="card-body row">
                                                <div className="col-lg-2 p-t-20">
                                                    <div
                                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onChange={this.collegeDetailsChange.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id={`collegeCode`}
                                                            value={this.state.collegeCode || ''} name="collegeCode" />
                                                        <label className={"mdl-textfield__label "}>College Code</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 p-t-20">
                                                    <div
                                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onChange={this.collegeDetailsChange.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id={`collegeName`}
                                                            value={this.state.collegeName || ''} name="collegeName" />
                                                        <label className={"mdl-textfield__label "}>College Name</label>
                                                    </div>
                                                </div>
                                            </div>
                                            {this.state.values.map((el, i) =>
                                                <div className="card-body row" key={i}>
                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                            <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id={`name${i}`}
                                                                value={el.userID || ''} onChange={this.handleFormChange.bind(this, i)} name="userID" />
                                                            <label className={"mdl-textfield__label "}>User ID</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                            <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id={`password${i}`}
                                                                value={el.password || ''} onChange={this.handleFormChange.bind(this, i)} name="password" />
                                                            <label className={"mdl-textfield__label "}>Password</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                            <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                                                value={el.studentName || ''} onChange={this.handleFormChange.bind(this, i)} name="studentName" />
                                                            <label className={"mdl-textfield__label "}>Name</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isDepartmentFocussed}>
                                                            <input name="selectedDepartment" onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onDeptDropDownFocus.bind(this, i)} className="mdl-textfield__input display-border" type="text" id={`department`}
                                                                value={el.selectedDepartment || ''} onChange={this.handleFormChange.bind(this, i)} />
                                                            <label className={"mdl-textfield__label " + this.state.backgroundDepartment}>Department</label>
                                                            {this.state.onDepartmentFocus && this.state.selectedDepartmentIndex === i ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                                <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                                    <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                                        {this.displayDepartment(i)}
                                                                    </ul>
                                                                </div>
                                                            </div> : <p></p>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isDegreeFocussed}>
                                                            <input name="degreeName" onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onDegreeDropDownFocus.bind(this, i)} className="mdl-textfield__input display-border" type="text" id={`degree`}
                                                                value={el.degreeName || ''} onChange={this.handleFormChange.bind(this, i)} />
                                                            <label className={"mdl-textfield__label " + this.state.backgroundDegree}>Degree</label>
                                                            {this.state.onDegreeFocus && this.state.selectedDegreeIndex === i ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                                <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                                    <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                                        {this.displayDegree(i)}
                                                                    </ul>
                                                                </div>
                                                            </div> : <p></p>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                            <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                                                value={el.email || ''} onChange={this.handleFormChange.bind(this, i)} name="email" />
                                                            <label className={"mdl-textfield__label "}>Email</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                            <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                                                value={el.contact || ''} onChange={this.handleFormChange.bind(this, i)} name="contact" />
                                                            <label className={"mdl-textfield__label "}>Mobile</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                            <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                                                value={el.emergencyContact || ''} onChange={this.handleFormChange.bind(this, i)} name="emergencyContact" />
                                                            <label className={"mdl-textfield__label "}>Emergency Contact</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                            <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                                                value={el.parentName || ''} onChange={this.handleFormChange.bind(this, i)} name="parentName" />
                                                            <label className={"mdl-textfield__label "}>Parents / Guardian Name</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width is-focused"}>
                                                            <input value={el.admissionDate || moment(new Date()).format('YYYY-MM-DD')} onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} autoComplete="off" className="mdl-textfield__input display-border" type="date" id="sample2"
                                                                onChange={this.handleFormChange.bind(this, i)} name="admissionDate" />
                                                            <label className={"mdl-textfield__label "}>Admission Date</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                            <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="address"
                                                                value={el.address || ''} onChange={this.handleFormChange.bind(this, i)} name="address" />
                                                            <label className={"mdl-textfield__label "}>Address</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isGenderFocussed}>
                                                            <input name="gender" onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onGenderDropDownFocus.bind(this, i)} className="mdl-textfield__input display-border" type="text" id={`Gender`}
                                                                value={el.gender || ''} onChange={this.handleFormChange.bind(this, i)} />
                                                            <label className={"mdl-textfield__label " + this.state.backgroundBlood}>Gender</label>
                                                            {this.state.onGenderFocus && this.state.selectedGenderIndex === i ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                                <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                                    <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                                        <li className="mdl-menu__item animation" id="Male" onClick={this.onGenderGroupSelect.bind(this, i)} >Male</li>
                                                                        <li className="mdl-menu__item animation1" id="Female" onClick={this.onGenderGroupSelect.bind(this, i)} >Female</li>
                                                                        <li className="mdl-menu__item animation2" id="Others" onClick={this.onGenderGroupSelect.bind(this, i)} >Others</li>
                                                                    </ul>
                                                                </div>
                                                            </div> : <p></p>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width is-focused"}>
                                                            <input value={el.dob || moment(new Date()).format('YYYY-MM-DD')} onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} autoComplete="off" className="mdl-textfield__input display-border" type="date" id="dob"
                                                                onChange={this.handleFormChange.bind(this, i)} name="dob" />
                                                            <label className={"mdl-textfield__label "}>DOB</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                            <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="motherTongue"
                                                                value={el.motherTongue || ''} onChange={this.handleFormChange.bind(this, i)} name="motherTongue" />
                                                            <label className={"mdl-textfield__label "}>Mother Tongue</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-2 p-t-20">
                                                        <div
                                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isBloodFocussed}>
                                                            <input name="bloodGroup" onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onBloodGroupDropDownFocus.bind(this, i)} className="mdl-textfield__input display-border" type="text" id={`Blood`}
                                                                value={el.bloodGroup || ''} onChange={this.handleFormChange.bind(this, i)} />
                                                            <label className={"mdl-textfield__label " + this.state.backgroundBlood}>Blood Group</label>
                                                            {this.state.onBloodFocus && this.state.selectedBGIndex === i ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                                <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                                    <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                                        <li className="mdl-menu__item animation" id="A+" onClick={this.onBloodGroupSelect.bind(this, i)} >A+</li>
                                                                        <li className="mdl-menu__item animation1" id="A-" onClick={this.onBloodGroupSelect.bind(this, i)} >A-</li>
                                                                        <li className="mdl-menu__item animation2" id="B+" onClick={this.onBloodGroupSelect.bind(this, i)} >B+</li>
                                                                        <li className="mdl-menu__item animation" id="B-" onClick={this.onBloodGroupSelect.bind(this, i)} >B-</li>
                                                                        <li className="mdl-menu__item animation1" id="O+" onClick={this.onBloodGroupSelect.bind(this, i)} >O+</li>
                                                                        <li className="mdl-menu__item animation2" id="O-" onClick={this.onBloodGroupSelect.bind(this, i)} >O-</li>
                                                                        <li className="mdl-menu__item animation" id="AB+" onClick={this.onBloodGroupSelect.bind(this, i)} >AB+</li>
                                                                        <li className="mdl-menu__item animation1" id="AB-" onClick={this.onBloodGroupSelect.bind(this, i)} >AB-</li>
                                                                    </ul>
                                                                </div>
                                                            </div> : <p></p>}
                                                        </div>

                                                    </div >
                                                    <div className="col-sm-1 p-t-20">
                                                        <button type="button" onClick={this.removeClick.bind(this, i)} className="btn btn-primary m-t-15 m-l-30">X</button>
                                                    </div>
                                                </div>)}
                                            <div className="col-sm-8 p-t-20">
                                                <button type="button" onClick={this.addClick.bind(this)} className="btn btn-primary m-t-15 m-l-30">Add</button>
                                                <button type="button" onClick={this.formSubmit.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button>
                                                <button type="button" onClick={this.resetForm.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Router>
        )
    }
}

export default XakalAdminPortal;