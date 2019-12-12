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
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showClassNotes: false,
            assessments: false,
            routerLink: ''
        }
    }

    componentDidMount() {
        if (this.props && this.props.state && this.props.state.location) {
            this.setState({ routerLink: this.props.state.location.pathname })
        }
    }

    componentWillUnmount() {
        this.unlisten();
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
                        <a className="sidebar-brand d-flex align-items-center justify-content-center">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-laugh-wink"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3">Xakal</div>
                        </a>
                        <hr className="sidebar-divider my-0" />
                        <li className="nav-item">
                            <Link to={{ pathname: `${this.state.routerLink}/dashboard`, userID: this.props.userID }} className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`${this.state.routerLink}/dashboard`} className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Forum</span>
                            </Link>
                        </li>
                        <hr className="sidebar-divider" />
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.onClassNotesClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>College Notes</span>
                                {this.state.showClassNotes ? <i className="fa fa-angle-down fa-lg notes-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg notes-margin " aria-hidden="true"></i>}
                            </a>
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
                            <a className="nav-link collapsed" onClick={this.onAssessmentsClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Assessments</span>
                                {this.state.assessments ? <i className="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                            </a>
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
                        <li className="nav-item">
                            <Link to={{ pathname: `${this.state.routerLink}/payment`, userID: this.props.userID }} className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Payment</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`${this.state.routerLink}/dashboard`} className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Placement</span>
                            </Link>
                        </li>
                    </ul>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
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

                                {/* staff portal links */}
                                <Route path="/staff-portal/class-notes" component={classNotes} />
                                <Route path="/staff-portal/question-papers" component={classNotes} />
                                <Route path="/staff-portal/dashboard" component={Dashboard} />
                                <Route path="/staff-portal/semester-details" component={ViewSemesterDetails} />
                                <Route path="/staff-portal/internal-details" component={InternalDetails} />
                                <Route path="/staff-portal/attendance" component={Attendance} />
                                <Route path="/staff-portal/payment" component={Payment} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default NavBar;