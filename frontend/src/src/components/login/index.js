import React from 'react';

// Font awesome
import { faSignInAlt, faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './login.css';

class Login extends React.Component {

    state = {
        username: "",
        password: ""
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

    render() {
        return (
            <div className="login-menu">
                <div className="login-container">

                    <p className="login-label"> Login: </p>

                    <form action="" onSubmit={e => this.handleSubmit(e)}>
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

                        <div className="login-button-wrapper">
                            <button className="login-button" type="submit">
                                <FontAwesomeIcon icon={faSignInAlt} />
                                <p className="login-button-label"> Login </p>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default Login;
