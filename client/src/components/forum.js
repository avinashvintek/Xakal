import React, { Component } from 'react';
import axios from 'axios';

class Forum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forumDetails: [],
        }
        this.baseState = this.state;
    }

    componentDidMount() {
        if (this.props && this.props.location && this.props.location.userID) {
            const userID = this.props.location.userID;
            this.setState({ userID: userID.userID, userRole: userID.userRole, routerLink: this.props.location.pathname });
            this.fetchWallPostDetails();
        }
        this.unlisten = this.props.history.listen((location, action) => {
            this.setState(this.baseState);
            this.fetchWallPostDetails();
        });
    }

    componentWillUnmount() {
        this.unlisten()
    }

    fetchUserDetails() {
        if (this.props && this.props.location && this.props.location.userID) {
            if (this.props.location.userID.userRole === 'student') {
                axios.get(`/xakal/studentdetail/${this.props.location.userID.userID}`)
                    .then((response) => {
                        this.setState({ userDetails: response.data });
                    });
            } else {
                axios.get(`/xakal/staffdetail/${this.props.location.userID.userID}`)
                    .then((response) => {
                        this.setState({ userDetails: response.data });
                    });
            }
        }
    }

    /**
    * Fetches all department
    */
    fetchWallPostDetails() {
        this.fetchUserDetails();
        axios.get(`/xakal/forumdetail`)
            .then((response) => {
                this.setState({ forumDetails: response.data });
            });
    }

    /**
     * gets the comments based on the post selected
     */
    fetchComments(selectedPost) {
        axios.get(`/xakal/comments/get/${selectedPost.postID}`)
            .then((response) => {
                this.setState({ commentsList: response.data });
            });
    }

    /**
    * Triggers when the form is changed and stores the values in state
    * @param event form values 
    */
    handleFormChange(event) {
        if (event.target.value) {
            this.setState({ [event.target.name]: event.target.value })
        }
    }


    handleCommentsChange(singleDetail, event) {
        if (event.target && event.target.value) {
            const value = event.target.value;
            this.setState(prevState => ({
                ...prevState,
                forumDetails: this.state.forumDetails.filter((element) => {
                    if (element._id === singleDetail._id) {
                        element.comments = value;
                    }
                    return element
                })
            }));
        }
    }

    handleClick = (singleDetail) => {
        axios.get(`/xakal/user/${singleDetail.userID.toUpperCase()}`)
            .then((response) => {
                if (response && response.data) {
                    const isSameProfile = this.state.userID.toUpperCase() === singleDetail.userID.toUpperCase();
                    if (response.data.userRole === 'student') {
                        this.props.history.push('student-profile', { userID: singleDetail.userID.toUpperCase(), isSameProfile: isSameProfile, loginID: this.state.userID })
                    } else if (response.data.userRole === 'staff') {
                        this.props.history.push('staff-profile', { userID: singleDetail.userID.toUpperCase(), isSameProfile: isSameProfile, loginID: this.state.userID })
                    } else if (response.data.userRole === 'management') {
                        this.props.history.push('management-profile', { userID: singleDetail.userID.toUpperCase(), isSameProfile: isSameProfile, loginID: this.state.userID })
                    } else if (response.data.userRole === 'hod') {
                        this.props.history.push('hod-profile', { userID: singleDetail.userID.toUpperCase(), isSameProfile: isSameProfile, loginID: this.state.userID })
                    }
                }
            })
    }

    /**
     * Displays the list of department based on the API response
     */
    displayPosts() {
        if (this.state && this.state.forumDetails && this.state.forumDetails.length) {
            return this.state.forumDetails.map((singleDetail, index) => {
                if (singleDetail.isVisible !== 'isVisible') {
                    singleDetail.isVisible = 'isHidden';
                }
                if (this.props.location && this.props.location.userID && singleDetail.likedUsers.includes(this.props.location.userID.userID.toUpperCase())) {
                    singleDetail.isAlreadyLiked = "btn-success"
                } else {
                    singleDetail.isAlreadyLiked = "btn-info"
                }
                return (<li className="m-t-20" key={index}>
                    <div className="post-box panel">
                        <span
                            class="text-muted text-small"><i
                                class="fa fa-clock-o"
                                aria-hidden="true"></i>
                            {this.timeConverter(singleDetail.postedTime)}</span>
                        <div className="p-l-15 p-b-15">
                            <button type="button" onClick={this.handleClick.bind(this, singleDetail)}>{singleDetail.fullName}</button>
                            <p>{singleDetail.caption} </p>
                            <p> <button type="button" onClick={this.updateLikes.bind(this, singleDetail)}
                                className={"btn btn-raised btn-sm " + singleDetail.isAlreadyLiked}><i
                                    className="fa fa-heart-o"
                                ></i>
                            Like ({singleDetail.likes}) </button> <button
                                    onClick={this.visibleReplySection.bind(this, singleDetail)}
                                    className="btn btn-raised bg-soundcloud btn-sm"><i
                                        className="zmdi zmdi-long-arrow-return"></i>
                            Reply</button> </p>
                        </div>
                        <div hidden={singleDetail.isVisible === 'isHidden'} className="row">
                            <div className="col-md-12">
                                <div className="panel p-r-10 p-b-10 p-t-10">
                                    <div className="col-md-2 block">
                                        <img
                                            src={require('../images/staffProfile.png')}
                                            className="img-responsive pull-right" height="45%" width="45%" alt="" />
                                    </div>
                                    <div className="col-md-8 block">
                                        <input type="text" value={singleDetail.comments} onChange={this.handleCommentsChange.bind(this, singleDetail)} name="comments" placeholder="Your comments..." className="add-border col-md-12"></input>
                                    </div>
                                    <button
                                        onClick={this.insertComments.bind(this, singleDetail)}
                                        className="col-md-2 block btn btn-info bg-soundcloud btn-sm">
                                        Comment</button>
                                </div>

                            </div>

                            {this.displayComments()}
                        </div>
                    </div>

                </li>)

            });
        }
    }

    displayComments() {
        if (this.state.commentsList && this.state.commentsList.length) {
            return this.state.commentsList.map((singleDetail, index) => {
                return (<div key={index} className="col-md-12">
                    <div className="panel p-r-10 p-b-10 p-t-10">
                        <div className="col-md-2 block">
                            <img
                                src={require('../images/staffProfile.png')}
                                className="img-responsive pull-right" height="45%" width="45%" alt="" />
                        </div>
                        <div className="col-md-8 block">
                            <p>{singleDetail.comments}</p>
                        </div>
                        <div className="col-md-2 block">
                            <p>{this.timeConverter(singleDetail.postedTime)}</p>
                        </div>
                    </div>

                </div>)
            });

        }
    }

    /**
     * Triggers when the form is submitted
     * Checks whether the values are entered properly
     */
    formSubmit() {
        let isUpdated = false;
        if (this.state.caption) {
            const params = {
                userID: this.state.userID.toUpperCase(),
                fullName: this.state.userDetails.name,
                likes: 0,
                postedTime: Math.floor(Date.now() / 1000),
                caption: this.state.caption,
                postID: `${this.state.userID.toUpperCase()}-${this.randomId()}`
            }
            axios.post(`/xakal/forumdetail`, params)
                .then(() => {
                    if (!isUpdated) {
                        alert('Updated Successfully');
                        this.setState({ caption: '' });
                        this.fetchWallPostDetails();
                    }
                    isUpdated = true;
                })
                .catch((err) => console.log(err));
        } else {
            alert('Please give the captions')
        }
    }

    // Generate random Id for images
    randomId() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    visibleReplySection(singleDetail) {
        this.fetchComments(singleDetail);
        this.setState(prevState => ({
            ...prevState,
            forumDetails: this.state.forumDetails.filter((element) => {
                if (element._id === singleDetail._id) {
                    element.isVisible = 'isVisible';
                }
                return element
            })
        }))
    }

    /**
     * Updates the likes for selected photo
     * @param singleDetail likes photo reference
     */
    updateLikes(singleDetail) {
        let params;
        if (singleDetail.isAlreadyLiked === 'btn-info') {
            singleDetail.likedUsers.push(this.state.userID.toUpperCase())
            params = {
                "likes": singleDetail.likes + 1,
                "likedUsers": singleDetail.likedUsers
            }
        } else if (singleDetail.isAlreadyLiked === 'btn-success') {
            singleDetail.likedUsers = singleDetail.likedUsers.filter((response) => response !== this.state.userID.toUpperCase())
            params = {
                "likes": singleDetail.likes - 1,
                "likedUsers": singleDetail.likedUsers
            }
        }
        axios.put(`/xakal/forumdetail/updatelikes/${singleDetail._id}`, params)
            .then(() => {
                this.setState(prevState => ({
                    ...prevState,
                    forumDetails: this.state.forumDetails.filter((element) => {
                        if (element._id === singleDetail._id) {
                            if (singleDetail.isAlreadyLiked === 'btn-info') {
                                element.likes = element.likes + 1;
                                element.isAlreadyLiked = 'btn-success'
                            } else if (singleDetail.isAlreadyLiked === 'btn-success') {
                                element.likes = element.likes - 1;
                                element.isAlreadyLiked = 'btn-info'
                            }
                        }
                        return element
                    })
                }))
            })
            .catch((err) => console.log(err));
    }

    insertComments(singleDetail) {
        let params;
        params = {
            postID: singleDetail.postID,
            userID: this.state.userID.toUpperCase(),
            comments: singleDetail.comments,
            postedTime: Math.floor(Date.now() / 1000),
        }
        axios.post(`/xakal/comments`, params)
            .then(() => {
                this.setState(prevState => ({
                    ...prevState,
                    forumDetails: this.state.forumDetails.filter((element) => {
                        if (element._id === singleDetail._id) {
                            element.comments = '';
                            this.fetchComments(element);
                        }
                        return element
                    })
                }));
            })
            .catch((err) => console.log(err));
    }

    /**
     * Converts timestamp to readable format
     * @param timestamp response from API
     */
    timeConverter(timestamp) {
        let a = new Date(timestamp * 1000);
        let seconds = Math.floor((new Date() - a) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + ' year' + this.pluralCheck(interval);
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + ' month' + this.pluralCheck(interval);
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + ' day' + this.pluralCheck(interval);
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + ' hour' + this.pluralCheck(interval);
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + ' minute' + this.pluralCheck(interval);
        }
        return Math.floor(seconds) + ' second' + this.pluralCheck(seconds);
    }

    /**
     * Checks for plural
     */
    pluralCheck(interval) {
        if (interval === 1) {
            return ' ago';
        } else {
            return 's ago';
        }
    }

    render() {
        return (
            <div className="page-content-wrapper">
                <div className="page-content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="profile-content">
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="card">
                                            <div className="card-head card-topline-lightblue">
                                                <header>User Activity</header>
                                            </div>
                                            <div className="card-body no-padding height-9">
                                                <div className="container-fluid">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="panel">
                                                                <form>
                                                                    <textarea className="form-control p-text-area" rows="4"
                                                                        value={this.state.caption} onChange={this.handleFormChange.bind(this)} name="caption" placeholder="Whats in your mind today?"></textarea>
                                                                </form>
                                                                <footer className="panel-footer" style={{ padding: '1.5%' }}>
                                                                    <button type="button"
                                                                        onClick={this.formSubmit.bind(this)} className="btn btn-post pull-right">Post</button>
                                                                    <ul className="nav nav-pills p-option">
                                                                        <li>
                                                                            <button><i className="fa fa-user"></i></button>
                                                                        </li>
                                                                        <li>
                                                                            <button><i className="fa fa-camera"></i></button>
                                                                        </li>
                                                                        <li>
                                                                            <button><i
                                                                                className="fa  fa-location-arrow"></i></button>
                                                                        </li>
                                                                        <li>
                                                                            <button><i className="fa fa-meh-o"></i></button>
                                                                        </li>
                                                                    </ul>
                                                                </footer>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <ul className="activity-list">
                                                                {this.displayPosts()}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Forum;