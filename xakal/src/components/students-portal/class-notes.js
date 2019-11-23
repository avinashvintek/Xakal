import React, { Component } from 'react';
import '../../styles/table.css';
import '../../styles/dropdown.css';
import '../../styles/course-dropdown.css';
import axios from 'axios';

const CourseRow = props => (
    <li href='#' id={props.course.course} >{props.course.course}</li>
)
class ClassNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column1: '',
            column2: '',
            column3: '',
            column4: '',
            selectedSemester: 'Select Semester',
            selectedCourse: 'Select Course',
            searchAllowed: false,
            courseList: []
        }
        this.baseState = this.state;
    }

    descriptionHover(event) {
        var element = event.target.className;
        if (element === 'column100 column2 ') {
            this.setState({ column1: 'hov-column-head-ver5' })
        }
    }

    downloadHover(event) {
        var element = event.target.className;
        if (element === 'column100 column3 ') {
            this.setState({ column2: 'hov-column-head-ver5' })
        }
    }

    uploadDateHover(event) {
        var element = event.target.className;
        if (element === 'column100 column4 ') {
            this.setState({ column3: 'hov-column-head-ver5' })
        }
    }

    uploadByHover(event) {
        var element = event.target.className;
        if (element === 'column100 column5 ') {
            this.setState({ column4: 'hov-column-head-ver5' })
        }
    }

    hoverOff() {
        this.setState({
            column1: '',
            column2: '',
            column3: '',
            column4: ''
        })
    }

    onDropDownSelect(event) {
        this.setState({ selectedSemester: event.target.id });
        var semester = event.target.id;
        axios.get(`http://localhost:4000/xakal/class-notes/course/${semester}`)
            .then((response) => {
                this.setState({ courseList: response.data });
                this.displayCourse();
            });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    onCourseChange(event) {
        this.setState({ selectedCourse: event.target.id });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    getNotes(event) {
        if (this.state.selectedSemester !== 'Select Semester' && this.state.selectedCourse !== 'Select Course') {
            this.setState({ searchAllowed: true })
        } else {
            alert('Please select the values');
            this.setState({ searchAllowed: false })
        }
    }

    // displayTable() {
    //     return this.state.courseList.map(function (currentSemester, index) {
    //         return <CourseRow semester={currentSemester} key={index} />
    //     })
    // }

    displayCourse() {
        if (this.state && this.state.courseList && this.state.courseList.length) {
            return this.state.courseList.map(function (singleCourse, index) {
                return <CourseRow course={singleCourse} key={index} />
            });
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div>
                        <ul class='dropdown m-l-30 m-t-30'>
                            <li id="top">{this.state.selectedSemester}
                                <span></span>
                                <ul class="dropdown-box">
                                    <li><a href='#' id="Semester 1" onClick={this.onDropDownSelect.bind(this)}>Semester 1</a></li>
                                    <li><a href='#' id="Semester 2" onClick={this.onDropDownSelect.bind(this)}>Semester 2</a></li>
                                    <li><a href='#' id="Semester 3" onClick={this.onDropDownSelect.bind(this)}>Semester 3</a></li>
                                    <li><a href='#' id="Semester 4" onClick={this.onDropDownSelect.bind(this)}>Semester 4</a></li>
                                    <li><a href='#' id="Semester 5" onClick={this.onDropDownSelect.bind(this)}>Semester 5</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul class='course-dropdown m-l-30 m-t-30'>
                            <li id="top">{this.state.selectedCourse}
                                <span></span>
                                <ul class="course-dropdown-box">

                                    {this.displayCourse()}

                                    {/* <li><a href='#' id="OS" onClick={this.onCourseChange.bind(this)}>OS</a></li>
                                    <li><a href='#' id="TQM" onClick={this.onCourseChange.bind(this)}>TQM</a></li>
                                    <li><a href='#' id="DSP" onClick={this.onCourseChange.bind(this)}>DSP</a></li>
                                    <li><a href='#' id="SE" onClick={this.onCourseChange.bind(this)}>SE</a></li> */}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </form>
                <div>
                    <button type="button" onClick={this.getNotes.bind(this)} class="btn btn-info m-t-15 m-l-30">Get Notes!</button>
                </div>
                {this.state.searchAllowed ? <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100 ver5 m-b-110 table table-responsive">
                                <table>
                                    <thead>
                                        <tr className="row100 head">
                                            <th className="column100 column1" data-column="column1"></th>
                                            <th className={"column100 column2 " + this.state.column1} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Description</th>
                                            <th className={"column100 column3 " + this.state.column2} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Download</th>
                                            <th className={"column100 column4 " + this.state.column3} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Uploaded Date</th>
                                            <th className={"column100 column5 " + this.state.column4} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Uploaded By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="row100">
                                            <td className="column100 column1" data-column="column1">1</td>
                                            <td className={"column100 column2 "} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Operating System Unit 5</td>
                                            <td className={"column100 column3 "} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>--</td>
                                            <td className={"column100 column4 "} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>18/11/2018</td>
                                            <td className={"column100 column5 "} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Lilly</td>
                                        </tr>
                                        <tr className="row100">
                                            <td className="column100 column1" data-column="column1">2</td>
                                            <td className={"column100 column2 "} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Software Engineering Syllabus</td>
                                            <td className={"column100 column3 "} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>--</td>
                                            <td className={"column100 column4 "} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>11/11/2019</td>
                                            <td className={"column100 column5 "} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Anitha</td>
                                        </tr>
                                        <tr className="row100">
                                            <td className="column100 column1" data-column="column1">3</td>
                                            <td className={"column100 column2 "} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>TQM Important questions</td>
                                            <td className={"column100 column3 "} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>--</td>
                                            <td className={"column100 column4 "} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>12/11/2019</td>
                                            <td className={"column100 column5 "} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Gayathri</td>
                                        </tr>
                                        <tr className="row100">
                                            <td className="column100 column1" data-column="column1">4</td>
                                            <td className={"column100 column2 "} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>DSP problems</td>
                                            <td className={"column100 column3 "} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>--</td>
                                            <td className={"column100 column4 "} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>17/11/2019</td>
                                            <td className={"column100 column5 "} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Reddy</td>
                                        </tr>
                                        <tr className="row100">
                                            <td className="column100 column1" data-column="column1">5</td>
                                            <td className={"column100 column2 "} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>8:00 AM</td>
                                            <td className={"column100 column3 "} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>--</td>
                                            <td className={"column100 column4 "} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>--</td>
                                            <td className={"column100 column5 "} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>8:00 AM</td>
                                        </tr>
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

export default ClassNotes;