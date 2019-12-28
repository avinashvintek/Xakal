import React, { Component } from 'react';
import axios from 'axios';
class ViewStudentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentDetails: []
        }
        this.baseState = this.state;
    }

    componentDidMount() {
        this.fetchStudentDetails();
    }

    fetchStudentDetails() {
        axios.get(`http://localhost:4000/xakal/studentdetail`)
            .then((response) => {
                this.setState({ studentDetails: response.data });
            });
    }

    displayStudentDetails() {
        return this.state.studentDetails.map((singleData, index) => {
            return (
                <tr class="odd gradeX" key={index++}>
                    <td className={"left"} key={index++}>{singleData.userID}</td>
                    <td className={"left"} key={index++}>{singleData.name}</td>
                    <td className={"left"} key={index++}>{singleData.course} - {singleData.branch}</td>
                    <td className={"left"} key={index++}>{singleData.email}</td>
                    <td className={"left"} key={index++}>{singleData.contact}</td>
                    <td className={"left"} key={index++}>{singleData.emergencyContact}</td>
                    <td className={"left"} key={index++}>{singleData.parentName}</td>
                    <td className={"left"} key={index++}>{singleData.bloodGroup}</td>
                </tr>
            )
        })
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20">All Students</h1>
                    {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Change password</a> */}
                </div>
                {/* <form class="search-form-opened" action="#" method="GET">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search..." name="query" />
                        <span class="input-group-btn">
                            <a href="javascript:;" class="btn submit">
                                <i class="icon-magnifier"></i>
                            </a>
                        </span>
                    </div>
                </form> */}
                <div class="table-scrollable">
                    <table
                        class="table table-striped table-bordered table-hover table-checkable order-column valign-middle"
                        id="example4">
                        <thead>
                            <tr>
                                <th> Roll No </th>
                                <th> Name </th>
                                <th> Department </th>
                                <th> Email </th>
                                <th> Mobile </th>
                                <th> Emergency Contact </th>
                                <th> Parents/Guardian </th>
                                <th> BG </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayStudentDetails()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ViewStudentDetails;