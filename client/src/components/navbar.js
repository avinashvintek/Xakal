import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../../src/minified-css/navbar.min.css'
import classNotes from './students-portal/class-notes';
import Dashboard from './students-portal/dashboard';
import '../styles/navbar.css'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import SemesterDetails from './students-portal/assessments/semester-details';
import InternalDetails from './students-portal/assessments/internal-details';
import Attendance from './students-portal/attendance';
import Payment from './students-portal/payment';
import ViewSemesterDetails from './staff-portal/assessments/view-semester-details';
import SalaryDetails from './staff-portal/salary-details';
import StaffAttendance from './staff-portal/attendance';
import StaffDashboard from './staff-portal/dashboard';
import StudentDetailsMaintain from './staff-portal/student-details-maintain';
import Login from './login';
import EditInternalDetails from './staff-portal/assessments/edit-internal-details';
import Forum from './forum';
import ManagementDashboard from './management-portal/dashboard';
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showClassNotes: false,
            assessments: false,
            routerLink: ''
        }
        this.baseState = this.state;
    }

    logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    componentDidMount() {
        if (this.props && this.props.state && this.props.state.location) {
            this.setState({ routerLink: this.props.state.location.pathname })
        }
    }

    componentWillUnmount() {
        // this.unlisten();
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
     * Handles the sub menu of assessments
     */
    onAssessmentsClick() {
        if (this.state.assessments) {
            this.setState({ assessments: false })
        } else {
            this.setState({ assessments: true })
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
                        {this.state.routerLink === '/students-portal' || this.state.routerLink === '/staff-portal' ? <li className="nav-item">
                            <Link to={{ pathname: `${this.state.routerLink}/forum`, userID: this.props.userID }} className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Forum</span>
                            </Link>
                        </li> : <span></span>}
                        {this.state.routerLink === '/staff-portal' ?
                            <li className="nav-item">
                                <Link to={`${this.state.routerLink}/view-student-details`} className="nav-link">
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>Student Details</span>
                                </Link>
                            </li> : <span></span>}
                        <hr className="sidebar-divider" />
                        <li className="nav-item">
                            <button className="nav-link" onClick={this.onClassNotesClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>College Notes</span>
                                {this.state.showClassNotes ? <i className="fa fa-angle-down fa-lg notes-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg notes-margin " aria-hidden="true"></i>}
                            </button>
                        </li>
                        {this.state.showClassNotes ? <div>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/class-notes`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Class Notes</span>
                                </Link>
                            </li>
                            {this.state.routerLink === '/students-portal' ? <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/xakal-notes`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Xakal Notes</span>
                                </Link>
                            </li> : <p></p>}
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/question-papers`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Question Papers</span>
                                </Link>
                            </li>
                        </div> : <div></div>}
                        <li className="nav-item">
                            <button className="nav-link collapsed" onClick={this.onAssessmentsClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Assessments</span>
                                {this.state.assessments ? <i className="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                            </button>
                        </li>
                        {this.state.assessments ? <div>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/internal-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Internals</span>
                                </Link>
                            </li>
                            {this.state.routerLink === '/students-portal' ? <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/semester-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Semester</span>
                                </Link>
                            </li> :
                                <li className="nav-item">
                                    <Link to={{ pathname: `${this.state.routerLink}/semester-details`, userID: this.props.userID }} className="nav-link collapsed">
                                        <i className="fas fa-fw fa-wrench"></i>
                                        <span>Semester</span>
                                    </Link>
                                </li>}
                        </div> : <div></div>}
                        <hr className="sidebar-divider d-none d-md-block" />
                        <li className="nav-item">
                            <Link to={{ pathname: `${this.state.routerLink}/attendance`, userID: this.props.userID }} className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Attendance</span>
                            </Link>
                        </li>
                        {this.state.routerLink === '/students-portal' ? <li className="nav-item">
                            <Link to={{ pathname: `${this.state.routerLink}/payment`, userID: this.props.userID }} className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Payment</span>
                            </Link>
                        </li> : <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/salary`, userID: this.props.userID }} className="nav-link">
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>Salary</span>
                                </Link>
                            </li>}
                        {this.state.routerLink === '/students-portal' ? <li className="nav-item">
                            <Link to={`${this.state.routerLink}/dashboard`} className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Placement</span>
                            </Link>
                        </li> : <p></p>}
                    </ul>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <button class="btn btn-sm btn-primary shadow-sm logout m-t-20 m-r-20" onClick={this.logout.bind(this)}> <i class="fa fa-power-off m-r-15"></i>Logout</button>

                            <Switch>
                                {/* student portal links */}
                                <Route path="/students-portal/class-notes" component={classNotes} />
                                <Route path="/students-portal/xakal-notes" component={classNotes} />
                                <Route path="/students-portal/question-papers" component={classNotes} />
                                <Route path="/students-portal/dashboard" component={Dashboard} />
                                <Route path="/students-portal/semester-details" component={SemesterDetails} />
                                <Route path="/students-portal/internal-details" component={InternalDetails} />
                                <Route path="/students-portal/attendance" component={Attendance} />
                                <Route path="/students-portal/payment" component={Payment} />
                                <Route path="/students-portal/forum" component={Forum} />
                                <Route path="/students-portal/student-profile" component={Dashboard} />
                                <Route path="/students-portal/staff-profile" component={StaffDashboard} />
                                <Route path="/students-portal/manangement-profile" component={ManagementDashboard} />
                                <Route path="/students-portal/hod-profile" component={StaffDashboard} />

                                {/* staff portal links */}
                                <Route path="/staff-portal/class-notes" component={classNotes} />
                                <Route path="/staff-portal/question-papers" component={classNotes} />
                                <Route path="/staff-portal/dashboard" component={StaffDashboard} />
                                <Route path="/staff-portal/semester-details" component={ViewSemesterDetails} />
                                <Route path="/staff-portal/internal-details" component={EditInternalDetails} />
                                <Route path="/staff-portal/attendance" component={StaffAttendance} />
                                <Route path="/staff-portal/salary" component={SalaryDetails} />
                                <Route path="/staff-portal/view-student-details" component={StudentDetailsMaintain} />
                                <Route path="/staff-portal/forum" component={Forum} />
                                <Route path="/staff-portal/student-profile" component={Dashboard} />
                                <Route path="/staff-portal/staff-profile" component={StaffDashboard} />
                                <Route path="/staff-portal/manangement-profile" component={ManagementDashboard} />
                                <Route path="/staff-portal/hod-profile" component={StaffDashboard} />
                                <Route exact path="/" component={Login} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default NavBar;