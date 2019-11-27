import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../../src/minified-css/navbar.min.css'
import classNotes from './students-portal/class-notes';
import Dashboard from './students-portal/dashboard';
import '../styles/navbar.css'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import SemesterDetails from './students-portal/assessments/semester-details';
import InternalDetails from './students-portal/assessments/internal-details';
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showClassNotes: false,
            assessments: false
        }
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
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index-2.html">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-laugh-wink"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3">Xakal</div>
                        </a>
                        <hr className="sidebar-divider my-0" />
                        <li className="nav-item">
                            <Link to="/students-portal/dashboard" className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/students-portal/dashboard" className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Forum</span>
                            </Link>
                        </li>
                        <hr className="sidebar-divider" />
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.onClassNotesClick.bind(this)}>
                                <span>College Notes</span>
                                {this.state.showClassNotes ? <i className="fa fa-angle-down fa-lg notes-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg notes-margin " aria-hidden="true"></i>}
                            </a>
                        </li>
                        {this.state.showClassNotes ? <div>
                            <li className="nav-item">
                                <Link to="/students-portal/class-notes" className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Class Notes</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/students-portal/xakal-notes" className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Xakal Notes</span>
                                </Link>
                            </li> <li className="nav-item">
                                <Link to="/students-portal/question-papers" className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Question Papers</span>
                                </Link>
                            </li>
                        </div> : <div></div>}
                        <li className="nav-item">
                            <a className="nav-link collapsed" onClick={this.onAssessmentsClick.bind(this)}>
                                <span>Assessments</span>
                                {this.state.assessments ? <i class="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                            </a>
                        </li>
                        {this.state.assessments ? <div>
                            <li className="nav-item">
                                <Link to="/students-portal/internal-details" className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Internals</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/students-portal/semester-details" className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Semester</span>
                                </Link>
                            </li>
                        </div> : <div></div>}
                        <hr className="sidebar-divider d-none d-md-block" />
                        <li className="nav-item">
                            <Link to="/students-portal/dashboard" className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Attendance</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/students-portal/dashboard" className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Payment</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/students-portal/dashboard" className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Placement</span>
                            </Link>
                        </li>
                    </ul>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Switch>
                                <Route path="/students-portal/class-notes" component={classNotes} />
                                <Route path="/students-portal/xakal-notes" component={classNotes} />
                                <Route path="/students-portal/question-papers" component={classNotes} />
                                <Route path="/students-portal/dashboard" component={Dashboard} />
                                <Route path="/students-portal/semester-details" component={SemesterDetails} />
                                <Route path="/students-portal/internal-details" component={InternalDetails} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default NavBar;