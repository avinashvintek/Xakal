import React, { Component } from 'react';
import '../../styles/table.css';
import '../../minified-css/material-min.css';
import '../../styles/dropdowns.css';
import '../../styles/theme-style.css';
import axios from 'axios';
import * as moment from 'moment'
class AddStaffDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchAllowed: false,
            salaryDetails: [],
            isFocussed: '',
            onFocus: false,
            onYearFocus: false,
            isYearFocussed: '',
            selectedMonth: '',
            selectedYear: '',
            background: '',
            yearBackground: '',
            selectedDepartment: '',
            userID: '',
            staffDetails: [],
            values: [{ name: '', designation: '', qualification: '', contact: '', email: '', emergencyContact: '', joiningDate: moment(new Date()).format('YYYY-MM-DD') }]
        };
        this.baseState = this.state;

    }

    componentDidMount() {
        this.fetchDepartmentDetails();
        if (this.props && this.props.location && this.props.location.userID) {
            const userID = this.props.location.userID;
            this.setState({ userID: userID.userID });
        }
        this.unlisten = this.props.history.listen((location, action) => {
            this.setState(this.baseState);
            this.fetchDepartmentDetails();
        });
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

    componentWillUnmount() {
        this.unlisten();
    }

    /**
     * Adds the empty form element
     */
    addClick() {
        this.setState(prevState => ({ values: [...prevState.values, { name: '', designation: '', qualification: '', contact: '', email: '', emergencyContact: '', joiningDate: moment(new Date()).format('YYYY-MM-DD') }] }))
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
     * Triggers when the form is changed and stores the values in state
     * @param event form values 
     */
    handleFormChange(i, event) {
        if (event && event.target) {
            let values = [...this.state.values];
            const { name, value, } = event.target;
            values[i][name] = value;
            this.setState({ values });
        }
    }

    /**
     * Resets to base state
     */
    resetForm() {
        this.setState({ values: [{ name: '', designation: '', qualification: '', contact: '', email: '', emergencyContact: '', joiningDate: moment(new Date()).format('YYYY-MM-DD') }] })
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
    * Triggers when department dropdown is focused
    */
    onDeptDropDownFocus() {
        this.setState({ isDepartmentFocussed: 'is-focused', onDepartmentFocus: true, backgroundDepartment: 'is-shown' });
    }

    /**
     * Triggers when the department is changed and stores the values in state
     * @param event form values 
     */
    handleDepartmentChange(event) {
        this.setState({ selectedDepartment: event.target.id, onDepartmentFocus: false, backgroundDepartment: 'is-hidden', background: 'is-hidden', hasDepartmentValue: true });
        this.resetForm();
    }

    /**
     * Triggers when the form is submitted
     * Checks whether the values are entered properly
     */
    formSubmit() {
        let isUpdated = false;
        if (this.state.values && this.state.values.length > 0) {
            this.state.values.forEach(element => {
                if (element.name && element.designation && element.qualification && element.joiningDate
                    && element.contact && element.emergencyContact && element.email) {
                    const params = {
                        name: element.name,
                        qualification: element.qualification,
                        uploadedBy: this.state.userID.toUpperCase(),
                        uploadedDate: new Date(Date.now()).toLocaleString(),
                        designation: element.designation,
                        email: element.email,
                        bloodGroup: 'NA',
                        contact: element.contact,
                        emergencyContact: element.emergencyContact,
                        parentSpouse: 'NA',
                        joiningDate: element.joiningDate,
                        departmentName: this.state.selectedDepartment,
                    }
                    axios.post(`/xakal/staffdetail`, params)
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
            this.resetForm()

        } else {
            alert('Please give atleast one record to proceed')
        }
    }

    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20 m-l-20">Add Staff Details</h1>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card-box">
                            <div className="card-body row">
                                <div className="col-sm-8 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isDepartmentFocussed}>
                                        <input name="selectedDepartment" onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onDeptDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id={`department`}
                                            value={this.state.selectedDepartment} onChange={this.handleDepartmentChange.bind(this)} />
                                        <label className={"mdl-textfield__label " + this.state.backgroundDepartment}>Department</label>
                                        {this.state.onDepartmentFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                            <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                    {this.displayDepartment()}
                                                </ul>
                                            </div>
                                        </div> : <p></p>}
                                    </div>
                                </div>
                            </div>
                            {this.state.selectedDepartment !== '' ? <div>
                                {this.state.values.map((el, i) =>
                                    <div className="card-body row" key={i}>
                                        <div className="col-lg-2 p-t-20">
                                            <div
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                <input value={el.name} autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="name"
                                                    onChange={this.handleFormChange.bind(this, i)} name="name" />
                                                <label className={"mdl-textfield__label "}>Name</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 p-t-20">
                                            <div
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                <input value={el.designation} autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border"
                                                    type="text" id="designation"
                                                    onChange={this.handleFormChange.bind(this, i)} name="designation" />
                                                <label className={"mdl-textfield__label "}>Designation</label>
                                            </div>
                                        </div>

                                        <div className="col-lg-1 p-t-20">
                                            <div
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                <input value={el.qualification} autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="qualification"
                                                    onChange={this.handleFormChange.bind(this, i)} name="qualification" />
                                                <label className={"mdl-textfield__label "}>Qualification</label>
                                            </div>

                                        </div>
                                        <div className="col-lg-1 p-t-20">
                                            <div
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                <input value={el.contact} autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="number" id="contact"
                                                    onChange={this.handleFormChange.bind(this, i)} name="contact" />
                                                <label className={"mdl-textfield__label "}>Mobile</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-1 p-t-20">
                                            <div
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                <input value={el.email} autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="email" id="email"
                                                    onChange={this.handleFormChange.bind(this, i)} name="email" />
                                                <label className={"mdl-textfield__label "}>Email</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 p-t-20">
                                            <div
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                                <input value={el.emergencyContact} autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="emergencyContact"
                                                    onChange={this.handleFormChange.bind(this, i)} name="emergencyContact" />
                                                <label className={"mdl-textfield__label "}>Emergency contact</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 p-t-20">
                                            <div
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width is-focused"}>
                                                <input value={el.joiningDate || moment(new Date()).format('YYYY-MM-DD')} autoComplete="off" placeholder="" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="date" id="joiningDate"
                                                    onChange={this.handleFormChange.bind(this, i)} name="joiningDate" />
                                                <label htmlFor="joiningDate" className={"mdl-textfield__label "}>Joining date</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-2 p-t-20">
                                            <div className="row">
                                                <button type="button" onClick={this.removeClick.bind(this, i)} className=" col-sm-2 btn btn-primary m-t-15">X</button>
                                            </div>
                                        </div>

                                    </div>)}
                            </div> : <p></p>}
                            {this.state.selectedDepartment !== '' ?
                                <div className="card-body row">
                                    <div className="col-sm-8 p-t-20">
                                        <button type="button" onClick={this.addClick.bind(this)} className="btn btn-primary m-t-15">Add</button>
                                        <button type="button" onClick={this.formSubmit.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button>
                                        <button type="button" onClick={this.resetForm.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button>
                                    </div>
                                </div> : <p></p>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddStaffDetails;