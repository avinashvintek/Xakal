import React, { Component } from 'react';
import '../../styles/table.css';
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
                <button class="btn btn-primary dropdown-toggle mr-4" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Basic dropdown</button>

                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Separated link</a>
                </div>
                <div class="limiter">
                    <div class="container-table100">
                        <div class="wrap-table100">
                            <div class="table100 ver5 m-b-110 table table-responsive">
                                <table>
                                    <thead>
                                        <tr class="row100 head">
                                            <th class="column100 column1" data-column="column1"></th>
                                            <th className={"column100 column2 " + this.state.column1} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Description</th>
                                            <th className={"column100 column3 " + this.state.column2} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Download</th>
                                            <th className={"column100 column4 " + this.state.column3} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Uploaded Date</th>
                                            <th className={"column100 column5 " + this.state.column4} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Uploaded By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="row100">
                                            <td class="column100 column1" data-column="column1">1</td>
                                            <td className={"column100 column2 "} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Operating System Unit 5</td>
                                            <td className={"column100 column3 "} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>--</td>
                                            <td className={"column100 column4 "} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>18/11/2018</td>
                                            <td className={"column100 column5 "} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Lilly</td>
                                        </tr>

                                        <tr class="row100">
                                            <td class="column100 column1" data-column="column1">2</td>
                                            <td className={"column100 column2 "} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Software Engineering Syllabus</td>
                                            <td className={"column100 column3 "} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>--</td>
                                            <td className={"column100 column4 "} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>11/11/2019</td>
                                            <td className={"column100 column5 "} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Anitha</td>
                                        </tr>

                                        <tr class="row100">
                                            <td class="column100 column1" data-column="column1">3</td>
                                            <td className={"column100 column2 "} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>TQM Important questions</td>
                                            <td className={"column100 column3 "} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>--</td>
                                            <td className={"column100 column4 "} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>12/11/2019</td>
                                            <td className={"column100 column5 "} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Gayathri</td>
                                        </tr>

                                        <tr class="row100">
                                            <td class="column100 column1" data-column="column1">4</td>
                                            <td className={"column100 column2 "} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>DSP problems</td>
                                            <td className={"column100 column3 "} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>--</td>
                                            <td className={"column100 column4 "} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>17/11/2019</td>
                                            <td className={"column100 column5 "} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Reddy</td>
                                        </tr>

                                        <tr class="row100">
                                            <td class="column100 column1" data-column="column1">5</td>
                                            <td className={"column100 column2 "} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>8:00 AM</td>
                                            <td className={"column100 column3 "} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>--</td>
                                            <td className={"column100 column4 "} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>--</td>
                                            <td className={"column100 column5 "} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>8:00 AM</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div></div></div>
            </div >
        )
    }
}

export default ClassNotes;