import React, { Component } from 'react';
import '../../../styles/table.css';
import '../../../styles/dropdown.css';
import '../../../styles/course-dropdown.css';
import axios from 'axios';
class EditInternalDetails extends Component {
    constructor(props) {
        super(props);
        this.marksArray = [];
        this.studentID = [];
        this.state = {
            column1: '',
            column2: '',
            column3: '',
            column4: '',
            column5: '',
            selectedSemester: '',
            selectedCourse: '',
            searchAllowed: false,
            uploadAllowed: false,
            courseList: [],
            marksList: [],
            background: '',
            backgroundCourse: '',
            backgroundModel: '',
            isFocussed: '',
            isCourseFocussed: '',
            onFocus: false,
            onCourseFocus: false,
            file: null,
            selectedModel: '',
            userID: '',
            isEdit: false,
            internals: 0
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
    userIDHover(event) {
        var element = event.target.className;
        if (element === 'column100 column2 ') {
            this.setState({ column1: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when download is hovered
     */
    marksHover(event) {
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
     * Adds the hover class when upload by is hovered
     */
    actionHover(event) {
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
            column5: '',
        })
    }

    /**
     * Triggers the API call for course, based on the semester selected
     */
    onDropDownSelect(event) {
        this.setState({ selectedSemester: event.target.id, selectedCourse: '', onFocus: false, background: 'is-hidden' });
        var semester = event.target.id;
        axios.get(`/xakal/class-notes/course/${semester}`)
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
            axios.get(`/xakal/assessment/internaldetail`, { params: params })
                .then((response) => {
                    this.setState({ marksList: response.data, searchAllowed: true });
                });
        } else {
            alert('Please select the values');
            this.setState({ searchAllowed: false, uploadAllowed: false })
        }

    }

    redirect() {
        this.setState({ isEdit: true });
    }

    /**
     * Displays the list of notes based on the API response
     */
    displayTable() {
        const selectedModel = this.state.selectedModel;
        const modelName = selectedModel.toLowerCase().replace(/ /g, ''); //remove white spaces
        return this.state.marksList.map((singleData, index) => {
            return (
                <tr className="row100" key={index++}>
                    <td className="column100 column1" data-column="column1">{index}</td>
                    <td className={"column100 column2 "} key={index++} onMouseEnter={this.userIDHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.userID}</td>
                    <td className={"column100 column3 "} key={index++} onMouseEnter={this.marksHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData[modelName]}</td>
                    <td className={"column100 column4 "} key={index++} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.uploadedDate}</td>
                    <td className={"column100 column5 "} key={index++} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.uploadedBy}</td>
                    <td className={"column100 column6 "} key={index++} onMouseEnter={this.actionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}><button onClick={this.redirect.bind(this)}>Edit</button></td>
                </tr>
            )
        })
    }

    /**
     * Reverts back to the original state
     */
    discardChanges() {
        this.studentID = [];
        this.marksArray = [];
        this.setState({ isEdit: false });
        this.displayTable();
    }

    updatedMarks(singleElement, context) {
        const userID = singleElement._id;
        if (this.marksArray.length) {
            this.marksArray.forEach(element => {
                if (element.id === userID) {
                    element.marksObtained = context.target.value
                } else {
                    if (!this.studentID.includes(userID)) {
                        this.insertUpdatedMarks(userID, context);
                    }
                }
            });
        } else {
            if (!this.studentID.includes(userID)) {
                this.insertUpdatedMarks(userID, context);
            }
        }
        if (this.state.selectedModel === 'Model 3') {
            this.calculateInternalMarks(singleElement);
        }
    }

    insertUpdatedMarks(userID, context) {
        this.studentID.push(userID);
        this.marksArray.push({
            id: userID,
            marksObtained: context.target.value
        });
    }

    /**
     * Calculates the internal marks
     * Attendance marks - To be defined
     */
    calculateInternalMarks(singleElement) {
        const assessment1 = (singleElement.model1 / 100) * 5;
        const assessment2 = (singleElement.model2 / 100) * 5;
        const assessment3 = (singleElement.model3 / 100) * 5;
        const totalInternals = assessment1 + assessment2 + assessment3 + 5;
        this.setState({ internals: totalInternals });
    }

    updateMarks() {
        let isUpdated = false;
        if (this.marksArray && this.marksArray.length) {
            this.marksArray.forEach(element => {
                const params = {
                    marksObtained: element.marksObtained,
                    semester: this.state.selectedSemester.toLowerCase(),
                    course: this.state.selectedCourse,
                    model: this.state.selectedModel.toLowerCase(),
                    uploadedBy: this.state.userID.toUpperCase(),
                    uploadedDate: new Date(Date.now()).toLocaleString(),
                    internals: this.state.internals
                }
                axios.put(`/xakal/assessment/internaldetail/update/${element.id}`, params)
                    .then(() => {
                        if (!isUpdated) {
                            alert('Updated Successfully');
                        }
                        isUpdated = true;
                        this.setState({ searchAllowed: false, isEdit: false })
                    })
                    .catch((err) => console.log(err));
            });
        }
    }

    /**
     * Inline table edit
     */
    editTable() {
        const selectedModel = this.state.selectedModel;
        const modelName = selectedModel.toLowerCase().replace(/ /g, ''); //remove white spaces
        return this.state.marksList.map((singleData, index) => {
            return (
                <tr className="row100" key={index++}>
                    <td className="column100 column1" data-column="column1">{index}</td>
                    <td className={"column100 column2 "} key={index++} onMouseEnter={this.userIDHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.userID}</td>
                    <td className={"column100 column3 "} key={index++} onMouseEnter={this.marksHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}><input type="number" className="add-border" onChange={this.updatedMarks.bind(this, singleData)} defaultValue={singleData[modelName]}></input></td>
                    <td className={"column100 column4 "} key={index++} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.uploadedDate}</td>
                    <td className={"column100 column5 "} key={index++} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.uploadedBy}</td>
                    <td className={"column100 column6 "} key={index++} onMouseEnter={this.actionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}><button onClick={this.redirect.bind(this)}>Add / Edit</button></td>
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
                return (<li className="mdl-menu__item animation" key={index}><button id={singleCourse.course} onClick={this.courseChange}>{singleCourse.course}</button></li>)
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
                                        <input onFocus={this.onDropDownFocus.bind(this)} autoComplete="off" className="mdl-textfield__input display-border" type="text" id="sample2"
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
                                        <input onFocus={this.onCourseDropDownFocus.bind(this)} autoComplete="off" className="mdl-textfield__input display-border" type="text" id="sample2"
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
                                        <input onFocus={this.onModelFocus.bind(this)} autoComplete="off" className="mdl-textfield__input display-border" type="text" id="sample2"
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
                                            <th className={"column100 column2 " + this.state.column1} onMouseEnter={this.userIDHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Student ID</th>
                                            <th className={"column100 column3 " + this.state.column2} onMouseEnter={this.marksHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Marks Obtained</th>
                                            <th className={"column100 column4 " + this.state.column3} onMouseEnter={this.uploadDateHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Uploaded DateTime</th>
                                            <th className={"column100 column5 " + this.state.column4} onMouseEnter={this.uploadByHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Uploaded By</th>
                                            <th className={"column100 column6 " + this.state.column5} onMouseEnter={this.actionHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Action</th>
                                        </tr>
                                    </thead>
                                    {this.state.isEdit ?
                                        <tbody>
                                            {this.editTable()}
                                        </tbody> :
                                        <tbody>
                                            {this.displayTable()}
                                        </tbody>}
                                </table>
                            </div>
                        </div>
                    </div>
                </div> : <span></span>}
                {this.state.isEdit && this.state.searchAllowed ? <div className="right p-t-20 m-r-100">
                    {/* <td>
                        <a href="edit_professor.html"
                            class="btn btn-primary btn-xs">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="javasctipt().html"
                            class="btn btn-danger btn-xs">
                            <i class="fa fa-trash-o "></i>
                        </a>
                    </td> */}
                    <button type="button" onClick={this.updateMarks.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save Details</button>
                    <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button>
                </div> : <p></p>}
            </div>
        )
    }
}

export default EditInternalDetails;