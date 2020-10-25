import moment from 'moment';
import React, { Component } from 'react';
import axios from 'axios';

class AttendanceMaintain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            column1: '',
            column2: '',
            selectedSemester: '',
            description: '',
            searchAllowed: false,
            absenceList: [],
            selectedMonth: '',
            selectedYear: '',
            background: '',
            isFocussed: '',
            onFocus: false,
            userID: '',
            isStudentPortal: false,
            fromDate: moment(new Date()).format('YYYY-MM-DD'),
            toDate: moment(new Date()).format('YYYY-MM-DD')
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
        if (pathArray.includes('students-portal')) {
            this.setState({ isStudentPortal: true, });
        }
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
        this.setState({
            isFocussed: 'is-focused', onFocus: true, background: 'is-shown',
            isFromFocussed: 'is-hidden', fromBackground: 'is-hidden',
            isToFocussed: 'is-hidden', toBackground: 'is-hidden'
        });
        this.descriptionFocus();
    }

    semesterFocus() {
        if (this.state.hasSemesterValue === true) {
            this.setState({ isFocussed: 'is-focused', background: 'is-hidden' });
        } else {
            this.setState({ background: 'is-hidden', isFocussed: 'is-hidden' });
        }
    }

    descriptionFocus() {
        if (this.state.hasDescValue === true) {
            this.setState({ isDescriptionFocussed: 'is-focused', backgroundDesc: 'is-hidden', })
        } else {
            this.setState({ backgroundDesc: 'is-hidden', isDescriptionFocussed: 'is-hidden' })
        }
    }

    onFromDateFocus() {
        this.setState({
            isFromFocussed: 'is-focused', onFromFocus: true, fromBackground: 'is-shown',
            isFocussed: 'is-hidden', background: 'is-hidden',
            isToFocussed: 'is-hidden', toBackground: 'is-hidden'
        });
        this.semesterFocus();
        this.descriptionFocus();

        this.monthFocus();
        this.yearFocus();
    }

    onToDateFocus() {
        this.setState({
            isFromFocussed: 'is-hidden', fromBackground: 'is-hidden',
            isFocussed: 'is-hidden', background: 'is-hidden', isToFocussed: 'is-focused', onToFocus: true, toBackground: 'is-shown'
        });
        this.semesterFocus();
        this.descriptionFocus();

        this.monthFocus();
        this.yearFocus();
    }

    onDescriptionFocus() {
        this.setState({
            isDescriptionFocussed: 'is-focused', backgroundDesc: 'is-shown',
            isFromFocussed: 'is-hidden', fromBackground: 'is-hidden',
            isFocussed: 'is-hidden', background: 'is-hidden', isToFocussed: 'is-focused', toBackground: 'is-hidden'
        });
        this.semesterFocus();

        this.monthFocus();
        this.yearFocus();
    }

    onDescriptionChanged(event) {
        this.setState({ description: event.target.value, backgroundDescription: 'is-hidden', hasDescValue: true });
    }

    /**
     * Triggers when the form is changed and stores the values in state
     * @param event form values 
     */
    handleFormChange(event) {
        if (event && event.target) {
            const name = event.target.id;
            this.setState({ [name]: event.target.value });
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

    monthFocus() {
        if (this.state.hasMonthValue === true) {
            this.setState({ isMonthFocussed: 'is-focused', monthBackground: 'is-hidden', })
        } else {
            this.setState({ monthBackground: 'is-hidden', isMonthFocussed: 'is-hidden' })
        }
    }

    yearFocus() {
        if (this.state.hasYearValue === true) {
            this.setState({ isYearFocussed: 'is-focused', yearBackground: 'is-hidden', })
        } else {
            this.setState({ yearBackground: 'is-hidden', isYearFocussed: 'is-hidden' })
        }
    }

    submitLeave() {
        if (this.state.isStudentPortal) {
            if (this.state.selectedSemester === '' || this.state.description === '') {
                alert('Please fill all the details')
            } else if (moment(new Date(this.state.fromDate)).isAfter(moment(new Date(this.state.toDate)))) {
                alert('Select valid date range')
            } else {
                // insert the leave to db
                this.applyStudentLeave();
            }
        } else {
            if (this.state.selectedMonth === '' || this.state.selectedYear === '' || this.state.description === '') {
                alert('Please fill all the details')
            } else if (moment(new Date(this.state.fromDate)).isAfter(moment(new Date(this.state.toDate)))) {
                alert('Select valid date range')
            } else {
                // insert the leave to db
                this.applyStaffLeave();
            }
        }
    }

    applyStaffLeave() {
        let isUpdated = false;
        const params = {
            userID: this.state.userID.toUpperCase(),
            month: this.state.selectedMonth,
            year: this.state.selectedYear,
            uploadedDate: new Date(Date.now()).toLocaleString(),
            fromDate: new Date(this.state.fromDate).toLocaleString(),
            toDate: new Date(this.state.toDate).toLocaleString(),
            reason: this.state.description,
        }
        axios.post('/xakal/staffattendance/staffleave', params)
            .then(() => {
                if (!isUpdated) {
                    alert('Updated Successfully');
                    this.setState(this.baseState);
                }
                isUpdated = true;
            })
            .catch((err) => console.log(err));
    }

    applyStudentLeave() {
        let isUpdated = false;
        const params = {
            userID: this.state.userID.toUpperCase(),
            semester: this.state.selectedSemester.toLowerCase(),
            uploadedDate: new Date(Date.now()).toLocaleString(),
            fromDate: new Date(this.state.fromDate).toLocaleString(),
            toDate: new Date(this.state.toDate).toLocaleString(),
            reason: this.state.description,
        }
        axios.post('/xakal/attendance/studentleave', params)
            .then(() => {
                if (!isUpdated) {
                    alert('Updated Successfully');
                    this.setState(this.baseState);
                }
                isUpdated = true;
            })
            .catch((err) => console.log(err));
    }

    /**
     * Sets the month selected
     */
    onMonthSelect(event) {
        this.setState({ selectedMonth: event.target.id, hasMonthValue: true, onFocus: false, monthBackground: 'is-hidden' });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    onMonthFocus() {
        this.setState({ isMonthFocussed: 'is-focused', onFocus: true, onYearFocus: false, yearBackground: 'is-hidden', monthBackground: 'is-shown' });
        this.yearFocus();
        this.descriptionFocus()
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
        this.setState({ selectedYear: event.target.id, hasYearValue: true, onYearFocus: false, yearBackground: 'is-hidden' });
    }

    onYearFocus() {
        this.setState({ isYearFocussed: 'is-focused', onFocus: false, onYearFocus: true, yearBackground: 'is-shown', monthBackground: 'is-hidden' });
        this.monthFocus();
        this.descriptionFocus();
    }

    /**
     * Gets the previous 5 years
     */
    getYear() {
        const year = (new Date()).getFullYear();
        const years = Array.from(new Array(3), (val, index) => -(index - year));
        return years.map((year, index) => {
            return (
                <li id={year} key={index++} className="mdl-menu__item animation" onClick={this.onYearSelect.bind(this)} >{year}</li>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20 m-l-20">Apply Leave</h1>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card-box">
                            <div className="card-body row">
                                {this.state.isStudentPortal ?
                                    <div className="col-lg-3 p-t-20">
                                        <div
                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isFocussed}>
                                            <input autoComplete="off" onKeyPress={(e) => e.preventDefault()} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                                value={this.state.selectedSemester} />
                                            <label className={"mdl-textfield__label " + this.state.background}>Semester</label>
                                            {this.state.onFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
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
                                    </div> :
                                    <><div className="col-lg-2 p-t-20">
                                        <div
                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isMonthFocussed}>
                                            <input onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onMonthFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="month"
                                                value={this.state.selectedMonth} />
                                            <label className={"mdl-textfield__label " + this.state.monthBackground}>Month</label>
                                            {this.state.onFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                    <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                        {this.getMonths()}
                                                    </ul>
                                                </div>
                                            </div> : <p></p>}
                                        </div>
                                    </div>
                                        <div className="col-lg-1 p-t-20">
                                            <div
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isYearFocussed}>
                                                <input onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onYearFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="year"
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

                                        </div></>}
                                <div className="col-lg-2 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width is-focused"}>
                                        <input value={this.state.fromDate || moment(new Date()).format('YYYY-MM-DD')} autoComplete="off" placeholder="" onFocus={this.onFromDateFocus.bind(this)} className="mdl-textfield__input display-border" type="date" id="fromDate"
                                            onChange={this.handleFormChange.bind(this)} name="fromDate" />
                                        <label htmlFor="fromDate" className={"mdl-textfield__label is-hidden"}>From date</label>
                                    </div>
                                </div>
                                <div className="col-lg-2 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width is-focused"}>
                                        <input value={this.state.toDate || moment(new Date()).format('YYYY-MM-DD')} autoComplete="off" placeholder="" onFocus={this.onToDateFocus.bind(this)} className="mdl-textfield__input display-border" type="date" id="toDate"
                                            onChange={this.handleFormChange.bind(this)} name="toDate" />
                                        <label htmlFor="toDate" className={"mdl-textfield__label is-hidden"}>Until date</label>
                                    </div>
                                </div>
                                <div className="col-lg-2 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label " + this.state.isDescriptionFocussed}>
                                        <input autoComplete="off" onFocus={this.onDescriptionFocus.bind(this)} value={this.state.description} className="mdl-textfield__input display-border" type="text" id="description" onChange={this.onDescriptionChanged.bind(this)}
                                        />
                                        <label className={"mdl-textfield__label " + this.state.backgroundDesc}>Description</label>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-t-20">
                                    <button type="button" onClick={this.submitLeave.bind(this)} className="btn btn-primary m-t-15 m-l-30">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AttendanceMaintain;