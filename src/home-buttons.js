import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class HomeButtons extends Component {
    render() {
        return (
            <div>
                <form className="login100-form validate-form">
                    <span className="login100-form-title">Hobby Lobby</span>
                    <div className="container-login100-form-btn">
                        <Link className="login100-form-btn" to="login">Login</Link>
                    </div>

                    <div className="container-login100-form-btn">
                        <Link className="login100-form-btn" to="/register">Register</Link>
                    </div>
                </form>
            </div>
        )
    }
}