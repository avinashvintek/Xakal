import React, { Component } from 'react';
import ManagementNavBar from './management-navbar';

class ManagementPortal extends Component {
    render() {
        return (
            <ManagementNavBar userID={this.props.location.state}  state={this.props}/>
        )
    }
}

export default ManagementPortal;