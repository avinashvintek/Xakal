import React, { Component } from 'react';

class Forum extends Component {
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
                                                                        placeholder="Whats in your mind today?"></textarea>
                                                                </form>
                                                                <footer className="panel-footer" style={{ padding: '1.5%' }}>
                                                                    <button
                                                                        className="btn btn-post pull-right">Post</button>
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
                                                                <li>
                                                                    <div className="avatar">
                                                                        <img src="../assets/img/std/std1.jpg" alt="" />
                                                                    </div>
                                                                    <div className="activity-desk">
                                                                        <h5><button>Rajesh</button> <span>Uploaded 5 new
																				photos</span></h5>
                                                                        <p className="text-muted">7 minutes ago near Alaska,
																			USA</p>
                                                                        <div className="album">
                                                                            <button>
                                                                                <img alt=""
                                                                                    src="../assets/img/mega-img1.jpg" />
                                                                            </button>
                                                                            <button>
                                                                                <img alt=""
                                                                                    src="../assets/img/mega-img2.jpg" />
                                                                            </button>
                                                                            <button>
                                                                                <img alt=""
                                                                                    src="../assets/img/mega-img3.jpg" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="post-box panel">
                                                                        <div className="post-img"><img
                                                                            src="../assets/img/slider/fullimage1.jpg"
                                                                            className="img-responsive" alt="" /></div>
                                                                        <div className="p-l-15 p-b-15">
                                                                            <h4 className="">Lorem Ipsum is simply dummy
																				text of the printing</h4>
                                                                            <p>Lorem Ipsum is simply dummy text of the
                                                                            printing and typesetting industry. Lorem
                                                                            Ipsum has been
                                                                            the industry's standard dummy text ever
																				since the 1500s, </p>
                                                                            <p> <button
                                                                                className="btn btn-raised btn-info btn-sm"><i
                                                                                    className="fa fa-heart-o"
                                                                                    aria-hidden="true"></i>
																					Like (5) </button> <button
                                                                                    className="btn btn-raised bg-soundcloud btn-sm"><i
                                                                                        className="zmdi zmdi-long-arrow-return"></i>
																					Reply</button> </p>
                                                                        </div>
                                                                    </div>

                                                                </li>
                                                                <li>
                                                                    <div className="avatar">
                                                                        <img src="../assets/img/std/std3.jpg" alt="" />
                                                                    </div>
                                                                    <div className="activity-desk">
                                                                        <h5><button>John Doe</button> <span>attended a
																				meeting with</span>
                                                                            <button>Lina Smith.</button></h5>
                                                                        <p className="text-muted">2 days ago near Alaska,
																			USA</p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="avatar">
                                                                        <img src="../assets/img/std/std4.jpg" alt="" />
                                                                    </div>
                                                                    <div className="activity-desk">
                                                                        <h5><button>Kehn Anderson</button>
                                                                            <span>completed the task “wireframe design”
																				within the dead line</span></h5>
                                                                        <p className="text-muted">4 days ago near Alaska,
																			USA</p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="avatar">
                                                                        <img src="../assets/img/std/std5.jpg" alt="" />
                                                                    </div>
                                                                    <div className="activity-desk">
                                                                        <h5><button>Jacob Ryan</button> <span>was absent
																				office due to sickness</span></h5>
                                                                        <p className="text-muted">4 days ago near Alaska,
																			USA</p>
                                                                    </div>
                                                                </li>
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