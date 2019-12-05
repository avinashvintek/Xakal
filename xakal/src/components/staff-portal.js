import React, { Component } from 'react';
import NavBar from './navbar';

class StaffPortal extends Component {
    render() {
        return (
            <NavBar state={this.props}/>
        )
    }
}

export default StaffPortal;