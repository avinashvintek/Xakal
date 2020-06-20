import React, { Component } from 'react';
import '../../../styles/table.css';
import '../../../minified-css/material-min.css';
import '../../../styles/dropdowns.css';
import '../../../styles/theme-style.css';
import axios from 'axios';
import * as moment from 'moment'
class AddFeesReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchAllowed: false,
            salaryDetails: [],
            isFocussed: '',
            onFocus: false,
            onYearFocus: false,
            isYearFocussed: '',
            selectedSemester: '',
            background: '',
            yearBackground: '',
            selectedDepartment: '',
            userID: '',
            studentDetails: [],
            values: [{ selectedSemester: '', uploadedFile: '', selectedStudent: '', selectedStudentName: '' }]
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
     * Fetches all students for selected department
     */
    fetchStudentDetailsByDept(departmentName) {
        this.setState({ studentDetails: [] })
        axios.get(`/xakal/studentdetail/department/${departmentName}`)
            .then((response) => {
                this.setState({ studentDetails: response.data });
            });
    }


    componentWillUnmount() {
        this.unlisten();
    }

    /**
     * Triggers when semester is focused
     */
    onSemesterFocus(i) {
        this.setState({ isFocussed: 'is-focused', selectedSemesterIndex: i, onFocus: true, onYearFocus: false, background: 'is-shown' });
    }

    /**
     * Triggers when student is focused
     */
    onStudentFocussed(i) {
        this.setState({ isStudentFocussed: 'is-focused', selectedStudentIndex: i, onFocus: false, onStudentFocus: true, backgroundStudent: 'is-shown' });
    }

    /**
     * Fetches all the semester name
     */
    getSemester(i) {
        return [1, 2, 3, 4, 5, 6, 7, 8,].map((name, index) => {
            return (
                <li id={`semester ${name}`} key={index++} className="mdl-menu__item animation" onClick={this.handleSemesterChange.bind(this, i)} >Semester {name}</li>
            )
        })
    }

    /**
     * Adds the empty form element
     */
    addClick() {
        this.setState(prevState => ({ values: [...prevState.values, { selectedSemester: '', uploadedFile: '', selectedStudent: '', selectedStudentName: '' }] }))
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
     * Triggers when the semester is changed and stores the values in state
     * @param event form values 
     */
    handleSemesterChange(i, event) {
        this.setState({ onFocus: false, background: 'is-hidden' });
        if (event && event.target) {
            let values = [...this.state.values];
            const { id } = event.target;
            values[i]['selectedSemester'] = id;
            this.setState({ values });
        }
    }


    /**
     * Triggers when the student is changed and stores the values in state
     * @param event form values 
     */
    handleStudentChange(i, event) {
        this.setState({ onStudentFocus: false, backgroundStudent: 'is-hidden' });
        if (event && event.target) {
            let values = [...this.state.values];
            const { id, name } = event.target;
            values[i]['selectedStudent'] = id;
            values[i]['selectedStudentName'] = name;
            this.setState({ values });
        }
    }

    /**
     * Uploads the file to online URL
     */
    fileUpload(files, element) {
        var isUpdated = false
        const formData = new FormData();
        formData.append('file', files);
        axios.post('https://file.io', formData, { reportProgress: true, observe: 'events' })
            .then(event => {
                if (event.data && event.data.link) {
                    this.setState({ file: event.data.link });
                    const reqBody = {
                        userID: element.selectedStudent,
                        semester: element.selectedSemester,
                        description: 'Paid',
                        uploadedReceipt: this.state.file,
                        paymentDate: new Date(),
                    }
                    axios.post('/xakal/payment', reqBody)
                        .then(() => {
                            if (isUpdated === false) {
                                isUpdated = true
                                alert('File uploaded successfully');
                            }
                        });
                }
            });
    }

    /**
     * Resets to base state
     */
    resetForm() {
        this.setState({ values: [{ selectedSemester: '', uploadedFile: '', selectedStudent: '', selectedStudentName: '' }] })
    }

    /**
    * Displays the list of HOD based on the API response
    */
    displayStudent(i) {
        if (this.state && this.state.studentDetails && this.state.studentDetails.length) {
            return this.state.studentDetails.map((singleStudent, index) => {
                return (<li className="mdl-menu__item animation" key={index}><a id={singleStudent.userID} name={singleStudent.name} onClick={this.handleStudentChange.bind(this, i)}>{singleStudent.name}</a></li>)
            });
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
        this.fetchStudentDetailsByDept(event.target.id);
        this.resetForm();
    }

    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20 m-l-20">Add Fees Receipt</h1>
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
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isStudentFocussed}>
                                                <input onKeyPress={(e) => e.preventDefault()} onFocus={this.onStudentFocussed.bind(this, i)} autoComplete="off" className="mdl-textfield__input display-border" type="text" id="selectedStudent"
                                                    value={el.selectedStudentName || ''} onChange={this.handleStudentChange.bind(this, i)} name="selectedStudent" />
                                                <label className={"mdl-textfield__label " + this.state.backgroundStudent}>Student</label>
                                                {this.state.onStudentFocus && this.state.selectedStudentIndex === i ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                    <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                        <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                            {this.displayStudent(i)}
                                                        </ul>
                                                    </div>
                                                </div> : <p></p>}
                                            </div>
                                        </div>
                                        <div className="col-lg-2 p-t-20">
                                            <div
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isFocussed}>
                                                <input onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onSemesterFocus.bind(this, i)} className="mdl-textfield__input display-border" type="text" id="selectedSemester"
                                                    value={el.selectedSemester} name="selectedSemester" />
                                                <label className={"mdl-textfield__label " + this.state.background}>Semester</label>
                                                {this.state.onFocus && this.state.selectedSemesterIndex === i ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                    <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                        <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                            {this.getSemester(i)}
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

export default AddFeesReceipt;