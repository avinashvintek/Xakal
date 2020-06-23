import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../../src/minified-css/navbar.min.css'
import classNotes from './students-portal/class-notes';
import '../styles/navbar.css'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import StudentDetailsMaintain from './staff-portal/student-details-maintain';
import StaffDetailsMaintain from './management-portal/staff-details-maintain';
import DepartmentDetailsMaintain from './management-portal/department-details.maintain';
import CourseDetailsMaintain from './management-portal/course-details-maintain';
import PaperDetailsMaintain from './management-portal/paper-details-maintain';
import AddStudentDetails from './management-portal/add-student-details';
import AddCourseDetails from './management-portal/add-course-details';
import AddPaperDetails from './management-portal/add-paper-details';
import AddDepartmentDetails from './management-portal/add-department-details';
import AddSalaryDetails from './management-portal/accounts/add-salary-details';
import AddFeesReceipt from './management-portal/accounts/add-fees-receipt';
import Attendance from './students-portal/attendance';
import StaffAttendance from './staff-portal/attendance';
import EditInternalDetails from './staff-portal/assessments/edit-internal-details';
import AddInternalDetails from './staff-portal/assessments/add-internal-details';
import AddSemesterDetails from './management-portal/add-semester-details';
import ViewSemesterDetails from './staff-portal/assessments/view-semester-details';
import AddStaffDetails from './management-portal/add-staff-details';
import ManagementDashboard from './management-portal/dashboard';
import StaffDashboard from './staff-portal/dashboard';
class ManagementNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showClassNotes: false,
            professors: false,
            departments: false,
            course: false,
            paper: false,
            accounts: false,
            attendance: false,
            assessment: false,
            routerLink: ''
        }
    }

    componentDidMount() {
        if (this.props && this.props.state && this.props.state.location) {
            this.setState({ routerLink: this.props.state.location.pathname })
        }
    }

    componentWillUnmount() {
        // this.unlisten();
    }

    logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    /**
     * Handles the sub menu of college notes
     */
    onClassNotesClick() {
        if (this.state.showClassNotes) {
            this.setState({ showClassNotes: false })
        } else {
            this.setState({ showClassNotes: true })
        }
    }

    /**
     * Handles the sub menu of college notes
     */
    onNotesClick() {
        if (this.state.showNotes) {
            this.setState({ showNotes: false })
        } else {
            this.setState({ showNotes: true })
        }
    }

    /**
     * Handles the sub menu of professors
     */
    onProfessorsClick() {
        if (this.state.professors) {
            this.setState({ professors: false })
        } else {
            this.setState({ professors: true })
        }
    }

    /**
     * Handles the sub menu of departments
     */
    onDepartmentsClick() {
        if (this.state.departments) {
            this.setState({ departments: false })
        } else {
            this.setState({ departments: true })
        }
    }

    /**
     * Handles the sub menu of course
     */
    onCourseClick() {
        if (this.state.course) {
            this.setState({ course: false })
        } else {
            this.setState({ course: true })
        }
    }

    /**
     * Handles the sub menu of attendance
     */
    onAttendanceClick() {
        if (this.state.attendance) {
            this.setState({ attendance: false })
        } else {
            this.setState({ attendance: true })
        }
    }


    /**
     * Handles the sub menu of assessment
     */
    onAssessmentClick() {
        if (this.state.assessment) {
            this.setState({ assessment: false })
        } else {
            this.setState({ assessment: true })
        }
    }

    /**
     * Handles the sub menu of accounts
     */
    onAccountsClick() {
        if (this.state.accounts) {
            this.setState({ accounts: false })
        } else {
            this.setState({ accounts: true })
        }
    }


    /**
     * Handles the sub menu of paper
     */
    onPaperClick() {
        if (this.state.paper) {
            this.setState({ paper: false })
        } else {
            this.setState({ paper: true })
        }
    }

    render() {
        return (
            <Router>
                <div id="wrapper">
                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                        <button className="sidebar-brand d-flex align-items-center justify-content-center">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-laugh-wink"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3 logo-color">Xakal</div>
                        </button>
                        <hr className="sidebar-divider my-0" />
                        <li className="nav-item">
                            <Link to={{ pathname: `${this.state.routerLink}/dashboard`, userID: this.props.userID }} className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <hr className="sidebar-divider" />
                        <li className="nav-item">
                            <button className="nav-link" onClick={this.onClassNotesClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Students &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                {this.state.showClassNotes ? <i className="fa fa-angle-down fa-lg notes-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg notes-margin " aria-hidden="true"></i>}
                            </button>
                        </li>
                        {this.state.showClassNotes ? <div>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/view-student-details`, userID: this.props.userID }} className="nav-link">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>All Students</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/add-student-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Add Students</span>
                                </Link>
                            </li>
                        </div> : <div></div>}
                        <li className="nav-item">
                            <button className="nav-link collapsed" onClick={this.onProfessorsClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Professors&nbsp;&nbsp;</span>
                                {this.state.professors ? <i className="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                            </button>
                        </li>
                        {this.state.professors ? <div>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/staff-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>All Professors</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/add-staff-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Add Professors</span>
                                </Link>
                            </li>
                        </div> : <div></div>}
                        <li className="nav-item">
                            <button className="nav-link collapsed" onClick={this.onDepartmentsClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Department</span>
                                {this.state.departments ? <i className="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                            </button>
                        </li>
                        {this.state.departments ? <div>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/department-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>All Departments</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/add-department-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Add Department</span>
                                </Link>
                            </li>
                        </div> : <div></div>}
                        {this.state.routerLink === '/management-portal' ? <div>
                            <li className="nav-item">
                                <button className="nav-link collapsed" onClick={this.onCourseClick.bind(this)}>
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>Courses&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    {this.state.course ? <i className="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                        <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                                </button>
                            </li>
                            {this.state.course ? <div>
                                <li className="nav-item">
                                    <Link to={{ pathname: `${this.state.routerLink}/course-details`, userID: this.props.userID }} className="nav-link collapsed">
                                        <i className="fas fa-fw fa-wrench"></i>
                                        <span>All Courses</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={{ pathname: `${this.state.routerLink}/add-course-details`, userID: this.props.userID }} className="nav-link collapsed">
                                        <i className="fas fa-fw fa-wrench"></i>
                                        <span>Add Course</span>
                                    </Link>
                                </li>
                            </div> : <div></div>}
                        </div> : <span></span>}
                        <li className="nav-item">
                            <button className="nav-link collapsed" onClick={this.onPaperClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Papers&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                {this.state.paper ? <i className="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                            </button>
                        </li>
                        {this.state.paper ? <div>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/paper-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>All Papers</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/add-paper-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Add Paper</span>
                                </Link>
                            </li>
                        </div> : <div></div>}
                        <hr className="sidebar-divider d-none d-md-block" />

                        {this.state.routerLink === '/hod-portal' ? <div>
                            <li className="nav-item">
                                <button className="nav-link" onClick={this.onNotesClick.bind(this)}>
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>College Notes</span>
                                    {this.state.showNotes ? <i className="fa fa-angle-down fa-lg notes-margin" aria-hidden="true"></i> :
                                        <i className="fa fa-angle-right fa-lg notes-margin " aria-hidden="true"></i>}
                                </button>
                            </li>
                            {this.state.showNotes ? <div>
                                <li className="nav-item">
                                    <Link to={{ pathname: `${this.state.routerLink}/class-notes`, userID: this.props.userID }} className="nav-link collapsed">
                                        <i className="fas fa-fw fa-wrench"></i>
                                        <span>Class Notes</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={{ pathname: `${this.state.routerLink}/question-papers`, userID: this.props.userID }} className="nav-link collapsed">
                                        <i className="fas fa-fw fa-wrench"></i>
                                        <span>Question Papers</span>
                                    </Link>
                                </li>
                            </div> : <div></div>}
                            <hr className="sidebar-divider d-none d-md-block" />
                        </div> : <span></span>}
                        {this.state.routerLink === '/management-portal' ? <div>
                            <li className="nav-item">
                                <button className="nav-link collapsed" onClick={this.onAccountsClick.bind(this)}>
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>Accounts&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    {this.state.accounts ? <i className="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                        <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                                </button>
                            </li>
                            {this.state.accounts ? <div>
                                <li className="nav-item">
                                    <Link to={{ pathname: `${this.state.routerLink}/add-salary-details`, userID: this.props.userID }} className="nav-link collapsed">
                                        <i className="fas fa-fw fa-wrench"></i>
                                        <span>Salary</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={{ pathname: `${this.state.routerLink}/add-fees-receipt`, userID: this.props.userID }} className="nav-link collapsed">
                                        <i className="fas fa-fw fa-wrench"></i>
                                        <span>Fees</span>
                                    </Link>
                                </li>
                            </div> : <div></div>}
                        </div>
                            : <span></span>
                        }
                        <li className="nav-item">
                            <button className="nav-link collapsed" onClick={this.onAttendanceClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Attendance&nbsp;</span>
                                {this.state.attendance ? <i className="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                            </button>
                        </li>
                        {this.state.attendance ? <div>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/student-attendance`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Student Attendance</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/staff-attendance`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Staff Attendance</span>
                                </Link>
                            </li>
                        </div> : <div></div>}

                        <li className="nav-item">
                            <button className="nav-link collapsed" onClick={this.onAssessmentClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Assessment</span>
                                {this.state.assessment ? <i className="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                            </button>
                        </li>
                        {this.state.assessment ? <div>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/add-internal-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Add Internal Assessments</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/edit-internal-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Edit Internal Assessments</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/add-semester-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Add Semester Results</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/view-semester-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Semester Results</span>
                                </Link>
                            </li>
                        </div> : <div></div>}
                    </ul>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <button class="btn btn-sm btn-primary shadow-sm logout m-t-20 m-r-20" onClick={this.logout.bind(this)}> <i class="fa fa-power-off m-r-15"></i>Logout</button>
                            <Switch>
                                {/* management portal links */}
                                <Route path="/management-portal/view-student-details" component={StudentDetailsMaintain} />
                                <Route path="/management-portal/staff-details" component={StaffDetailsMaintain} />
                                <Route path="/management-portal/department-details" component={DepartmentDetailsMaintain} />
                                <Route path="/management-portal/course-details" component={CourseDetailsMaintain} />
                                <Route path="/management-portal/paper-details" component={PaperDetailsMaintain} />

                                <Route path="/management-portal/add-student-details" component={AddStudentDetails} />
                                <Route path="/management-portal/add-course-details" component={AddCourseDetails} />
                                <Route path="/management-portal/add-paper-details" component={AddPaperDetails} />
                                <Route path="/management-portal/add-department-details" component={AddDepartmentDetails} />
                                <Route path="/management-portal/add-salary-details" component={AddSalaryDetails} />
                                <Route path="/management-portal/add-fees-receipt" component={AddFeesReceipt} />

                                <Route path="/management-portal/student-attendance" component={Attendance} />
                                <Route path="/management-portal/staff-attendance" component={StaffAttendance} />
                                <Route path="/management-portal/edit-internal-details" component={EditInternalDetails} />
                                <Route path="/management-portal/add-internal-details" component={AddInternalDetails} />
                                <Route path="/management-portal/add-semester-details" component={AddSemesterDetails} />
                                <Route path="/management-portal/view-semester-details" component={ViewSemesterDetails} />
                                <Route path="/management-portal/add-staff-details" component={AddStaffDetails} />
                                <Route path="/management-portal/dashboard" component={ManagementDashboard} />

                                {/* hod portal links */}
                                <Route path="/hod-portal/view-student-details" component={StudentDetailsMaintain} />
                                <Route path="/hod-portal/staff-details" component={StaffDetailsMaintain} />
                                <Route path="/hod-portal/department-details" component={DepartmentDetailsMaintain} />
                                <Route path="/hod-portal/course-details" component={CourseDetailsMaintain} />
                                <Route path="/hod-portal/paper-details" component={PaperDetailsMaintain} />

                                <Route path="/hod-portal/add-student-details" component={AddStudentDetails} />
                                <Route path="/hod-portal/add-paper-details" component={AddPaperDetails} />
                                <Route path="/hod-portal/add-department-details" component={AddDepartmentDetails} />

                                <Route path="/hod-portal/student-attendance" component={Attendance} />
                                <Route path="/hod-portal/staff-attendance" component={StaffAttendance} />
                                <Route path="/hod-portal/edit-internal-details" component={EditInternalDetails} />
                                <Route path="/hod-portal/add-internal-details" component={AddInternalDetails} />
                                <Route path="/hod-portal/add-semester-details" component={AddSemesterDetails} />
                                <Route path="/hod-portal/view-semester-details" component={ViewSemesterDetails} />

                                <Route path="/hod-portal/class-notes" component={classNotes} />
                                <Route path="/hod-portal/xakal-notes" component={classNotes} />
                                <Route path="/hod-portal/question-papers" component={classNotes} />
                                <Route path="/hod-portal/add-staff-details" component={AddStaffDetails} />
                                <Route path="/hod-portal/dashboard" component={StaffDashboard} />

                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default ManagementNavBar;