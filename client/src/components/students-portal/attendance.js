import React, { Component } from 'react';
import '../../styles/table.css';
import '../../minified-css/material-min.css';
import '../../styles/dropdowns.css';
import '../../styles/theme-style.css';
import axios from 'axios';
import moment from 'moment';

class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column1: '',
            column2: '',
            selectedSemester: '',
            searchAllowed: false,
            absenceList: [],
            background: '',
            isFocussed: '',
            onFocus: false,
            userID: '',
            isManagementPortal: false
        };
        this.baseState = this.state;

    }

    componentDidMount() {
        this.getPortal();
        if (this.props && this.props.location && this.props.location.userID) {
            const userID = this.props.location.userID;
            this.setState({ userID: userID.userID });
        }
        this.unlisten = this.props.history.listen((location, action) => {
            this.setState(this.baseState);
            this.getPortal();
        });
    }

    /**
     * Checks for portal logged in
     */
    getPortal() {
        const pathArray = this.props.location.pathname.split('/');
        if (pathArray.includes('management-portal') || pathArray.includes('hod-portal')) {
            this.setState({ isManagementPortal: true, });
            this.fetchDepartmentDetails();
        } else {
            this.setState({ isManagementPortal: false, })
        }
    }

    componentWillUnmount() {
        this.unlisten();
    }

    /**
     * Adds the hover class when date is hovered
     */
    dateHover(event) {
        var element = event.target.className;
        if (element === 'column100 column2 ') {
            this.setState({ column1: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when reason is hovered
     */
    reasonHover(event) {
        var element = event.target.className;
        if (element === 'column100 column3 ') {
            this.setState({ column2: 'hov-column-head-ver5' })
        }
    }

    typeHover(event) {
        var element = event.target.className;
        if (element === 'column100 column4 ') {
            this.setState({ column2: 'hov-column-head-ver5' })
        }
    }

    actionHover(event) {
        var element = event.target.className;
        if (element === 'column100 column5 ') {
            this.setState({ column2: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when userID is hovered
     */
    userHover(event) {
        var element = event.target.className;
        if (element === 'column100 column4 ') {
            this.setState({ column3: 'hov-column-head-ver5' })
        }
    }

    /**
     * Resets the state variables when hover is removed
     */
    hoverOff() {
        this.setState({
            column1: '',
            column2: '',
            column3: '',
            column4: ''
        })
    }

    /**
     * Sets the semester selected
     */
    onDropDownSelect(event) {
        this.setState({ selectedSemester: event.target.id, onFocus: false, background: 'is-hidden', hasSemesterValue: true });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    onDropDownFocus() {
        this.setState({ isFocussed: 'is-focused', onFocus: true, background: 'is-shown' });
        if (this.state.hasDepartmentValue) {
            this.setState({ onDepartmentFocus: false, backgroundDepartment: 'is-hidden', isDepartmentFocussed: 'is-focused' });
        } else {
            this.setState({ onDepartmentFocus: false, backgroundDepartment: 'is-hidden', isDepartmentFocussed: 'is-hidden' });
        }
    }

    /**
     * Allows the grid to display the values
     */
    getResult() {
        if (this.state.selectedSemester !== '' && this.state.selectedDepartment !== '') {
            this.fetchAbsenceDetails();
        } else {
            alert('Please select department and semester');
            this.setState({ searchAllowed: false })
        }

    }


    /**
     * Fetches the date of absence based on semester selected
     */
    fetchAbsenceDetails() {
        var userID;
        this.setState({ searchAllowed: true });
        var semester = this.state.selectedSemester;
        if (this.state.isManagementPortal === true) {
            userID = { userID: this.state.selectedStudent };
        } else {
            userID = { userID: this.state.userID };
        }
        axios.get(`/xakal/attendance/studentleave/${semester}`, { params: userID })
            .then((response) => {
                this.setState({ absenceList: response.data });
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
    * Triggers when department dropdown is focused
    */
    onDeptDropDownFocus() {
        this.setState({ isDepartmentFocussed: 'is-focused', onDepartmentFocus: true, backgroundDepartment: 'is-shown' });
        if (this.state.hasSemesterValue) {
            this.setState({ onFocus: false, background: 'is-hidden', isFocussed: 'is-focused' });
        } else {
            this.setState({ onFocus: false, background: 'is-hidden', isFocussed: 'is-hidden' });
        }
    }

    /**
     * Triggers when the department is changed and stores the values in state
     * @param event form values 
     */
    handleDepartmentChange(event) {
        this.setState({ selectedDepartment: event.target.id, onDepartmentFocus: false, backgroundDepartment: 'is-hidden', background: 'is-hidden', hasDepartmentValue: true });
        this.fetchStudentDetailsByDept(event.target.id);
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
    * Fetches all students for selected department
    */
    fetchStudentDetailsByDept(departmentName) {
        this.setState({ studentDetails: [] })
        axios.get(`/xakal/studentdetail/department/${departmentName}`)
            .then((response) => {
                this.setState({ studentDetails: response.data });
            });
    }

    /**
    * Removes the selected row
    * @param index selected row index
    */
    removeClick(singleData, i) {
        if (moment(new Date(singleData.fromDate)).isBefore(moment(new Date()))) {
            alert('Cannot cancel this leave. Please contact admin.')
        } else {
            if (window.confirm('Are you sure to cancel this leave?')) {
                let absenceList = [...this.state.absenceList];
                absenceList.splice(i, 1);
                this.setState({ absenceList });
                axios.put(`/xakal/attendance/cancelLeave/${singleData._id}`)
                    .then((response) => {
                        // this.setState({ studentDetails: response.data });
                    });
            }
        }
    }


    /**
     * Displays the list of notes based on the API response
     */
    displayTable() {
        let counter = 0;
        return this.state.absenceList.map((singleData, index) => {
            const fromDate = moment(new Date(singleData.fromDate)).format('MM/DD/YYYY');
            const toDate = moment(new Date(singleData.toDate)).format('MM/DD/YYYY');
            return (
                <tr className="row100">
                    <td className="column100 column1" key={counter++} data-column="column1">{++index}</td>
                    <td className={"column100 column2 "} key={counter++} onMouseEnter={this.userHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.userID}</td>
                    <td className={"column100 column2 "} key={counter++} onMouseEnter={this.dateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{fromDate} - {toDate}</td>
                    <td className={"column100 column3 "} key={counter++} onMouseEnter={this.reasonHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.reason}</td>
                    <td className={"column100 column4 "} key={counter++} onMouseEnter={this.typeHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.type}</td>
                    {this.state.isManagementPortal ? <td className={"column100 column5 "} key={counter++} onMouseEnter={this.actionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>
                        <button type="button" onClick={i => this.removeClick(singleData, index -= 4)} className="btn btn-danger m-t-4">Cancel Leave</button>
                    </td> : <></>}
                </tr>
            )
        })
    }

    /**
    * Triggers when student is focused
    */
    onStudentFocussed() {
        this.setState({ isStudentFocussed: 'is-focused', onFocus: false, onStudentFocus: true, backgroundStudent: 'is-shown' });
    }

    /**
     * Triggers when the student is changed and stores the values in state
     * @param event form values 
     */
    handleStudentChange(event) {
        this.setState({ selectedStudentName: event.target.name, selectedStudent: event.target.id, onStudentFocus: false, backgroundStudent: 'is-hidden' });
    }

    /**
   * Displays the list of student based on the API response
   */
    displayStudent() {
        if (this.state && this.state.studentDetails && this.state.studentDetails.length) {
            return this.state.studentDetails.map((singleStudent, index) => {
                return (<li className="mdl-menu__item animation" key={index}><button id={singleStudent.userID} name={singleStudent.name} onClick={this.handleStudentChange.bind(this)}>{singleStudent.name}</button></li>)
            });
        }
    }

    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20 m-l-20">Students Attendance</h1>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card-box">
                            <div className="card-body row">
                                {this.state.isManagementPortal ?
                                    <div className="col-sm-4 p-t-20">
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
                                    </div> : <p></p>}
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isFocussed}>
                                        <input autoComplete="off" onKeyPress={(e) => e.preventDefault()} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.selectedSemester} />
                                        <label className={"mdl-textfield__label " + this.state.background}>Semester</label>
                                        {this.state.onFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">sdfsdf
                                            <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                    <li className="mdl-menu__item animation" id="Semester 1" onClick={this.onDropDownSelect.bind(this)} >Semester 1</li>
                                                    <li className="mdl-menu__item animation1" id="Semester 2" onClick={this.onDropDownSelect.bind(this)} >Semester 2</li>
                                                    <li className="mdl-menu__item animation2" id="Semester 3" onClick={this.onDropDownSelect.bind(this)} >Semester 3</li>
                                                    <li className="mdl-menu__item animation" id="Semester 4" onClick={this.onDropDownSelect.bind(this)} >Semester 4</li>
                                                    <li className="mdl-menu__item animation1" id="Semester 5" onClick={this.onDropDownSelect.bind(this)} >Semester 5</li>
                                                    <li className="mdl-menu__item animation2" id="Semester 6" onClick={this.onDropDownSelect.bind(this)} >Semester 6</li>
                                                    <li className="mdl-menu__item animation" id="Semester 7" onClick={this.onDropDownSelect.bind(this)} >Semester 7</li>
                                                    <li className="mdl-menu__item animation1" id="Semester 8" onClick={this.onDropDownSelect.bind(this)} >Semester 8</li>
                                                </ul>
                                            </div>
                                        </div> : <p></p>}
                                    </div>
                                </div>
                                {this.state.isManagementPortal ?
                                    <div className="col-lg-2 p-t-20">
                                        <div
                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isStudentFocussed}>
                                            <input onKeyPress={(e) => e.preventDefault()} onFocus={this.onStudentFocussed.bind(this)} autoComplete="off" className="mdl-textfield__input display-border" type="text" id="selectedStudent"
                                                value={this.state.selectedStudentName} onChange={this.handleStudentChange.bind(this)} name="selectedStudent" />
                                            <label className={"mdl-textfield__label " + this.state.backgroundStudent}>Student</label>
                                            {this.state.onStudentFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                    <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                        {this.displayStudent()}
                                                    </ul>
                                                </div>
                                            </div> : <p></p>}
                                        </div>
                                    </div> : <p></p>}
                                <div className="col-sm-8 p-t-20">
                                    <button type="button" onClick={this.getResult.bind(this)} className="btn btn-primary m-t-15 m-l-30">Get Results!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.searchAllowed ? <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100 ver5 m-b-110 table table-responsive">
                                <table>
                                    <thead>
                                        <tr className="row100 head">
                                            <th className="column100 column1" data-column="column1"></th>
                                            <th className={"column100 column2 " + this.state.column1} onMouseEnter={this.userHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Student ID</th>
                                            <th className={"column100 column3 " + this.state.column2} onMouseEnter={this.dateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Date of Absence</th>
                                            <th className={"column100 column4 " + this.state.column3} onMouseEnter={this.reasonHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Reason</th>
                                            <th className={"column100 column5 " + this.state.column4} onMouseEnter={this.actionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Type</th>
                                            {this.state.isManagementPortal ? <th className={"column100 column5 " + this.state.column4} onMouseEnter={this.actionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Action</th>
                                                : <></>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.displayTable()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> : <span></span>}
            </div>
        )
    }
}

export default Attendance;