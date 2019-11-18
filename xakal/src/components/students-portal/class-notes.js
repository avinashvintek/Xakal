import React, { Component } from 'react';
import '../../styles/table.css';
import '../../styles/dropdown.css';
import '../../styles/course-dropdown.css'
class ClassNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column1: '',
            column2: '',
            column3: '',
            column4: '',
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
        this.setState(this.baseState)
    }

    render() {
        return (
            <div>
                <div>
                <ul class='dropdown m-l-30 m-t-30'>
                    <li id="top">Select Semester
                        <span></span>
                        <ul class="dropdown-box">
                            <li><a href='#'>Semester 1</a></li>
                            <li><a href='#'>Semester 2</a></li>
                            <li><a href='#'>Semester 3</a></li>
                            <li><a href='#'>Semester 4</a></li>
                            <li><a href='#'>Semester 5</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class='course-dropdown m-l-30 m-t-30'>
                    <li id="top">Select Couse
                        <span></span>
                        <ul class="course-dropdown-box">
                            <li><a href='#'>OS</a></li>
                            <li><a href='#'>TQM</a></li>
                            <li><a href='#'>DSP</a></li>
                            <li><a href='#'>SE</a></li>
                        </ul>
                    </li>
                </ul>
                </div>
                <div className="limiter">
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
                </div>
            </div>
        )
    }
}

export default ClassNotes;