import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/login.css';
import '../styles/utils.css';

import { Redirect } from 'react-router-dom'
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idClassName: '',
            passwordClassName: '',
            errorID: '',
            errorPassword: '',
            loginID: '',
            password: '',
            redirect: false
        }
    }

    /**
     * Triggers when username is given
     * Adds has-val className if the value is given
     * @param event contains the change event object
     */
    handleIDChange(event) {
        if (event.target.value) {
            this.setState({ idClassName: 'has-val', loginID: event.target.value })
        } else {
            this.setState({ idClassName: '', errorID: 'has-error', loginID: event.target.value })

        }
    }

    /**
    * Triggers when password is given
    * Adds has-val className if the value is given
    * @param event contains the change event object
    */
    handlePasswordChange(event) {
        if (event.target.value) {
            this.setState({ passwordClassName: 'has-val', password: event.target.value })
        } else {
            this.setState({ passwordClassName: '', errorPassword: 'has-error', password: event.target.value })

        }
    }

    /**
     * Triggers when the form is submitted
     * Checks whether the values are entered properly
     */
    formSubmit() {
        if (this.state.loginID && this.state.password) {
            this.setState({ redirect: true })
        } else {
            alert('Please fill in the fields')
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="students-portal" />
        } else {
            return (

                <div className="container-login100">
                    <div className="wrap-login100 p-b-20">
                        <form className="login100-form" onSubmit={this.formSubmit.bind(this)}>
                            <span className="login100-form-title p-b-40">
                                XAKAL
                        </span>
                            <span className="login100-form-avatar">
                                <img src={logo} alt="XAKAL" />
                            </span>

                            <div className={"wrap-input100 m-t-50 " + this.state.errorID}>
                                <input autoComplete="off" className={"input100 " + this.state.idClassName} type="text" onChange={this.handleIDChange.bind(this)} name="loginID" />
                                <span className={"focus-input100"} data-placeholder="ID"></span>
                            </div>

                            <div className={"wrap-input100 m-t-35 m-b-50 " + this.state.errorPassword}>
                                <input autoComplete="off" className={"input100 " + this.state.passwordClassName} onChange={this.handlePasswordChange.bind(this)} type="password" name="pass" />
                                <span className="focus-input100" data-placeholder="Password"></span>
                            </div>
                            <div className="container-login100-form-btn">
                                <button type="submit" className="login100-form-btn">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

export default Login;