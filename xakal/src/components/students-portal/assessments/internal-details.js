import React, { Component } from 'react';
import '../../../styles/table.css';
import '../../../minified-css/material-min.css';
import '../../../styles/dropdowns.css';
import '../../../styles/theme-style.css';
import axios from 'axios';

class InternalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column1: '',
            column2: '',
            column3: '',
            column4: '',
            column5: '',
            selectedSemester: '',
            searchAllowed: false,
            notesList: [],
            background: '',
            isFocussed: '',
            onFocus: false,
        };
        this.baseState = this.state;

    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            this.setState(this.baseState);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    /**
     * Adds the hover class when course is hovered
     */
    courseHover(event) {
        var element = event.target.className;
        if (element === 'column100 column2 ') {
            this.setState({ column1: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when model 1 is hovered
     */
    modelHover1(event) {
        var element = event.target.className;
        if (element === 'column100 column3 ') {
            this.setState({ column2: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when model 2 is hovered
     */
    modelHover2(event) {
        var element = event.target.className;
        if (element === 'column100 column4 ') {
            this.setState({ column3: 'hov-column-head-ver5' })
        }
    }


    /**
     * Adds the hover class when model 3 is hovered
     */
    modelHover3(event) {
        var element = event.target.className;
        if (element === 'column100 column5 ') {
            this.setState({ column4: 'hov-column-head-ver5' })
        }
    }


    /**
     * Adds the hover class when internals is hovered
     */
    internalsHover(event) {
        var element = event.target.className;
        if (element === 'column100 column6 ') {
            this.setState({ column5: 'hov-column-head-ver5' })
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
            column5: ''
        })
    }

    /**
     * Sets the semester selected
     */
    onDropDownSelect(event) {
        this.setState({ selectedSemester: event.target.id, onFocus: false, background: 'is-hidden' });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    onDropDownFocus() {
        this.setState({ isFocussed: 'is-focused', onFocus: true, background: 'is-shown' });
    }

    /**
     * Allows the grid to display the values
     */
    getResult() {
        if (this.state.selectedSemester !== '') {
            this.fetchInternalDetails();
        } else {
            alert('Please select the values');
            this.setState({ searchAllowed: false })
        }

    }


    /**
     * Fetches the internals mark based on semester selected
     */
    fetchInternalDetails() {
        this.setState({ searchAllowed: true });
        var semester = this.state.selectedSemester;
        var course = this.state.selectedCourse;
        axios.get(`http://localhost:4000/xakal/assessment/internaldetail/${semester}`)
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
                    <td className={"column100 column3 "} onMouseEnter={this.modelHover1.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.model1}</td>
                    <td className={"column100 column4 "} onMouseEnter={this.modelHover2.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.model2}</td>
                    <td className={"column100 column5 "} onMouseEnter={this.modelHover3.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.model3}</td>
                    <td className={"column100 column6 "} onMouseEnter={this.internalsHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.internals}</td>
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
                                <div className="col-sm-8 p-t-20">
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
                                            <th className={"column100 column2 " + this.state.column1} onMouseEnter={this.courseHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Course</th>
                                            <th className={"column100 column3 " + this.state.column2} onMouseEnter={this.modelHover1.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Model 1</th>
                                            <th className={"column100 column4 " + this.state.column3} onMouseEnter={this.modelHover2.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Model 2</th>
                                            <th className={"column100 column5 " + this.state.column4} onMouseEnter={this.modelHover3.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Model 3</th>
                                            <th className={"column100 column6 " + this.state.column5} onMouseEnter={this.internalsHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Internals</th>
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

export default InternalDetails;