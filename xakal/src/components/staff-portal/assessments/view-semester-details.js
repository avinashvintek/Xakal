import React, { Component } from 'react';
import '../../../styles/table.css';
import '../../../minified-css/material-min.css';
import '../../../styles/dropdowns.css';
import '../../../styles/theme-style.css';
import axios from 'axios';

class ViewSemesterDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column1: '',
            column2: '',
            column3: '',
            column4: '',
            selectedSemester: '',
            searchAllowed: false,
            notesList: [],
            background: '',
            student: '',
            isFocussed: '',
            onFocus: false,
            userID: '',
            isStudentFocussed: '',
            backgroundStudent: '',
        };
        this.baseState = this.state;

    }

    componentDidMount() {
        if (this.props && this.props.location && this.props.location.userID) {
            const userID = this.props.location.userID;
            this.setState({ userID: userID.userID });
        }
        this.unlisten = this.props.history.listen((location, action) => {
            this.setState(this.baseState);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    /**
     * Adds the hover class when ID is hovered
     */
    studentIDHover(event) {
        var element = event.target.className;
        if (element === 'column100 column2 ') {
            this.setState({ column1: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when course is hovered
     */
    courseHover(event) {
        var element = event.target.className;
        if (element === 'column100 column3 ') {
            this.setState({ column2: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when grade is hovered
     */
    gradeHover(event) {
        var element = event.target.className;
        if (element === 'column100 column4 ') {
            this.setState({ column3: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when result is hovered
     */
    resultHover(event) {
        var element = event.target.className;
        if (element === 'column100 column5 ') {
            this.setState({ column4: 'hov-column-head-ver5' })
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
            column4: '',
        })
    }

    /**
     * Sets the semester selected
     */
    onDropDownSelect(event) {
        this.setState({ selectedSemester: event.target.id, onFocus: false, background: 'is-hidden', backgroundStudent: 'is-hidden' });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    onDropDownFocus() {
        this.setState({ isFocussed: 'is-focused', onFocus: true, background: 'is-shown', backgroundStudent: 'is-hidden' });
    }

    /**
     * Allows the grid to display the values
     */
    getResult() {
        if (this.state.selectedSemester !== '') {
            this.fetchSemesterDetails();
        } else {
            alert('Please select the values');
            this.setState({ searchAllowed: false })
        }

    }

    /**
     * Fetches the semester marks based on semester selected
     */
    fetchSemesterDetails() {
        this.setState({ searchAllowed: true });
        var semester = this.state.selectedSemester;
        const studentID = this.state.student ? this.state.student.toUpperCase() : '';
        axios.get(`http://localhost:4000/xakal/assessment/semesterdetail/${semester}`, { params: studentID })
            .then((response) => {
                this.setState({ notesList: response.data });
            });
    }


    onStudentChanged(event) {
        this.setState({ student: event.target.value, backgroundCourse: 'is-hidden', background: 'is-hidden' });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        } else if (this.state.uploadAllowed) {
            this.setState({ uploadAllowed: false })
        }
    }

    onStudentFocus() {
        this.setState({ isFocussed: 'is-focused', isStudentFocussed: 'is-focused', onFocus: false, background: 'is-hidden', backgroundStudent: 'is-shown' });
    }

    /**
     * Displays the list of notes based on the API response
     */
    displayTable() {
        return this.state.notesList.map((singleData, index) => {
            return (
                <tr className="row100">
                    <td className="column100 column1" data-column="column1">{++index}</td>
                    <td className={"column100 column2 "} onMouseEnter={this.studentIDHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.userID}</td>
                    <td className={"column100 column3 "} onMouseEnter={this.courseHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.course}</td>
                    <td className={"column100 column4 "} onMouseEnter={this.gradeHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.grade}</td>
                    <td className={"column100 column5 "} onMouseEnter={this.resultHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.result}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card-box">
                            <div className="card-body row">
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isFocussed}>
                                        <input onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
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
                                <div className="col-sm-4 p-t-20">
                                    <div className="row">
                                        <div
                                            className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label " + this.state.isStudentFocussed}>
                                            <input onFocus={this.onStudentFocus.bind(this)} value={this.state.student} className="mdl-textfield__input display-border" type="text" id="student" onChange={this.onStudentChanged.bind(this)}
                                            />
                                            <label className={"mdl-textfield__label " + this.state.backgroundStudent}>Student ID</label>
                                        </div>
                                    </div>
                                </div>
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
                                            <th className={"column100 column2 " + this.state.column1} onMouseEnter={this.studentIDHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Student ID</th>
                                            <th className={"column100 column3 " + this.state.column2} onMouseEnter={this.courseHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Course</th>
                                            <th className={"column100 column4 " + this.state.column3} onMouseEnter={this.gradeHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Grade</th>
                                            <th className={"column100 column5 " + this.state.column4} onMouseEnter={this.resultHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Result</th>
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

export default ViewSemesterDetails;