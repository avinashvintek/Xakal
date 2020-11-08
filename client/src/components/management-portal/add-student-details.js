import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
class AddStudentDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            studentName: '',
            departmentDetails: [],
            degreeDetails: [],
            departmentName: '',
            degreeName: '',
            email: '',
            bloodGroup: '',
            contact: '',
            emergencyContact: '',
            parentName: '',
            admissionYear: (new Date()).getFullYear(),
            admissionDate: moment(new Date()).format('YYYY-MM-DD')
        };
        this.baseState = this.state;

    }

    componentDidMount() {
        this.fetchDepartmentDetails();
        this.fetchPaperDetails()
    }

    fetchPaperDetails() {
        this.setState({ searchAllowed: true });
        this.deleteArray = [];
        axios.get(`/xakal/degreecoursedetail`)
            .then((response) => {
                this.setState({ degreeDetails: response.data, values: response.data });
            });
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
    displayDepartment() {
        if (this.state && this.state.departmentDetails && this.state.departmentDetails.length) {
            return this.state.departmentDetails.map((singleDepartment, index) => {
                return (<li className="mdl-menu__item animation" key={index}><button id={singleDepartment.name} name={singleDepartment.name} onClick={this.handleDepartmentChange.bind(this)}>{singleDepartment.name}</button></li>)
            });
        }
    }

    /**
     * Triggers when the department is changed and stores the values in state
     * @param event form values 
     */
    handleDepartmentChange(event) {
        this.setState({ departmentName: event.target.id, onDepartmentFocus: false, backgroundDepartment: 'is-hidden', background: 'is-hidden', hasDepartmentValue: true });
    }

    /**
     * Displays the list of degree based on the API response
     */
    displayDegree() {
        if (this.state && this.state.degreeDetails && this.state.degreeDetails.length) {
            return this.state.degreeDetails.map((singleDegree, index) => {
                return (<li className="mdl-menu__item animation" key={index}><button id={singleDegree.name} name={singleDegree.name} onClick={this.handleDegreeChange.bind(this)}>{singleDegree.name}</button></li>)
            });
        }
    }

    /**
     * Triggers when the Degree is changed and stores the values in state
     * @param event form values 
     */
    handleDegreeChange(event) {
        this.setState({ degreeName: event.target.id, onDegreeFocus: false, backgroundDegree: 'is-hidden', background: 'is-hidden', hasDegreeValue: true });
    }

    /**
    * Triggers when the Degree is changed and stores the values in state
    * @param event form values 
    */
    onBloodGroupSelect(event) {
        this.setState({ bloodGroup: event.target.id, onBloodFocus: false, backgroundBlood: 'is-hidden', background: 'is-hidden', hasBloodValue: true });
    }

    onDropDownFocus(event) {
        if (event.target) {
            event.target.parentNode.classList.add('is-focused');
            event.target.nextSibling.classList.add('is-shown');
        }
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
    handleFormChange(event) {
        if (event.target.value) {
            this.setState({ [event.target.name]: event.target.value });
            if (event.target.name === "admissionDate") {
                const admissionYear = (new Date(event.target.value)).getFullYear();
                this.setState({ admissionYear: admissionYear })
            }
        }
    }

    /**
     * Triggers when the form is submitted
     * Checks whether the values are entered properly
     */
    formSubmit() {
        let isUpdated = false;
        if (this.state.studentName && this.state.degreeName && this.state.departmentName && this.state.email && this.state.bloodGroup && this.state.contact &&
            this.state.emergencyContact && this.state.parentName && this.state.admissionDate) {
            const params = {
                name: this.state.studentName,
                course: this.state.degreeName,
                branch: this.state.departmentName,
                email: this.state.email,
                bloodGroup: this.state.bloodGroup,
                contact: this.state.contact,
                emergencyContact: this.state.emergencyContact,
                parentName: this.state.parentName,
                admissionDate: this.state.admissionDate,
                admissionYear: this.state.admissionYear
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
    }

    /**
    * Triggers when department dropdown is focused
    */
    onDeptDropDownFocus() {
        this.setState({ isDepartmentFocussed: 'is-focused', onDepartmentFocus: true, backgroundDepartment: 'is-shown' });
    }


    /**
    * Triggers when degree dropdown is focused
    */
    onDegreeDropDownFocus() {
        this.setState({ isDegreeFocussed: 'is-focused', onDegreeFocus: true, backgroundDegree: 'is-shown' });
    }

    /**
    * Triggers when blood group dropdown is focused
    */
    onBloodGroupDropDownFocus() {
        this.setState({ isBloodFocussed: 'is-focused', onBloodFocus: true, backgroundBlood: 'is-shown' });
    }

    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20 m-l-20">Add Student</h1>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card-box">
                            <div className="card-body row">
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.studentName} onChange={this.handleFormChange.bind(this)} name="studentName" />
                                        <label className={"mdl-textfield__label "}>Name</label>
                                    </div>
                                </div>
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isDepartmentFocussed}>
                                        <input name="departmentName" onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onDeptDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id={`department`}
                                            value={this.state.departmentName || ''} onChange={this.handleFormChange.bind(this)} />
                                        <label className={"mdl-textfield__label " + this.state.backgroundDepartment}>Department</label>
                                        {this.state.onDepartmentFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                            <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                    {this.displayDepartment()}
                                                </ul>
                                            </div>
                                        </div> : <p></p>}
                                    </div>
                                    {/* <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            onChange={this.handleFormChange.bind(this)} name="departmentName"
                                        />
                                        <label className={"mdl-textfield__label "}>Department</label>
                                    </div> */}
                                </div>
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isDegreeFocussed}>
                                        <input name="degreeName" onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onDegreeDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id={`degree`}
                                            value={this.state.degreeName || ''} onChange={this.handleFormChange.bind(this)} />
                                        <label className={"mdl-textfield__label " + this.state.backgroundDegree}>Degree</label>
                                        {this.state.onDegreeFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                            <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                    {this.displayDegree()}
                                                </ul>
                                            </div>
                                        </div> : <p></p>}
                                    </div>
                                    {/* <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            onChange={this.handleFormChange.bind(this)} name="degreeName" />
                                        <label className={"mdl-textfield__label "}>Degree</label>
                                    </div> */}
                                </div>
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.email} onChange={this.handleFormChange.bind(this)} name="email" />
                                        <label className={"mdl-textfield__label "}>Email</label>
                                    </div>
                                </div>
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.contact} onChange={this.handleFormChange.bind(this)} name="contact" />
                                        <label className={"mdl-textfield__label "}>Mobile</label>
                                    </div>
                                </div>
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.emergencyContact} onChange={this.handleFormChange.bind(this)} name="emergencyContact" />
                                        <label className={"mdl-textfield__label "}>Emergency Contact</label>
                                    </div>
                                </div>

                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.parentName} onChange={this.handleFormChange.bind(this)} name="parentName" />
                                        <label className={"mdl-textfield__label "}>Parents / Guardian Name</label>
                                    </div>
                                </div>

                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width is-focused"}>
                                        <input value={this.state.admissionDate || moment(new Date()).format('YYYY-MM-DD')} autoComplete="off" className="mdl-textfield__input display-border" type="date" id="sample2"
                                            onChange={this.handleFormChange.bind(this)} name="admissionDate" />
                                        <label className={"mdl-textfield__label "}>Admission Date</label>
                                    </div>
                                </div>

                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isBloodFocussed}>
                                        <input name="bloodGroup" onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onBloodGroupDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id={`Blood`}
                                            value={this.state.bloodGroup || ''} onChange={this.handleFormChange.bind(this)} />
                                        <label className={"mdl-textfield__label " + this.state.backgroundBlood}>Blood Group</label>
                                        {this.state.onBloodFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                            <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                    <li className="mdl-menu__item animation" id="A+" onClick={this.onBloodGroupSelect.bind(this)} >A+</li>
                                                    <li className="mdl-menu__item animation1" id="A-" onClick={this.onBloodGroupSelect.bind(this)} >A-</li>
                                                    <li className="mdl-menu__item animation2" id="B+" onClick={this.onBloodGroupSelect.bind(this)} >B+</li>
                                                    <li className="mdl-menu__item animation" id="B-" onClick={this.onBloodGroupSelect.bind(this)} >B-</li>
                                                    <li className="mdl-menu__item animation1" id="O+" onClick={this.onBloodGroupSelect.bind(this)} >O+</li>
                                                    <li className="mdl-menu__item animation2" id="O-" onClick={this.onBloodGroupSelect.bind(this)} >O-</li>
                                                    <li className="mdl-menu__item animation" id="AB+" onClick={this.onBloodGroupSelect.bind(this)} >AB+</li>
                                                    <li className="mdl-menu__item animation1" id="AB-" onClick={this.onBloodGroupSelect.bind(this)} >AB-</li>
                                                </ul>
                                            </div>
                                        </div> : <p></p>}
                                    </div>
                                    {/* <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            onChange={this.handleFormChange.bind(this)} name="bloodGroup" />
                                        <label className={"mdl-textfield__label "}>Blood Group</label>
                                    </div> */}
                                </div>
                            </div>
                            <div className="col-sm-8 p-t-20">
                                <button type="button" onClick={this.formSubmit.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button>
                                <button type="button" className="btn btn-primary m-t-15 m-l-30">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default AddStudentDetails;