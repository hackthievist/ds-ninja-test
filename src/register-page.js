import React, { Component } from "react";
import axios from 'axios';

export default class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            phone: '',
            password: '',
            message: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post('https://delivery-science-hobby-app.herokuapp.com/userCreate', {
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
        }, {
            withCredentials: true,
        })
        .then(response => {
            this.setState({
                message: response.data.statusMessage,
            });
            this.setState({
                username: '',
                email: '',
                phone: '',
                password: '',
            })
        });
    }
   

    render() {
        return (
            <div>
                {/* <form method="post" action="https://delivery-science-hobby-app.herokuapp.com/userCreate" className="login100-form validate-form"> */}
                <form onSubmit={this.handleSubmit} className="login100-form validate-form">
                    <span className="login100-form-title">Member Register</span>

                    <div className="wrap-input100 validate-input" data-validate="Valid username is required">
                        <input className="input100" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Valid email is required">
                        <input className="input100" type="text" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Valid phone number is required">
                        <input className="input100" type="number" name="phone" placeholder="Phone (Start with 234)" value={this.state.phone} onChange={this.handleChange} />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                        <input className="input100" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div className="container-login100-form-btn">
                        <button type="submit" className="login100-form-btn">
                            Register
                        </button>
                        <br />
                        <br />
                        <p>{this.state.message}</p>
                    </div>
                    <br />


                    <div className="text-center p-t-136">
                        <a className="txt2" href="/login">
                            Login to your Account
                            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                        </a>
                    </div>
                </form>
            </div>
        )
    }
}