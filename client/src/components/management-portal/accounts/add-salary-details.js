import React, { Component } from 'react';
import '../../../styles/table.css';
import '../../../minified-css/material-min.css';
import '../../../styles/dropdowns.css';
import '../../../styles/theme-style.css';
import axios from 'axios';
import * as moment from 'moment'
class AddSalaryDetails extends Component {
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
            values: [{ selectedYear: '', selectedMonth: '', uploadedFile: '', selectedStaff: '', selectedStaffName: '' }]
        };
        this.onFileUpload = this.onFileUpload.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
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

    /**
     * Fetches all staff
     */
    fetchStaffDetailsByDept(departmentName) {
        this.setState({ staffDetails: [] })
        axios.get(`/xakal/staffdetail/department/${departmentName}`)
            .then((response) => {
                this.setState({ staffDetails: response.data });
            });
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

    /**
     * Triggers when month is focused
     */
    onMonthFocus(i) {
        this.setState({ isFocussed: 'is-focused', selectedMonthIndex: i, onFocus: true, onYearFocus: false, background: 'is-shown' });
    }

    /**
     * Triggers when year is focused
     */
    onYearFocus(i) {
        this.setState({ isYearFocussed: 'is-focused', selectedIndex: i, onFocus: false, onYearFocus: true, yearBackground: 'is-shown' });
    }

    /**
     * Triggers when staff is focused
     */
    onStaffFocus(i) {
        this.setState({ isStaffFocussed: 'is-focused', selectedStaffIndex: i, onFocus: false, onStaffFocus: true, backgroundStaff: 'is-shown' });
    }

    /**
     * Fetches all the month name
     */
    getMonths(i) {
        return moment.months().map((name, index) => {
            return (
                <li id={name} key={index++} className="mdl-menu__item animation" onClick={this.handleMonthChange.bind(this, i)} >{name}</li>
            )
        })
    }


    /**
     * Gets the previous 10 years
     */
    getYear(i) {
        const year = (new Date()).getFullYear();
        const years = Array.from(new Array(10), (val, index) => -(index - year));
        return years.map((year, index) => {
            return (
                <li id={year} name="selectedYear" key={index++} className="mdl-menu__item animation" onClick={this.handleYearChange.bind(this, i)} >{year}</li>
            )
        })
    }

    /**
     * Adds the empty form element
     */
    addClick() {
        this.setState(prevState => ({ values: [...prevState.values, { selectedYear: '', selectedMonth: '', uploadedFile: '', selectedStaff: '', selectedStaffName: '' }] }))
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
     * Saves the records
     */
    onFileUpload(e) {
        e.preventDefault() // Stop form submit
        if (this.state.values && this.state.values.length > 0) {
            this.state.values.forEach(element => {
                this.fileUpload(element.uploadedFile, element);
            });
            this.resetForm();
        }
    }

    /**
     * Triggers when file is selected
     */
    onChange(e) {
        this.setState({ file: e.target.files[0], background: 'is-hidden', backgroundCourse: 'is-hidden', backgroundDesc: 'is-hidden' })
    }

    /**
     * Triggers when the form is changed and stores the values in state
     * @param event form values 
     */
    handleFormChange(i, event) {
        if (event && event.target) {
            let values = [...this.state.values];
            const { name, id, files } = event.target;
            values[i][name] = files[0];
            this.setState({ values });
            this.onChange(event)
        }
    }


    /**
     * Triggers when the year is changed and stores the values in state
     * @param event form values 
     */
    handleYearChange(i, event) {
        this.setState({ onYearFocus: false, yearBackground: 'is-hidden' });
        if (event && event.target) {
            let values = [...this.state.values];
            const { id } = event.target;
            values[i]['selectedYear'] = id;
            this.setState({ values });
        }
    }


    /**
     * Triggers when the month is changed and stores the values in state
     * @param event form values 
     */
    handleMonthChange(i, event) {
        this.setState({ onFocus: false, background: 'is-hidden' });
        if (event && event.target) {
            let values = [...this.state.values];
            const { id } = event.target;
            values[i]['selectedMonth'] = id;
            this.setState({ values });
        }
    }


    /**
     * Triggers when the staff is changed and stores the values in state
     * @param event form values 
     */
    handleStaffChange(i, event) {
        this.setState({ onStaffFocus: false, backgroundStaff: 'is-hidden' });
        if (event && event.target) {
            let values = [...this.state.values];
            const { id, name } = event.target;
            values[i]['selectedStaff'] = id;
            values[i]['selectedStaffName'] = name;
            this.setState({ values });
        }
    }

    /**
     * Uploads the file to online URL
     */
    fileUpload(files, element) {
        const formData = new FormData();
        formData.append('file', files);
        axios.post('https://file.io', formData, { reportProgress: true, observe: 'events' })
            .then(event => {
                if (event.data && event.data.link) {
                    this.setState({ file: event.data.link });
                    const reqBody = {
                        salaryStatus: 'Salary credited',
                        creditedDate: new Date(),
                        userID: element.selectedStaff,
                        salaryReceipt: this.state.file,
                        salaryMonth: element.selectedMonth,
                        salaryYear: element.selectedYear,
                    }
                    axios.post('/xakal/salary', reqBody)
                        .then(() => {
                            alert('File uploaded successfully');
                        });
                }
            });
    }

    /**
     * Resets to base state
     */
    resetForm() {
        this.setState({ values: [{ selectedYear: '', selectedMonth: '', uploadedFile: '', selectedStaff: '', selectedStaffName: '' }] })
    }

    /**
    * Displays the list of HOD based on the API response
    */
    displayStaff(i) {
        if (this.state && this.state.staffDetails) {
            const staff = this.state.staffDetails;
            return (<li className="mdl-menu__item animation" key={i}><a name={staff.name} id={staff.userID} onClick={this.handleStaffChange.bind(this, i)}>{staff.name}</a></li>)
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
    displayDepartment() {
        if (this.state && this.state.departmentDetails && this.state.departmentDetails.length) {
            return this.state.departmentDetails.map((singleDepartment, index) => {
                return (<li className="mdl-menu__item animation" key={index}><a id={singleDepartment.name} name={singleDepartment.name} onClick={this.handleDepartmentChange.bind(this)}>{singleDepartment.name}</a></li>)
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
        this.fetchStaffDetailsByDept(event.target.id);
        this.resetForm();
    }

    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20 m-l-20">Add Salary Details</h1>
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
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isStaffFocussed}>
                                                <input onKeyPress={(e) => e.preventDefault()} onFocus={this.onStaffFocus.bind(this, i)} autoComplete="off" className="mdl-textfield__input display-border" type="text" id="selectedStaff"
                                                    value={el.selectedStaffName || ''} onChange={this.handleStaffChange.bind(this, i)} name="selectedStaff" />
                                                <label className={"mdl-textfield__label " + this.state.backgroundStaff}>Staff</label>
                                                {this.state.onStaffFocus && this.state.selectedStaffIndex === i ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                    <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                        <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                            {this.displayStaff(i)}
                                                        </ul>
                                                    </div>
                                                </div> : <p></p>}
                                            </div>
                                        </div>
                                        <div className="col-lg-2 p-t-20">
                                            <div
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isFocussed}>
                                                <input onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onMonthFocus.bind(this, i)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                                    value={el.selectedMonth} name="selectedMonth" />
                                                <label className={"mdl-textfield__label " + this.state.background}>Month</label>
                                                {this.state.onFocus && this.state.selectedMonthIndex === i ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                    <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                        <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                            {this.getMonths(i)}
                                                        </ul>
                                                    </div>
                                                </div> : <p></p>}
                                            </div>
                                        </div>

                                        <div className="col-lg-2 p-t-20">
                                            <div
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isYearFocussed}>
                                                <input onKeyPress={(e) => e.preventDefault()} onFocus={this.onYearFocus.bind(this, i)} autoComplete="off" className="mdl-textfield__input display-border" type="text" id="selectedYear"
                                                    value={el.selectedYear} onChange={this.handleYearChange.bind(this, i)} name="selectedYear" />
                                                <label className={"mdl-textfield__label " + this.state.yearBackground}>Year</label>
                                                {this.state.onYearFocus && this.state.selectedIndex === i ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                    <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                        <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                            {this.getYear(i)}
                                                        </ul>
                                                    </div>
                                                </div> : <p></p>}
                                            </div>

                                        </div>

                                        <div className="col-sm-4 p-t-20">
                                            <div className="row">
                                                <input type="file" name="uploadedFile" className="col-sm-8 m-t-15 m-l-30" onChange={this.handleFormChange.bind(this, i)} />
                                                <button type="button" onClick={this.removeClick.bind(this, i)} className=" col-sm-2 btn btn-primary m-t-15">X</button>
                                            </div>
                                        </div>

                                    </div>)}
                            </div> : <p></p>}
                            {this.state.selectedDepartment !== '' ?
                                <div className="card-body row">
                                    <div className="col-sm-8 p-t-20">
                                        <button type="button" onClick={this.addClick.bind(this)} className="btn btn-primary m-t-15">Add</button>
                                        <button type="button" onClick={this.onFileUpload.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button>
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

export default AddSalaryDetails;