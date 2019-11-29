import React, { Component } from 'react';
import '../../styles/table.css';
import '../../styles/dropdown.css';
import '../../styles/course-dropdown.css';
import axios from 'axios';

class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column1: '',
            column2: '',
            selectedSemester: 'Select Semester',
            searchAllowed: false,
            absenceList: []
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

    /**
     * Resets the state variables when hover is removed
     */
    hoverOff() {
        this.setState({
            column1: '',
            column2: '',
        })
    }

    /**
     * Sets the semester selected
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
            this.fetchAbsenceDetails();
        } else {
            alert('Please select the values');
            this.setState({ searchAllowed: false })
        }

    }


    /**
     * Fetches the date of absence based on semester selected
     */
    fetchAbsenceDetails() {
        this.setState({ searchAllowed: true });
        var semester = this.state.selectedSemester;
        var course = this.state.selectedCourse;
        axios.get(`http://localhost:4000/xakal/attendance/studentleave/${semester}`)
            .then((response) => {
                this.setState({ absenceList: response.data });
            });
    }

    /**
     * Displays the list of notes based on the API response
     */
    displayTable() {
        return this.state.absenceList.map((singleData, index) => {
            return (
                <tr className="row100">
                    <td className="column100 column1" data-column="column1">{++index}</td>
                    <td className={"column100 column2 "} onMouseEnter={this.dateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.leaveDate}</td>
                    <td className={"column100 column3 "} onMouseEnter={this.reasonHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.reason}</td>
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
                                            <th className={"column100 column2 " + this.state.column1} onMouseEnter={this.dateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Date of Absence</th>
                                            <th className={"column100 column3 " + this.state.column2} onMouseEnter={this.reasonHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Reason</th>
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