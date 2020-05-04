import React from 'react';

// Font awesome
import { faSignInAlt, faUser, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './login.css';
import './registration.css'

class Login extends React.Component {
    state = {
        username: "",
        password: "",

        showRegistration: false,

        regUsername: "",
        regEmail: "",
        regPassword: "",
        regConfPassword: "",
    }

    handleRegChange(event, type) {
        let target = event.target;

        switch(type) {
            case 0:
                this.setState({regUsername: target.value});
                break;
            case 1:
                this.setState({regEmail: target.value});
                break;
            case 2:
                this.setState({regPassword: target.value});
                break;
            case 3:
                this.setState({regConfPassword: target.value});
                break;
            default:
                break;
        }
    }

    handleChange(event, usernameChange) {
        let target = event.target;

        if (usernameChange) {
            this.setState({username: target.value});
        } else {
            this.setState({password: target.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.action(this.state.username, this.state.password)
    }

    confirmRegistration(event) {
        event.preventDefault();
        this.props.submitRegistration(this.state.regUsername, this.state.regEmail, this.state.regPassword);
        this.toggleRegistration();
    }

    toggleRegistration() {
        this.setState({showRegistration: !this.state.showRegistration})
    }

    render() {
        return (
            <div className="login-menu">
                {this.state.showRegistration
                    ?
                        <div className="registration-container">
                            <p className="registration-label"> Registration: </p>
                            <form action="" onSubmit={(e) => this.confirmRegistration(e)}>

                                {/* Username */}
                                <div className="login-input-container">
                                    <FontAwesomeIcon className="login-input-icon" icon={faUser} />
                                    <input
                                        type="text"
                                        name="username_input"
                                        required
                                        className="input-box"
                                        value={this.state.regUsername}
                                        placeholder="Username"
                                        onChange={(event) => this.handleRegChange(event, 0)}
                                    />
                                </div>

                                {/* Email */}
                                <div className="login-input-container">
                                    <FontAwesomeIcon className="login-input-icon" icon={faEnvelope} />
                                    <input
                                        type="email"
                                        name="email_input"
                                        required
                                        className="input-box"
                                        value={this.state.regEmail}
                                        placeholder="E-Mail"
                                        onChange={(event) => this.handleRegChange(event, 1)}
                                    />
                                </div>

                                {/* Password */}
                                <div className="login-input-container">
                                    <FontAwesomeIcon className="login-input-icon" icon={faKey} />
                                    <input
                                        type="password"
                                        name="password_input"
                                        required
                                        className="input-box"
                                        value={this.state.regPassword}
                                        placeholder="Password"
                                        onChange={(event) => this.handleRegChange(event, 2)}
                                    />
                                </div>

                                {/* Confirm password */}
                                <div className="login-input-container">
                                    <FontAwesomeIcon className="login-input-icon" icon={faKey} />
                                    <input
                                        type="password"
                                        name="confirm_password_input"
                                        required
                                        className="input-box"
                                        value={this.state.regConfPassword}
                                        placeholder="Confirm password"
                                        onChange={(event) => this.handleRegChange(event, 3)}
                                    />
                                </div>

                                {/* Confirmation button */}
                                <div className="login-button-wrapper">
                                    <button className="login-button" type="submit">
                                        <FontAwesomeIcon icon={faSignInAlt} />
                                        <p className="login-button-label"> Register </p>
                                    </button>
                                </div>
                            </form>
                        </div>
                    :
                        <div className="login-container">
                            <p className="login-label"> Login: </p>
                            <form action="" onSubmit={(e) => this.handleSubmit(e)}>
                                <div className="login-input-container">
                                    <FontAwesomeIcon className="login-input-icon" icon={faUser} />
                                    <input
                                        type="text"
                                        name="username_input"
                                        required
                                        className="input-box"
                                        value={this.state.username}
                                        placeholder="Username"
                                        onChange={(event) => this.handleChange(event, true)}
                                    />
                                </div>

                                <div className="login-input-container">
                                    <FontAwesomeIcon className="login-input-icon" icon={faKey} />
                                    <input
                                        type="password"
                                        name="password_input"
                                        required
                                        className="input-box"
                                        value={this.state.password}
                                        placeholder="Password"
                                        onChange={(event) => this.handleChange(event, false)}
                                    />
                                </div>

                                <p className="registration-text">
                                    Don't have an account? Click
                                    <span
                                        className="registration-button"
                                        onClick={() => this.toggleRegistration()}
                                    >
                                        here
                                    </span>
                                </p>

                                <div className="login-button-wrapper">
                                    <button className="login-button" type="submit">
                                        <FontAwesomeIcon icon={faSignInAlt} />
                                        <p className="login-button-label"> Login </p>
                                    </button>
                                </div>
                            </form>
                        </div>
                }
            </div>
        );
    }
}

export default Login;
