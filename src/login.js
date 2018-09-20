import React, { Component } from "react";
import mainIcon from './img-01.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            statusMessage: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        // if (typeof statusMessage !== 'undefined') {
        //     this.state.statusMessage = statusMessage;
        // }
        console.log(this.state.username);
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src={mainIcon} alt="IMG" />
                        </div>

                        <form method="post" action="" className="login100-form validate-form">
                            <span className="login100-form-title">Member Login</span>

                            <div className="wrap-input100 validate-input" data-validate="Valid username is required">
                                <input className="input100" type="text" name="username" placeholder="Username" onChange={this.handleChange(event)} />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" type="password" name="password" placeholder="Password" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Login
                </button>
                            </div>
                            <br />

                            <div className="text-center">
                                <p><b>{this.state.statusMessage}</b></p>
                            </div>


                            <div className="text-center p-t-136">
                                <a className="txt2" href="/register">
                                    Create your Account
                            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                <script>
                    if(performance.navigation.type == 1) {
                        this.state.statusMessage = ''
                    }
                </script>
            </div>
        );
    }
}