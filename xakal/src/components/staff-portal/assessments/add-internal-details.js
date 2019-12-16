import React, { Component } from 'react';
import '../../../styles/table.css';
import '../../../styles/dropdown.css';
import '../../../styles/course-dropdown.css';
import axios from 'axios';

class AddInternalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column1: '',
            column2: '',
            column3: '',
            column4: '',
            selectedSemester: '',
            selectedCourse: '',
            searchAllowed: false,
            uploadAllowed: false,
            courseList: [],
            notesList: [],
            background: '',
            backgroundCourse: '',
            backgroundModel: '',
            isFocussed: '',
            isCourseFocussed: '',
            onFocus: false,
            onCourseFocus: false,
            file: null,
            selectedModel: '',
            userID: ''
        };
        this.courseChange = this.onCourseChange.bind(this);
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
        this.setState({ selectedSemester: event.target.id, selectedCourse: '', onFocus: false, background: 'is-hidden' });
        var semester = event.target.id;
        axios.get(`http://localhost:4000/xakal/class-notes/course/${semester}`)
            .then((response) => {
                this.setState({ courseList: response.data });
            });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        } else if (this.state.uploadAllowed) {
            this.setState({ uploadAllowed: false })
        }
    }

    onDropDownFocus() {
        this.setState({ isFocussed: 'is-focused', onFocus: true, onCourseFocus: false, background: 'is-shown', backgroundCourse: 'is-hidden', backgroundModel: 'is-hidden' });
        if (this.state.selectedCourse === '') {
            this.setState({ isCourseFocussed: '' })
        }
    }

    onCourseDropDownFocus() {
        this.setState({ isCourseFocussed: 'is-focused', onCourseFocus: true, onFocus: false, background: 'is-hidden', backgroundCourse: 'is-shown', backgroundModel: 'is-hidden' });
    }

    onModelFocus() {
        this.setState({ isModelFocussed: 'is-focused', onCourseFocus: false, onFocus: false, onModelFocus: true, background: 'is-hidden', backgroundCourse: 'is-hidden', backgroundModel: 'is-shown' });
    }

    /**
     * Updates the selected course name
     */
    onCourseChange(event) {
        this.setState({ selectedCourse: event.target.id, onCourseFocus: false, backgroundCourse: 'is-hidden', background: 'is-hidden', });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        } else if (this.state.uploadAllowed) {
            this.setState({ uploadAllowed: false })
        }
    }

    onDescriptionChanged(event) {
        this.setState({ selectedModel: event.target.id, onModelFocus: false, backgroundCourse: 'is-hidden', background: 'is-hidden', backgroundModel: 'is-hidden' });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        } else if (this.state.uploadAllowed) {
            this.setState({ uploadAllowed: false })
        }
    }

    /**
     * Allows the grid to display the values based on routing
     */
    getDetails() {
        if (this.state.selectedSemester !== '' && this.state.selectedCourse !== '' && this.state.selectedModel !== '') {
            var params = { semester: this.state.selectedSemester.toLowerCase(), course: this.state.selectedCourse };
            axios.get(`http://localhost:4000/xakal/assessment/internaldetail`, { params: params })
                .then((response) => {
                    this.setState({ notesList: response.data, searchAllowed: true });
                });
        } else {
            alert('Please select the values');
            this.setState({ searchAllowed: false, uploadAllowed: false })
        }

    }

    /**
     * Displays the list of notes based on the API response
     */
    displayTable() {
        const selectedModel = this.state.selectedModel;
        const modelName = selectedModel.toLowerCase().replace(/ /g, ''); //remove white spaces
        return this.state.notesList.map((singleData, index) => {
            return (
                <tr className="row100" key={index++}>
                    <td className="column100 column1" data-column="column1">{++index}</td>
                    <td className={"column100 column2 "} key={index++} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.userID}</td>
                    <td className={"column100 column4 "} key={index++} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData[modelName]}</td>
                    <td className={"column100 column5 "} key={index++} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.uploadedBy}</td>
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
                return (<li className="mdl-menu__item animation" key={index}><a id={singleCourse.course} onClick={this.courseChange}>{singleCourse.course}</a></li>)
            });
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card-box">
                            <div className="card-body row">
                                <div className="col-lg-2 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isFocussed}>
                                        <input onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.selectedSemester} />
                                        <label className={"mdl-textfield__label " + this.state.background}>Semester</label>
                                        {this.state.onFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
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
                                <div className="col-lg-2 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isCourseFocussed}>
                                        <input onFocus={this.onCourseDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.selectedCourse} />
                                        <label className={"mdl-textfield__label " + this.state.backgroundCourse}>Course</label>
                                        {this.state.onCourseFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                            <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                    {this.displayCourse()}
                                                </ul>
                                            </div>
                                        </div> : <p></p>}
                                    </div>
                                </div>
                                <div className="col-lg-2 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isModelFocussed}>
                                        <input onFocus={this.onModelFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.selectedModel} />
                                        <label className={"mdl-textfield__label " + this.state.backgroundModel}>Model</label>
                                        {this.state.onModelFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                            <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                    <li className="mdl-menu__item animation" id="Model 1" onClick={this.onDescriptionChanged.bind(this)} >Model 1</li>
                                                    <li className="mdl-menu__item animation1" id="Model 2" onClick={this.onDescriptionChanged.bind(this)} >Model 2</li>
                                                    <li className="mdl-menu__item animation2" id="Model 3" onClick={this.onDescriptionChanged.bind(this)} >Model 3</li>

                                                </ul>
                                            </div>
                                        </div> : <p></p>}
                                    </div>
                                </div>
                                <div className="col-sm-4 p-t-20">
                                    <button type="button" onClick={this.getDetails.bind(this)} className="btn btn-primary m-t-15 m-l-30">Get Results!</button>
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
                                            <th className={"column100 column2 " + this.state.column1} onMouseEnter={this.descriptionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Student ID</th>
                                            <th className={"column100 column3 " + this.state.column2} onMouseEnter={this.downloadHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Marks Obtained</th>
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

export default AddInternalDetails;