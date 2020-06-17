import React, { Component } from 'react';
import axios from 'axios';
class AddPaperDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            departmentDetails: [],
            courseDetails: [],
            hasDepartmentValue: false,
            hasDegreeValue: false,
        };
        this.baseState = this.state;

    }

    componentDidMount() {
        if (this.props && this.props.location && this.props.location.userID) {
            this.setState({ routerLink: this.props.location.pathname, userID: this.props.location.userID.userID })
        }
        this.fetchDepartmentDetails();
        this.fetchDegreeDetails();
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
     * Fetches all degree
     */
    fetchDegreeDetails() {
        axios.get(`/xakal/degreecoursedetail`)
            .then((response) => {
                this.setState({ courseDetails: response.data });
            });
    }

    /**
    * Displays the list of degree based on the API response
    */
    displayDegree() {
        if (this.state && this.state.courseDetails && this.state.courseDetails.length) {
            console.log(this.state.courseDetails)
            return this.state.courseDetails.map((singleDegree, index) => {
                return (<li className="mdl-menu__item animation" key={index}><a id={singleDegree.name} onClick={this.handleDegreeChange.bind(this)}>{singleDegree.name}</a></li>)
            });
        }
    }

    /**
     * Displays the list of department based on the API response
     */
    displayDepartment() {
        if (this.state && this.state.departmentDetails && this.state.departmentDetails.length) {
            console.log(this.state.departmentDetails)
            return this.state.departmentDetails.map((singleDepartment, index) => {
                return (<li className="mdl-menu__item animation" key={index}><a id={singleDepartment.name} onClick={this.handleDepartmentChange.bind(this)}>{singleDepartment.name}</a></li>)
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
     * Triggers when degree dropdown is focused
     */
    onDegreeDropDownFocus() {
        this.setState({ isDegreeFocussed: 'is-focused', onDegreeFocus: true, backgroundDegree: 'is-shown' });
    }

    /**
     * Triggers when semester dropdown is focused
     */
    onSemesterDropDownFocus() {
        this.setState({ isFocussed: 'is-focused', onFocus: true, background: 'is-shown' });
    }

    /**
     * Triggers when name dropdown is focused
     */
    onDropDownFocus(event) {
        if (event.target) {
            event.target.parentNode.classList.add('is-focused');
            event.target.nextSibling.classList.add('is-shown');
        }
        if (this.state.hasDepartmentValue === true) {
            this.setState({ isDepartmentFocussed: 'is-focused', onDepartmentFocus: false, backgroundDepartment: 'is-hidden' });
        } else {
            this.setState({ onDepartmentFocus: false, backgroundDepartment: 'is-hidden' });
        }
        if (this.state.hasDegreeValue === true) {
            this.setState({ isDegreeFocussed: 'is-focused', onDegreeFocus: false, backgroundDegree: 'is-hidden' });
        } else {
            this.setState({ onDegreeFocus: false, backgroundDegree: 'is-hidden' });
        }
    }

    /**
     * Triggers when dropdown is focused out
     */
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
            this.setState({ [event.target.name]: event.target.value })
        }
    }

    /**
     * Triggers when the department is changed and stores the values in state
     * @param event form values 
     */
    handleDepartmentChange(event) {
        this.setState({ selectedDepartment: event.target.id, onDepartmentFocus: false, backgroundDepartment: 'is-hidden', background: 'is-hidden', hasDepartmentValue: true });
    }

    /**
     * Triggers when the degree is changed and stores the values in state
     * @param event form values 
     */
    handleDegreeChange(event) {
        this.setState({ selectedDegree: event.target.id, onDegreeFocus: false, backgroundDegree: 'is-hidden', background: 'is-hidden', hasDegreeValue: true });
    }

    /**
     * Triggers when the semester is changed and stores the values in state
     * @param event form values 
     */
    handleSemesterChange(event) {
        this.setState({ selectedSemester: event.target.id, onFocus: false, background: 'is-hidden', hasValue: true });
    }

    /**
     * Triggers when the form is submitted
     * Checks whether the values are entered properly
     */
    formSubmit() {
        let isUpdated = false;
        if (this.state.paperName && this.state.hasDegreeValue === true && this.state.hasDepartmentValue === true && this.state.hasValue === true) {
            const params = {
                course: this.state.paperName,
                semester: this.state.selectedSemester.toLowerCase(),
                updatedBy: this.state.userID.toUpperCase(),
                updatedDate: new Date(Date.now()).toLocaleString(),
                department: this.state.selectedDepartment,
                degree: this.state.selectedDegree,
            }
            axios.post(`/xakal/coursedetail`, params)
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
    }

    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20 m-l-20">Add Paper</h1>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card-box">
                            <div className="card-body row">
                                <div className="col-lg-6 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="name"
                                            onChange={this.handleFormChange.bind(this)} name="paperName" />
                                        <label className={"mdl-textfield__label "}>Name</label>
                                    </div>
                                </div>
                                <div className="col-lg-6 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isDegreeFocussed}>
                                        <input name="selectedDegree" autoComplete="off" onFocus={this.onDegreeDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="degree"
                                            value={this.state.selectedDegree} />
                                        <label className={"mdl-textfield__label " + this.state.backgroundDegree}>Degree</label>
                                        {this.state.onDegreeFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                            <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                    {this.displayDegree()}
                                                </ul>
                                            </div>
                                        </div> : <p></p>}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body row">
                                <div className="col-lg-6 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isDepartmentFocussed}>
                                        <input name="selectedDepartment" autoComplete="off" onFocus={this.onDeptDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="department"
                                            value={this.state.selectedDepartment} />
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
                                <div className="col-lg-6 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isFocussed}>
                                        <input autoComplete="off" onFocus={this.onSemesterDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.selectedSemester} />
                                        <label className={"mdl-textfield__label " + this.state.background}>Semester</label>
                                        {this.state.onFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                            <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                    <li className="mdl-menu__item animation" id="Semester 1" onClick={this.handleSemesterChange.bind(this)} >Semester 1</li>
                                                    <li className="mdl-menu__item animation1" id="Semester 2" onClick={this.handleSemesterChange.bind(this)} >Semester 2</li>
                                                    <li className="mdl-menu__item animation2" id="Semester 3" onClick={this.handleSemesterChange.bind(this)} >Semester 3</li>
                                                    <li className="mdl-menu__item animation" id="Semester 4" onClick={this.handleSemesterChange.bind(this)} >Semester 4</li>
                                                    <li className="mdl-menu__item animation1" id="Semester 5" onClick={this.handleSemesterChange.bind(this)} >Semester 5</li>
                                                    <li className="mdl-menu__item animation2" id="Semester 6" onClick={this.handleSemesterChange.bind(this)} >Semester 6</li>
                                                    <li className="mdl-menu__item animation" id="Semester 7" onClick={this.handleSemesterChange.bind(this)} >Semester 7</li>
                                                    <li className="mdl-menu__item animation1" id="Semester 8" onClick={this.handleSemesterChange.bind(this)} >Semester 8</li>
                                                </ul>
                                            </div>
                                        </div> : <p></p>}
                                    </div>
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

export default AddPaperDetails;