import React, { Component } from 'react';
import NavBar from './navbar';

class StudentsPortal extends Component {
    render() {
        return (
            <NavBar userID={this.props.location.state} state={this.props} />
        )
    }
}

export default StudentsPortal;