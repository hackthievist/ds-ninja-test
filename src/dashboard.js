import React, { Component } from "react";
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import SecureLS from 'secure-ls';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            email: "",
            owner: "",
            message: "",
            phone: "",
            hobbies: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        this.setState({
            message: 'Hold on a second...',
        });
        axios.get(`https://delivery-science-hobby-app.herokuapp.com/hobby?owner=${this.state.owner}`)
            .then(response => {
                this.state.hobbies = [];
                for (var i = 0; i < response.data.length; i++) {
                    this.state.hobbies.push(response.data[i].title);
                    this.state.hobbies.push(<br />);
                }
            });

        axios.post('https://delivery-science-hobby-app.herokuapp.com/dashboard', {
            title: this.state.title,
            owner: this.state.owner
        }, {
                withCredentials: true
            })
            .then(response => {
                this.setState({ message: response.data.message });
                if (response.data.message === `New Hobby Added - ${this.state.title}`) {
                    this.state.hobbies.push(this.state.title);
                }
                this.setState({
                    title: '',
                });
            })
            .catch(error => {
                console.log(error);
            });
        e.preventDefault();
    }

    logout(e) {
        e.preventDefault();
        axios.get('https://delivery-science-hobby-app.herokuapp.com/logout')
            .then(response => {
                if (response.data.isAuthenticated === false) {
                    this.props.history.push('login');
                }
            });
    }

    componentDidMount() {
        axios.get(`https://delivery-science-hobby-app.herokuapp.com/hobby?owner=${this.state.owner}`)
            .then(response => {
                this.state.hobbies = [];
                for (var i = 0; i < response.data.length; i++) {
                    this.state.hobbies.push(response.data[i].title);
                    this.state.hobbies.push(<br />);
                }
            });
    }


    render() {
        //var message = decodeURIComponent(window.location.search.slice(1));
        var hobbies = this.state.hobbies;
        var message = this.state.message;
        var ls = new SecureLS();
        var username = ls.get('username'); // print data
        if (username.length === 0) return <Redirect to='/login' />
        axios.get(`https://delivery-science-hobby-app.herokuapp.com/user?username=${username}`)
            .then(res => {
                if (res.data.length === 0) return <Redirect to="/login" />
                //ls.set('id', res.data[0].id);
                this.setState({ owner: res.data[0].id });
            });
        return (
            <div className="container">

                <title>Dashboard - Hobby Lobby</title>
                <br />
                <br />
                <div className="page-header">
                    <h1>Hobby Lobby</h1>
                </div>

                <br />
                <div className="container row">
                    <h1>Hi, Welcome to your Dashboard</h1>
                </div>

                <nav className="navbar">
                    <div className="container wide">


                        <ul className="nav navbar-left">
                            <li>
                                <a href="/dashboard">Home</a>
                            </li>
                        </ul>

                        <ul className="nav navbar-right">
                            <li>
                                <a>{username}</a>
                            </li>

                            <li></li>

                            <li>
                                <Link to="" onClick={this.logout}>Log Out</Link>
                            </li>
                        </ul>
                    </div>

                </nav>

                <hr />

                <form id="hobbyForm" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <p>
                            <input id="hobbyText" className="form-control" type="text" name="title" placeholder="Enter Hobby" value={this.state.title} onChange={this.handleChange} required />
                            <input type="hidden" name="owner" onChange={this.handleChange} />
                        </p>
                        <br />
                        <button className="btn btn-primary" type="submit">
                            <span className="glyphicon glyphicon-plus-sign"></span>
                            Add Hobby
                            </button>
                    </div>

                </form>
                <div>
                    <h3>{message}</h3>
                </div>

                <br /><br />

                <div>
                    <h3>List of Hobbies</h3>
                    <ul>
                        {hobbies}
                    </ul>
                </div>
            </div>
        );
    }
}