import React, { Component } from 'react';
import '../../styles/table.css';
import '../../minified-css/material-min.css';
import '../../styles/dropdowns.css';
import '../../styles/theme-style.css';
import axios from 'axios';
import * as moment from 'moment'
class SalaryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column1: '',
            column2: '',
            column3: '',
            searchAllowed: false,
            salaryDetails: [],
            isFocussed: '',
            onFocus: false,
            onYearFocus: false,
            isYearFocussed: '',
            selectedMonth: '',
            selectedYear: '',
            background: '',
            yearBackground: '',
            userID: ''
        };
        this.baseState = this.state;

    }

    componentDidMount() {
        if (this.props && this.props.location && this.props.location.userID) {
            const userID = this.props.location.userID;
            this.setState({ userID: userID.userID });
        }
        this.unlisten = this.props.history.listen((location, action) => {
            this.setState(this.baseState);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    /**
     * Adds the hover class when date is hovered
     */
    statusHover(event) {
        var element = event.target.className;
        if (element === 'column100 column3 ') {
            this.setState({ column2: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when description is hovered
     */
    creditedstatusHover(event) {
        var element = event.target.className;
        if (element === 'column100 column2 ') {
            this.setState({ column1: 'hov-column-head-ver5' })
        }
    }

    /**
     * Adds the hover class when receipt is hovered
     */
    receiptHover(event) {
        var element = event.target.className;
        if (element === 'column100 column4 ') {
            this.setState({ column3: 'hov-column-head-ver5' })
        }
    }

    /**
     * Resets the state variables when hover is removed
     */
    hoverOff() {
        this.setState({
            column1: '',
            column2: '',
            column3: '',
        })
    }


    /**
     * Sets the month selected
     */
    onMonthSelect(event) {
        this.setState({ selectedMonth: event.target.id, onFocus: false, background: 'is-hidden' });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    onMonthFocus() {
        this.setState({ isFocussed: 'is-focused', onFocus: true, onYearFocus: false, background: 'is-shown' });
    }

    /**
     * Sets the year selected
     */
    onYearSelect(event) {
        this.setState({ selectedYear: event.target.id, onYearFocus: false, yearBackground: 'is-hidden' });
        if (this.state.searchAllowed) {
            this.setState({ searchAllowed: false })
        }
    }

    onYearFocus() {
        this.setState({ isYearFocussed: 'is-focused', onFocus: false, onYearFocus: true, yearBackground: 'is-shown' });
    }

    /**
     * Allows the grid to display the values
     */
    getResult() {
        if (this.state.selectedMonth !== '' && this.state.selectedYear !== '') {
            this.fetchSalaryDetails();
        } else {
            alert('Please select the values');
            this.setState({ searchAllowed: false })
        }

    }


    /**
     * Fetches the details of Payment based on semester selected
     */
    fetchSalaryDetails() {
        this.setState({ searchAllowed: true });
        var params = { salaryMonth: this.state.selectedMonth, salaryYear: this.state.selectedYear, userID: this.state.userID.toUpperCase() };
        axios.get(`/xakal/salary/salarydetail`, { params: params })
            .then((response) => {
                this.setState({ salaryDetails: response.data });
            });
    }

    /**
     * Fetches all the month name
     */
    getMonths() {
        return moment.months().map((name, index) => {
            return (
                <li id={name} key={index++} className="mdl-menu__item animation" onClick={this.onMonthSelect.bind(this)} >{name}</li>
            )
        })
    }

    /**
     * Gets the previous 10 years
     */
    getYear() {
        const year = (new Date()).getFullYear();
        const years = Array.from(new Array(10), (val, index) => -(index - year));
        return years.map((year, index) => {
            return (
                <li id={year} key={index++} className="mdl-menu__item animation" onClick={this.onYearSelect.bind(this)} >{year}</li>
            )
        })
    }

    /**
     * Displays the list of payment details based on the API response
     */
    displayTable() {
        return this.state.salaryDetails.map((singleData, index) => {
            var hrefValue = `../../../` + singleData.userID + '/' + singleData.salaryYear + '/' + singleData.salaryMonth + '/' + singleData.salaryReceipt;
            return (
                <tr className="row100">
                    <td className="column100 column1" data-column="column1">{++index}</td>
                    <td className={"column100 column2 "} onMouseEnter={this.creditedstatusHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{moment(new Date(singleData.creditedDate)).format('DD/MM/YYYY')}</td>
                    <td className={"column100 column3 "} onMouseEnter={this.statusHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>{singleData.salaryStatus}</td>
                    <td className={"column100 column4 "} onMouseEnter={this.receiptHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}><a rel="noopener noreferrer" target="_blank" href={hrefValue}>Download File</a></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-t-20 m-l-20">Salary Details</h1>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card-box">
                            <div className="card-body row">
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isFocussed}>
                                        <input onKeyPress={(e) => e.preventDefault()} autoComplete="off" onFocus={this.onMonthFocus.bind(this)} className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.selectedMonth} />
                                        <label className={"mdl-textfield__label " + this.state.background}>Month</label>
                                        {this.state.onFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                            <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                    {this.getMonths()}
                                                </ul>
                                            </div>
                                        </div> : <p></p>}
                                    </div>
                                </div>
                                <div className="col-lg-4 p-t-20">
                                    <div
                                        className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height select-width " + this.state.isYearFocussed}>
                                        <input onKeyPress={(e) => e.preventDefault()} onFocus={this.onYearFocus.bind(this)} autoComplete="off" className="mdl-textfield__input display-border" type="text" id="sample2"
                                            value={this.state.selectedYear} />
                                        <label className={"mdl-textfield__label " + this.state.yearBackground}>Year</label>
                                        {this.state.onYearFocus ? <div className="mdl-menu__container is-upgraded dropdown-list is-visible">
                                            <div className="mdl-menu__outline mdl-menu--bottom-left dropdown-div">
                                                <ul className="scrollable-menu mdl-menu mdl-menu--bottom-left mdl-js-menu ul-list">
                                                    {this.getYear()}
                                                </ul>
                                            </div>
                                        </div> : <p></p>}
                                    </div>

                                </div>
                                <div className="col-sm-4 p-t-20">
                                    <button type="button" onClick={this.getResult.bind(this)} className="btn btn-primary m-t-15 m-l-30">Get Results!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.searchAllowed ? <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100 ver5 m-b-110 table table-responsive">
                                <table>
                                    <thead>
                                        <tr className="row100 head">
                                            <th className="column100 column1" data-column="column1"></th>
                                            <th className={"column100 column2 " + this.state.column1} onMouseEnter={this.creditedstatusHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Credited Date</th>
                                            <th className={"column100 column3 " + this.state.column2} onMouseEnter={this.statusHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Salary Status</th>
                                            <th className={"column100 column4 " + this.state.column3} onMouseEnter={this.receiptHover.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>Receipts / Acknowledgement</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.displayTable()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> : <span></span>}
            </div>
        )
    }
}

export default SalaryDetails;