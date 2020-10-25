import React, { Component } from 'react';
import '../../styles/table.css';
import '../../minified-css/material-min.css';
import '../../styles/dropdowns.css';
import '../../styles/theme-style.css';
import axios from 'axios';
import * as moment from 'moment'
class StaffAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column1: '',
            column2: '',
            searchAllowed: false,
            absenceList: [],
            background: '',
            isFocussed: '',
            onFocus: false,
            selectedMonth: '',
            userID: '',
            onYearFocus: false,
            isYearFocussed: '',
            selectedYear: '',
            yearBackground: '',
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
     * Sets the month selected
     */
    onMonthSelect(event) {
        this.setState({ selectedMonth: event.target.id, onFocus: false, background: 'is-hidden' });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    onMonthFocus() {
        this.setState({ isFocussed: 'is-focused', onFocus: true, onYearFocus: false, yearBackground: 'is-hidden', background: 'is-shown' });
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
     * Adds the hover class when date is hovered
     */
    staffHover(event) {
        var element = event.target.className;
        if (element === 'column100 column4 ') {
            this.setState({ column3: 'hov-column-head-ver5' })
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

    /**
     * Resets the state variables when hover is removed
     */
    hoverOff() {
        this.setState({
            column1: '',
            column2: '',
            column3: ''
        })
    }

    /**
     * Sets the semester selected
     */
    onDropDownSelect(event) {
        this.setState({ selectedSemester: event.target.id, onFocus: false, background: 'is-hidden' });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    /**
     * Fetches all the month name
     */
    getMonths() {
        return moment.months().map((name, index) => {
            return (
                <li id={name} key={index++} className="mdl-menu__item animation" onClick={this.onMonthSelect.bind(this)} >{name}</li>
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

    onYearFocus() {
        this.setState({ isYearFocussed: 'is-focused', onFocus: false, onYearFocus: true, yearBackground: 'is-shown', background: 'is-hidden' });
    }


    /**
     * Allows the grid to display the values
     */
    getResult() {
        if (this.state.selectedMonth !== '' && this.state.selectedYear !== '') {
            this.fetchAbsenceDetails();
        } else {
            alert('Please select the department and date');
            this.setState({ searchAllowed: false })
        }

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
     * Fetches the date of absence based on semester selected
     */
    fetchAbsenceDetails() {
        var ID;
        this.setState({ searchAllowed: true });
        var month = this.state.selectedMonth;
        if (this.state.isManagementPortal === true) {
            ID = this.state.selectedStaff;
        } else {
            ID = this.state.userID;
        }
        var userID = { userID: ID, month: month, year: this.state.selectedYear };
        axios.get(`/xakal/staffattendance/staffleave`, { params: userID })
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
        this.fetchStaffDetailsByDept(event.target.id);
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
    * Fetches all staffs for selected department
    */
    fetchStaffDetailsByDept(departmentName) {
        this.setState({ staffDetails: [] })
        axios.get(`/xakal/staffdetail/department/${departmentName}`)
            .then((response) => {
                this.setState({ staffDetails: response.data });
            });
    }


    /**
    * Triggers when staff is focused
    */
    onStaffFocussed() {
        this.setState({ isStaffFocussed: 'is-focused', onFocus: false, onStaffFocus: true, backgroundStaff: 'is-shown' });
    }

    /**
     * Triggers when the staff is changed and stores the values in state
     * @param event form values 
     */
    handleStaffChange(event) {
        this.setState({ selectedStaffName: event.target.name, selectedStaff: event.target.id, onStaffFocus: false, backgroundStaff: 'is-hidden' });
    }

    /**
    * Displays the staffs of HOD based on the API response
    */
    displayStaff() {
        if (this.state && this.state.staffDetails && this.state.staffDetails.length) {
            return this.state.staffDetails.map((singleStaff, index) => {
                return (<li className="mdl-menu__item animation" key={index}><button id={singleStaff.userID} name={singleStaff.name} onClick={this.handleStaffChange.bind(this)}>{singleStaff.name}</button></li>)
            });
        }
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
                axios.put(`/xakal/staffattendance/cancelLeave/${singleData._id}`)
                    .then((response) => {
                    });
            }
        }
    }

    actionHover(event) {
        var element = event.target.className;
        if (element === 'column100 column4 ') {
            this.setState({ column2: 'hov-column-head-ver5' })
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
                    <td className={"column100 column2 "} key={counter++} onMouseEnter={this.staffHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.userID}</td>
                    <td className={"column100 column2 "} key={counter++} onMouseEnter={this.dateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{fromDate} - {toDate}</td>
                    <td className={"column100 column3 "} key={counter++} onMouseEnter={this.reasonHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.reason}</td>
                    <td className={"column100 column4 "} key={counter++} onMouseEnter={this.actionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>
                        <button type="button" onClick={i => this.removeClick(singleData, index -= 4)} className="btn btn-danger m-t-4">Cancel Leave</button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20 m-l-20">Staff Attendance</h1>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card-box">
                            <div className="card-body row">
                                {this.state.isManagementPortal ?
                                    <div className="col-sm-3 p-t-20">
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
                                <div className="col-lg-3 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isFocussed}>
                                        <input onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onMonthFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.selectedMonth} />
                                        <label className={"mdl-textfield__label " + this.state.background}>Month</label>
                                        {this.state.onFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                            <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                    {this.getMonths()}
                                                </ul>
                                            </div>
                                        </div> : <p></p>}
                                    </div>
                                </div>
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
                                {this.state.isManagementPortal ?
                                    <div className="col-lg-3 p-t-20">
                                        <div
                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isStaffFocussed}>
                                            <input onKeyPress={(e) => e.preventDefault()} onFocus={this.onStaffFocussed.bind(this)} autoComplete="off" className="mdl-textfield__input display-border" type="text" id="selectedStaff"
                                                value={this.state.selectedStaffName} onChange={this.handleStaffChange.bind(this)} name="selectedStaff" />
                                            <label className={"mdl-textfield__label " + this.state.backgroundStaff}>Staff</label>
                                            {this.state.onStaffFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                    <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                        {this.displayStaff()}
                                                    </ul>
                                                </div>
                                            </div> : <p></p>}
                                        </div>
                                    </div> : <p></p>}
                                <div className="col-sm-4 p-t-20">
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
                                            <th className={"column100 column2 " + this.state.column3} onMouseEnter={this.staffHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Staff ID</th>
                                            <th className={"column100 column3 " + this.state.column1} onMouseEnter={this.dateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Date of Absence</th>
                                            <th className={"column100 column4 " + this.state.column2} onMouseEnter={this.reasonHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Reason</th>
                                            <th className={"column100 column5 " + this.state.column4} onMouseEnter={this.actionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Action</th>
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

export default StaffAttendance;