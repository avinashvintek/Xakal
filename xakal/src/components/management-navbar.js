import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../../src/minified-css/navbar.min.css'
import classNotes from './students-portal/class-notes';
import '../styles/navbar.css'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
class ManagementNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showClassNotes: false,
            professors: false,
            departments: false,
            course: false,
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

    render() {
        return (
            <Router>
                <div id="wrapper">
                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                        <a className="sidebar-brand d-flex align-items-center justify-content-center">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-laugh-wink"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3 logo-color">Xakal</div>
                        </a>
                        <hr className="sidebar-divider my-0" />
                        <li className="nav-item">
                            <Link to={{ pathname: `${this.state.routerLink}/dashboard`, userID: this.props.userID }} className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <hr className="sidebar-divider" />
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.onClassNotesClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Students &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                {this.state.showClassNotes ? <i className="fa fa-angle-down fa-lg notes-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg notes-margin " aria-hidden="true"></i>}
                            </a>
                        </li>
                        {this.state.showClassNotes ? <div>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/xakal-notes`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>All Students</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/question-papers`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Edit Students</span>
                                </Link>
                            </li>
                        </div> : <div></div>}
                        <li className="nav-item">
                            <a className="nav-link collapsed" onClick={this.onProfessorsClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Professors&nbsp;&nbsp;</span>
                                {this.state.professors ? <i className="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                            </a>
                        </li>
                        {this.state.professors ? <div>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/internal-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>All Professors</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/semester-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Add Professors</span>
                                </Link>
                            </li>
                        </div> : <div></div>}
                        <hr className="sidebar-divider d-none d-md-block" />
                        <li className="nav-item">
                            <a className="nav-link collapsed" onClick={this.onDepartmentsClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Department</span>
                                {this.state.departments ? <i className="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                            </a>
                        </li>
                        {this.state.departments ? <div>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/internal-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>All Departments</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/semester-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Add Department</span>
                                </Link>
                            </li>
                        </div> : <div></div>}
                        <li className="nav-item">
                            <a className="nav-link collapsed" onClick={this.onCourseClick.bind(this)}>
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Courses&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                {this.state.course ? <i className="fa fa-angle-down fa-lg assessment-margin" aria-hidden="true"></i> :
                                    <i className="fa fa-angle-right fa-lg assessment-margin" aria-hidden="true"></i>}
                            </a>
                        </li>
                        {this.state.course ? <div>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/internal-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>All Courses</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: `${this.state.routerLink}/semester-details`, userID: this.props.userID }} className="nav-link collapsed">
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Add Course</span>
                                </Link>
                            </li>
                        </div> : <div></div>}
                        <hr className="sidebar-divider d-none d-md-block" />
                        <li className="nav-item">
                            <Link to={`${this.state.routerLink}/dashboard`} className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Salary</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`${this.state.routerLink}/dashboard`} className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Fees</span>
                            </Link>
                        </li>
                    </ul>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Switch>
                                {/* student portal links */}
                                <Route path="/students-portal/class-notes" component={classNotes} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default ManagementNavBar;