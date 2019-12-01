import React, { Component } from 'react';
import NavBar from './navbar';

class StudentsPortal extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <NavBar userID={this.props.location.state} />
        )
    }
}

export default StudentsPortal;