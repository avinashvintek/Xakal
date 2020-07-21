import React, { Component } from 'react';
import axios from 'axios';
class PaperDetailsMaintain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paperDetails: [],
            isEdit: false,
            isDelete: false,
            userID: ''
        }
        this.baseState = this.state;
        this.paperArray = [];
        this.paperID = [];
    }
    deleteArray = [];
    componentDidMount() {
        if (this.props && this.props.location && this.props.location.userID) {
            this.setState({ routerLink: this.props.location.pathname, userID: this.props.location.userID.userID })
        }
        this.fetchPaperDetails();
    }

    fetchPaperDetails() {
        axios.get(`/xakal/coursedetail`)
            .then((response) => {
                this.setState({ paperDetails: response.data, values: response.data });
            });
    }

    displayPaperDetails() {
        return this.state.paperDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.course}</td>
                    <td className={"left"} key={index++}>{singleData.courseCode}</td>
                    <td className={"left"} key={index++}>{singleData.courseCredits}</td>
                    <td className={"left"} key={index++}>{singleData.semester}</td>
                    <td className={"left"} key={index++}>{singleData.department}</td>

                </tr>
            )
        })
    }

    /**
     * Adds remove element in the end
     */
    deletePaperDetails() {
        return this.state.paperDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.course}
                    </td>
                    <td className={"left"} key={index++}>{singleData.courseCode}
                    </td>
                    <td className={"left"} key={index++}>{singleData.courseCredits}
                    </td>
                    <td className={"left"} key={index++}>{singleData.semester}
                    </td>
                    <td className={"left"} key={index++}>{singleData.department}
                    </td>
                    <td>  <button type="button" onClick={i => this.removeClick(singleData, index -= 6)} className="btn btn-danger m-t-4 m-l-30">X</button>
                    </td>
                </tr>
            )
        })
    }

    /**
    * Removes the selected row
    * @param index selected row index
    */
    removeClick(singleData, i) {
        this.deleteArray.push(singleData);
        let paperDetails = [...this.state.paperDetails];
        paperDetails.splice(i, 1);
        this.setState({ paperDetails });
    }

    /**
     * Reverts back to the original state
     */
    discardChanges() {
        this.paperArray = [];
        this.paperID = [];
        this.setState({ isEdit: false, isDelete: false, paperDetails: this.state.values });
        this.displayPaperDetails();
    }

    onEdit(singleElement, changedField, context) {
        const userID = singleElement._id;
        if (this.paperArray.length) {
            this.paperArray.forEach(element => {
                if (element._id === userID) {
                    element[changedField] = context.target.value
                } else {
                    if (!this.paperID.includes(userID)) {
                        this.insertUpdatedDetails(userID, singleElement, changedField, context);
                    }
                }
            });
        } else {
            if (!this.paperID.includes(userID)) {
                this.insertUpdatedDetails(userID, singleElement, changedField, context);
            }
        }
    }

    insertUpdatedDetails(userID, singleElement, changedField, context) {
        this.paperID.push(userID);
        this.paperArray.push(singleElement);
        this.paperArray.forEach(element => {
            if (element._id === userID) {
                element[changedField] = context.target.value
            }
        });
    }

    /**
     * sets the edit flag to true
     */
    redirect() {
        this.setState({ isEdit: true, isDelete: false });
    }

    /**
     * sets the delete flag to true
     */
    deleteRedirect() {
        this.setState({ isDelete: true, isEdit: false });
    }

    updateDetails() {
        let isUpdated = false;
        if (this.state.isEdit && this.paperArray && this.paperArray.length) {
            this.paperArray.forEach(element => {
                const params = {
                    course: element.course,
                    semester: element.semester,
                    updatedBy: this.state.userID.toUpperCase(),
                    updatedDate: new Date(Date.now()).toLocaleString(),
                    department: element.department,
                    courseCode: element.courseCode,
                    courseCredits: element.courseCredits,
                }
                axios.put(`/xakal/coursedetail/update/${element._id}`, params)
                    .then(() => {
                        if (!isUpdated) {
                            alert('Updated Successfully');
                        }
                        isUpdated = true;
                        this.setState({ isEdit: false })
                    })
                    .catch((err) => console.log(err));
            });
            this.discardChanges();

        } else if (this.state.isDelete && this.deleteArray && this.deleteArray.length) {
            this.deleteArray.forEach(element => {
                axios.delete(`/xakal/coursedetail/${element._id}`)
                    .then(() => {
                        if (!isUpdated) {
                            alert('Deleted Successfully');
                        }
                        isUpdated = true;
                        this.setState({ isDelete: false, });
                        this.fetchPaperDetails();
                    })
                    .catch((err) => console.log(err));
            });
        }
    }

    editPaperDetails() {
        return this.state.paperDetails.map((singleData, index) => {
            return (
                <tr className="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'course')} defaultValue={singleData.course}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'courseCode')} defaultValue={singleData.courseCode}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'courseCredits')} defaultValue={singleData.courseCredits}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'semester')} defaultValue={singleData.semester}></input></td>
                    <td className={"left"} key={index++}><input type="text" className="add-border" onChange={this.onEdit.bind(this, singleData, 'department')} defaultValue={singleData.department}></input></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20">All Courses</h1>
                </div>
                <div className="table-scrollable">
                    <table
                        className="table table-striped table-hover table-responsive table-checkable order-column"
                        id="example4">
                        <thead>
                            <tr>
                                <th> Name </th>
                                <th> Code </th>
                                <th> Credits </th>
                                <th> Semester </th>
                                <th> Department </th>
                            </tr>
                        </thead>
                        {this.state.isEdit ?
                            <tbody>
                                {this.editPaperDetails()}
                            </tbody> :
                            this.state.isDelete ?
                                <tbody>{this.deletePaperDetails()}</tbody>
                                :
                                <tbody>
                                    {this.displayPaperDetails()}
                                </tbody>}
                    </table>
                </div>

                {this.state.routerLink === '/management-portal/paper-details' || this.state.routerLink === '/hod-portal/paper-details' ? <div hidden={this.state.isEdit} className="right p-t-20">
                    <button type="button" onClick={this.deleteRedirect.bind(this)} hidden={this.state.isDelete} className="btn btn-primary m-t-15 m-l-30">Delete Details</button>
                    {this.state.isDelete ? <button type="button" onClick={this.updateDetails.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button> : <p></p>}
                    {this.state.isDelete ? <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button> : <p></p>}
                </div> : <p></p>}

                {this.state.routerLink === '/management-portal/paper-details' || this.state.routerLink === '/hod-portal/paper-details' ? <div hidden={this.state.isDelete} className="right p-t-20">
                    <button type="button" onClick={this.redirect.bind(this)} hidden={this.state.isEdit} className="btn btn-primary m-t-15 m-l-30">Edit Details</button>
                    {this.state.isEdit ? <button type="button" onClick={this.updateDetails.bind(this)} className="btn btn-primary m-t-15 m-l-30">Save</button> : <p></p>}
                    {this.state.isEdit ? <button type="button" onClick={this.discardChanges.bind(this)} className="btn btn-primary m-t-15 m-l-30">Cancel</button> : <p></p>}
                </div> : <p></p>}
            </div>
        )
    }
}

export default PaperDetailsMaintain;