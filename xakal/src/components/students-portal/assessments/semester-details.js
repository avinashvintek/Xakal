import React, { Component } from 'react';
import '../../../styles/table.css';
import '../../../styles/dropdown.css';
import '../../../styles/course-dropdown.css';
import axios from 'axios';

class SemesterDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column1: '',
            column2: '',
            column3: '',
            column4: '',
            selectedSemester: 'Select Semester',
            searchAllowed: false,
            courseList: [],
            notesList: []
        };
        this.baseState = this.state;

    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            this.setState(this.baseState);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    /**
     * Adds the hover class when description is hovered
     */
    courseHover(event) {
        var element = event.target.className;
        if (element === 'column100 column2 ') {
            this.setState({ column1: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when download is hovered
     */
    gradeHover(event) {
        var element = event.target.className;
        if (element === 'column100 column3 ') {
            this.setState({ column2: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when update date is hovered
     */
    resultHover(event) {
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
     * Triggers the API call for course, based on the semester selected
     */
    onDropDownSelect(event) {
        this.setState({ selectedSemester: event.target.id });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    /**
     * Allows the grid to display the values
     */
    getResult() {
        if (this.state.selectedSemester !== 'Select Semester') {
            this.fetchSemesterDetails();
        } else {
            alert('Please select the values');
            this.setState({ searchAllowed: false })
        }

    }

    fetchSemesterDetails() {
        this.setState({ searchAllowed: true });
        var semester = this.state.selectedSemester;
        axios.get(`http://localhost:4000/xakal/assessment/semesterdetail/${semester}`)
            .then((response) => {
                this.setState({ notesList: response.data });
            });
    }

    /**
     * Displays the list of notes based on the API response
     */
    displayTable() {
        return this.state.notesList.map((singleData, index) => {
            return (
                <tr className="row100">
                    <td className="column100 column1" data-column="column1">{++index}</td>
                    <td className={"column100 column2 "} onMouseEnter={this.courseHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.course}</td>
                    <td className={"column100 column3 "} onMouseEnter={this.gradeHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.grade}</td>
                    <td className={"column100 column4 "} onMouseEnter={this.resultHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.result}</td>
                </tr>
            )
        })
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
                                    <li><a id="Semester 1" onClick={this.onDropDownSelect.bind(this)}>Semester 1</a></li>
                                    <li><a id="Semester 2" onClick={this.onDropDownSelect.bind(this)}>Semester 2</a></li>
                                    <li><a id="Semester 3" onClick={this.onDropDownSelect.bind(this)}>Semester 3</a></li>
                                    <li><a id="Semester 4" onClick={this.onDropDownSelect.bind(this)}>Semester 4</a></li>
                                    <li><a id="Semester 5" onClick={this.onDropDownSelect.bind(this)}>Semester 5</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </form>
                <div>
                    <button type="button" onClick={this.getResult.bind(this)} class="btn btn-info m-t-15 m-l-30">Get Results!</button>
                </div>
                {this.state.searchAllowed ? <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100 ver5 m-b-110 table table-responsive">
                                <table>
                                    <thead>
                                        <tr className="row100 head">
                                            <th className="column100 column1" data-column="column1"></th>
                                            <th className={"column100 column2 " + this.state.column1} onMouseEnter={this.courseHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Course</th>
                                            <th className={"column100 column3 " + this.state.column2} onMouseEnter={this.gradeHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Grade</th>
                                            <th className={"column100 column4 " + this.state.column3} onMouseEnter={this.resultHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Result</th>
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

export default SemesterDetails;