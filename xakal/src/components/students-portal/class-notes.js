import React, { Component } from 'react';
import '../../styles/table.css';
import '../../styles/dropdown.css';
import '../../styles/course-dropdown.css';
import axios from 'axios';

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
            courseList: [],
            notesList: []
        };
        this.courseChange = this.onCourseChange.bind(this)
        this.baseState = this.state;
    }

    /**
     * Adds the hover class when description is hovered
     */
    descriptionHover(event) {
        var element = event.target.className;
        if (element === 'column100 column2 ') {
            this.setState({ column1: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when download is hovered
     */
    downloadHover(event) {
        var element = event.target.className;
        if (element === 'column100 column3 ') {
            this.setState({ column2: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when update date is hovered
     */
    uploadDateHover(event) {
        var element = event.target.className;
        if (element === 'column100 column4 ') {
            this.setState({ column3: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when upload by is hovered
     */
    uploadByHover(event) {
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
            column4: ''
        })
    }

    /**
     * Triggers the API call for course, based on the semester selected
     */
    onDropDownSelect(event) {
        this.setState({ selectedSemester: event.target.id, selectedCourse: 'Select Course' });
        var semester = event.target.id;
        axios.get(`http://localhost:4000/xakal/class-notes/course/${semester}`)
            .then((response) => {
                this.setState({ courseList: response.data });
            });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    /**
     * Updates the selected course name
     */
    onCourseChange(event) {
        this.setState({ selectedCourse: event.target.id });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    /**
     * Allows the grid to display the values
     */
    getNotes() {
        if (this.state.selectedSemester !== 'Select Semester' && this.state.selectedCourse !== 'Select Course') {
            this.setState({ searchAllowed: true });
            var semester = this.state.selectedSemester;
            var course = this.state.selectedCourse;
            axios.get(`http://localhost:4000/xakal/class-notes/classnote/${semester}/${course}`)
                .then((response) => {
                    this.setState({ notesList: response.data });
                });
        } else {
            alert('Please select the values');
            this.setState({ searchAllowed: false })
        }
    }

    /**
     * Displays the list of notes based on the API response
     */
    displayTable() {
        return this.state.notesList.map((singleData, index) => {
            return (
                <tr className="row100">
                    <td className="column100 column1" data-column="column1">{++index}</td>
                    <td className={"column100 column2 "} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.description}</td>
                    <td className={"column100 column3 "} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.uploadedFile}</td>
                    <td className={"column100 column4 "} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.uploadedDate}</td>
                    <td className={"column100 column5 "} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.uploadedBy}</td>
                </tr>
            )
        })
    }

    /**
     * Displays the list of courses based on the API response
     */
    displayCourse() {
        if (this.state && this.state.courseList && this.state.courseList.length) {
            return this.state.courseList.map((singleCourse, index) => {
                return (<li key={index}><a href='#' id={singleCourse.course} onClick={this.courseChange}>{singleCourse.course}</a></li>)
            });
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div>
                        <ul className='dropdown m-l-30 m-t-30'>
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
                        <ul className='course-dropdown m-l-30 m-t-30'>
                            <li id="top">{this.state.selectedCourse}
                                <span></span>
                                <ul class="course-dropdown-box">
                                    {this.displayCourse()}
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

export default ClassNotes;