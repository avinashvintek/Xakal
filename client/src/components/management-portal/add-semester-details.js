import React, { Component } from 'react';
import '../../styles/table.css';
import '../../minified-css/material-min.css';
import '../../styles/dropdowns.css';
import '../../styles/theme-style.css';
import axios from 'axios';
class AddSemesterDetails extends Component {
    insertedValues = [];
    insertedUserID = [];
    constructor(props) {
        super(props);
        this.state = {
            searchAllowed: false,
            salaryDetails: [],
            isFocussed: '',
            onFocus: false,
            selectedSemester: '',
            background: '',
            selectedDepartment: '',
            userID: '',
            studentDetails: [],
            courseList: [],
            values: [{ selectedSemester: '', uploadedMark: '', selectedCourse: '', selectedStudent: '', selectedStudentName: '' }]
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

    /**
     * Fetches all student
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
     * Sets the semester selected
     */
    onSemesterSelect(event) {
        this.setState({ selectedSemester: event.target.id, onFocus: false, background: 'is-hidden' });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    /**
     * Triggers when semester is focused
     */
    onSemesterFocus(i) {
        this.setState({ isFocussed: 'is-focused', selectedSemesterIndex: i, onFocus: true, background: 'is-shown' });
    }

    /**
     * Triggers when student is focused
     */
    onStudentFocus(i) {
        this.setState({ isStudentFocussed: 'is-focused', selectedStudentIndex: i, onFocus: false, onStudentFocus: true, backgroundStudent: 'is-shown' });
    }

    /**
     * Fetches all the semester name
     */
    getSemesters(i) {
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
        this.setState(prevState => ({ values: [...prevState.values, { selectedCourse: '', selectedSemester: '', uploadedMark: '', selectedStudent: '', selectedStudentName: '', selectedCourse: '', }] }))
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
            var semester = event.target.id;
            axios.get(`/xakal/class-notes/course/${semester}`)
                .then((response) => {
                    this.setState({ courseList: response.data });
                });
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
     * Resets to base state
     */
    resetForm() {
        this.setState({ values: [{ selectedSemester: '', uploadedMark: '', selectedStudent: '', selectedStudentName: '', selectedCourse: '', }] })
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

    onMarkFocus() {
        this.setState({ isFocussed: 'is-focused', isMarkFocussed: 'is-focused', onFocus: false, background: 'is-hidden', backgroundMark: 'is-shown' });
    }

    onMarkChanged(i, event) {
        this.setState({ onMarkFocus: false, backgroundMark: 'is-hidden' });
        if (event && event.target) {
            let values = [...this.state.values];
            const { value } = event.target;
            values[i]['uploadedMark'] = value;
            this.setState({ values });
        }
    }

    /**
     * Triggers when the form is submitted
     * Checks whether the values are entered properly
     */
    formSubmit() {
        if (this.state.values && this.state.values.length > 0) {
            this.state.values.forEach(element => {
                if (element.selectedStudent && element.selectedSemester && element.uploadedMark) {
                    const params = {
                        course: 'Physics 1'
                    }
                    axios.get(`/xakal/assessment/semesterdetail/exists/${element.selectedStudent}/${params.course}`)
                        .then((response) => {
                            if (!this.insertedUserID.includes(element.selectedStudent)) {
                                if (response.data && response.data.length > 0) {
                                    this.updateSemesterMarks(element, response.data[0])
                                } else {
                                    this.insertedUserID.push(element.selectedStudent);
                                    this.insertSemester(element);
                                }
                            } else {
                                this.insertedValues.push(element);
                            }

                        })
                        .catch((err) => console.log(err));

                } else {
                    alert('Please give all the details')
                }
            });
            setTimeout(() => {
                this.updateRemainingValues();
                this.resetForm();
            }, 5000);
        } else {
            alert('Please give atleast one record to proceed')
        }
    }

    updateRemainingValues() {
        const params = {
            course: 'Physics 1'
        }
        this.insertedValues.forEach(element => {
            axios.get(`/xakal/assessment/semesterdetail/exists/${element.selectedStudent}/${params.course}`)
                .then((response) => {
                    if (response.data && response.data.length > 0) {
                        this.updateSemesterMarks(element, response.data[0])
                    }
                })
                .catch((err) => console.log(err));
        });
        this.insertedUserID = [];
        this.insertedValues = [];
    }

    insertSemester(element) {
        let isUpdated = false;
        const params = {
            semester: element.selectedSemester.toLocaleLowerCase(),
            userID: element.selectedStudent,
            course: element.selectedCourse.toLocaleLowerCase(),
            grade: element.uploadedMark,
            result: this.checkResult(element),
            gradeValue: this.checkGrade(element),
            credits: 2
        }
        axios.post(`/xakal/assessment/semesterdetail/`, params)
            .then(() => {
                if (!isUpdated) {
                    alert('Updated Successfully');
                }
                isUpdated = true;
            })
            .catch((err) => console.log(err));
    }

    checkGrade(element) {
        switch (element.uploadedMark) {
            case 'a':
            case 'A':
                return 9;
            case 'b':
            case 'B':
                return 8;
            case 'c':
            case 'C':
                return 7;
            case 'd':
            case 'D':
                return 6;
            case 'e':
            case 'E':
                return 5;
            case 'u':
            case 'U':
                return 0
            default:
                return 0
        }
    }

    checkResult(element) {
        switch (element.uploadedMark) {
            case 'a':
            case 'A':
            case 'b':
            case 'B':
            case 'c':
            case 'C':
            case 'd':
            case 'D':
            case 'e':
            case 'E':
                return 'Pass';
            case 'u':
            case 'U':
                return 'Fail'
            default:
                return 'Pending'
        }
    }

    updateSemesterMarks(element, response) {
        let isUpdated = false;
        const params = {
            semester: element.selectedSemester.toLocaleLowerCase(),
            userID: element.selectedStudent,
            course: element.selectedCourse.toLocaleLowerCase(),
            grade: element.uploadedMark,
            result: this.checkResult(element),
            gradeValue: this.checkGrade(element),
            credits: 2
        }
        axios.put(`/xakal/assessment/semesterdetail/update/${response._id}`, params)
            .then(() => {
                if (!isUpdated) {
                    alert('Updated Successfully');
                }
                isUpdated = true;
                this.setState({ searchAllowed: false, isEdit: false })
            })
            .catch((err) => console.log(err));
    }

    onCourseDropDownFocus(i) {
        this.setState({ isCourseFocussed: 'is-focused', selectedCourseIndex: i, onCourseFocus: true, onFocus: false, background: 'is-hidden', backgroundCourse: 'is-shown', backgroundDesc: 'is-hidden' });
    }

    /**
     * Triggers when the student is changed and stores the values in state
     * @param event form values 
     */
    handleCourseChange(i, event) {
        this.setState({ onCourseFocus: false, backgroundCourse: 'is-hidden', hasCourseValue: true });
        if (event && event.target) {
            let values = [...this.state.values];
            const { id, name } = event.target;
            values[i]['selectedCourse'] = id;
            values[i]['selectedCourseName'] = name;
            this.setState({ values });
        }
    }

    /**
    * Displays the list of courses based on the API response
    */
    displayCourse(i) {
        if (this.state && this.state.courseList && this.state.courseList.length) {
            return this.state.courseList.map((singleCourse, index) => {
                return (<li className="mdl-menu__item animation" key={index}><a id={singleCourse.course} onClick={this.handleCourseChange.bind(this, i)}>{singleCourse.course}</a></li>)
            });
        }
    }

    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20 m-l-20">Add Semester Details</h1>
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
                                                <input onKeyPress={(e) => e.preventDefault()} onFocus={this.onStudentFocus.bind(this, i)} autoComplete="off" className="mdl-textfield__input display-border" type="text" id="selectedStudent"
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
                                                <input onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onSemesterFocus.bind(this, i)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                                    value={el.selectedSemester} name="selectedSemester" />
                                                <label className={"mdl-textfield__label " + this.state.background}>Semester</label>
                                                {this.state.onFocus && this.state.selectedSemesterIndex === i ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                    <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                        <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                            {this.getSemesters(i)}
                                                        </ul>
                                                    </div>
                                                </div> : <p></p>}
                                            </div>
                                        </div>
                                        <div className="col-lg-2 p-t-20">
                                            <div
                                                className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isCourseFocussed}>
                                                <input onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onCourseDropDownFocus.bind(this, i)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                                    value={el.selectedCourse} />
                                                <label className={"mdl-textfield__label " + this.state.backgroundCourse}>Course</label>
                                                {this.state.onCourseFocus && this.state.selectedCourseIndex === i ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                                    <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                        <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                            {this.displayCourse(i)}
                                                        </ul>
                                                    </div>
                                                </div> : <p></p>}
                                            </div>
                                        </div>

                                        <div className="col-sm-4 p-t-20">
                                            <div className="row">
                                                <div
                                                    className={"col-sm-8 m-t-15 m-l-30 mdl-textfield mdl-js-textfield mdl-textfield--floating-label " + this.state.isMarkFocussed}>
                                                    <input onFocus={this.onMarkFocus.bind(this)} autoComplete="off" value={el.uploadedMark} className=" col-sm-8 m-t-15 m-l-30 mdl-textfield__input display-border" type="text" maxLength={1} id="uploadedMark" onChange={this.onMarkChanged.bind(this, i)}
                                                    />
                                                    <label className={"mdl-textfield__label " + this.state.backgroundMark}>Grades</label>
                                                </div>
                                                <button style={{ height: '5%' }} type="button" onClick={this.removeClick.bind(this, i)} className="m-l-15 col-sm-1 btn btn-primary m-t-15">X</button>
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

export default AddSemesterDetails;