import React, { Component } from 'react';
import axios from 'axios';
class AddCourseDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            studentName: '',
            departmentName: ''
        };
        this.baseState = this.state;

    }

    onDropDownFocus(event) {
        if (event.target) {
            event.target.parentNode.classList.add('is-focused');
            event.target.nextSibling.classList.add('is-shown');
        }
    }

    onFocusOut(event) {
        if (event.target) {
            if (event.target.value === '') {
                event.target.parentNode.classList.remove('is-focused');
            }
            event.target.nextSibling.classList.remove('is-shown');
        }
    }

    /**
     * Triggers when the form is changed and stores the values in state
     * @param event form values 
     */
    handleFormChange(event) {
        if (event.target.value) {
            this.setState({ [event.target.name]: event.target.value })
        }
    }

    /**
     * Triggers when the form is submitted
     * Checks whether the values are entered properly
     */
    formSubmit() {
        let isUpdated = false;
        if (this.state.courseName && this.state.duration && this.state.startingYear && this.state.studentCapacity) {
            const params = {
                name: this.state.courseName,
                duration: this.state.duration,
                updatedBy: this.state.userID.toUpperCase(),
                updatedDate: new Date(Date.now()).toLocaleString(),
                startingYear: this.state.startingYear,
                studentCapacity: this.state.studentCapacity,
            }
            axios.post(`/xakal/degreecoursedetail`, params)
                .then(() => {
                    if (!isUpdated) {
                        alert('Updated Successfully');
                    }
                    isUpdated = true;
                })
                .catch((err) => console.log(err));
        } else {
            alert('Please give all the details')
        }
    }

    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20 m-l-20">Add Course</h1>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card-box">
                            <div className="card-body row">
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            onChange={this.handleFormChange.bind(this)} name="courseName" />
                                        <label className={"mdl-textfield__label "}>Name</label>
                                    </div>
                                </div>
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="number" id="sample2"
                                            onChange={this.handleFormChange.bind(this)} name="duration"
                                        />
                                        <label className={"mdl-textfield__label "}>Duration (in years)</label>
                                    </div>
                                </div>

                            </div>
                            <div className="card-body row">
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="number" id="sample2"
                                            onChange={this.handleFormChange.bind(this)} name="startingYear" />
                                        <label className={"mdl-textfield__label "}>Starting year</label>
                                    </div>
                                </div>
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width "}>
                                        <input autoComplete="off" onBlur={this.onFocusOut.bind(this)} onFocus={this.onDropDownFocus.bind(this)} className="mdl-textfield__input display-border" type="number" id="sample2"
                                            onChange={this.handleFormChange.bind(this)} name="studentCapacity" />
                                        <label className={"mdl-textfield__label "}>Student capacity</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8 p-t-20">
                                <button type="button" onClick={this.formSubmit.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button>
                                <button type="button" className="btn btn-primary m-t-15 m-l-30">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default AddCourseDetails;