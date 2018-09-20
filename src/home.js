import React, { Component } from "react";
import mainIcon from './img-01.png';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from 'react-router';
import Login from './login-page';
import Register from './register-page';
import Buttons from './home-buttons';
import Dashboard from './dashboard';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            statusMessage: ""
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/dashboard" component={Dashboard} />
                        <div className="limiter">
                            <div className="container-login100">
                                <div className="wrap-login100">
                                    <div className="login100-pic js-tilt" data-tilt>
                                        <img src={mainIcon} alt="IMG" />
                                    </div>
                                    <Router>
                                        <div>
                                            <Switch>
                                                <Route exact path="/" component={Buttons} />
                                                <Route exact path="/login" component={Login} />
                                                <Route exact path="/register" component={Register} />
                                            </Switch>
                                        </div>
                                    </Router>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </Switch>
                </Router>
            </div>


        );
    }
}