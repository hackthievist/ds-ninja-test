import React, { Component } from "react";
import SecureLS from 'secure-ls';
import axios from "axios";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            isAuthenticated: "",
            message: "",
            status: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        this.setState({
            status: 'Hold on a second...',
            message: '',
        });
        axios.post('https://delivery-science-hobby-app.herokuapp.com/login', {
            username: this.state.username,
            password: this.state.password,
        }, {
                withCredentials: true
            })
            .then(response => {
                if (response.data.isAuthenticated === true) {
                    this.props.history.push('dashboard');
                    if (!window.location.hash) {
                        window.location = window.location + '#loaded';
                        window.location.reload(true);
                    }
                } else {
                    this.props.history.push('login');
                    this.setState({
                        status: '',
                        message: 'Wrong Credentials',
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });
        e.preventDefault();
    }

    render() {
        localStorage.clear();
        var ls = new SecureLS();
        ls.set('username', this.state.username);

        return (
            // <form method="post" action="https://delivery-science-hobby-app.herokuapp.com/login" className="login100-form validate-form">
            <form onSubmit={this.handleSubmit} className="login100-form validate-form">
                <span className="login100-form-title">Member Login</span>

                <div className="wrap-input100 validate-input" data-validate="Valid username is required">
                    <input className="input100" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <input className="input100" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                </div>

                <div className="container-login100-form-btn">
                    <button className="login100-form-btn">
                        Login
                </button>
                <br />
                <br />
                <p>{this.state.status}</p>
                <p>{this.state.message}</p>
                </div>
                
                <br />


                <div className="text-center p-t-136">
                    <a className="txt2" href="/register">
                        Create your Account
                            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                    </a>
                </div>
            </form>
        )
    }
}