import React from 'react';

import LoginMenu from "./components/login"
import Dashboard from "./components/dashboard"

class App extends React.Component {

    state = {
        checkedLoginStatus: false,
        isLoggedIn: false
    }

    constructor(props) {
        super(props)
        this.submitLogin = this.submitLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.verifyLogin = this.verifyLogin.bind(this)
    }

    componentDidMount() {
        this.verifyLogin()
    }

    verifyLogin() {
        const token = localStorage.getItem('access_token');

        if (!token) {
            return
        } else {
            console.log(token)
        }

        const reqOptions = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }

        fetch("/verify_login", reqOptions)
            .then(res => {
                if (res.status === 200){
                    return res.json()
                } else {
                    return;
                }
            })
            .then(content => {
                if (content) {
                    this.setState({checkedLoginStatus: true, isLoggedIn: true})
                }
            })
    }

    submitLogin(username, password) {
        const reqOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: username, password: password})
        }

        fetch("/login", reqOptions)
            .then(res => {
                if (res.status === 200){
                    return res.json()
                } else {
                    return;
                }
            })
            .then(content => {
                if (content) {
                    localStorage.setItem('access_token', content.access_token);
                    this.setState({isLoggedIn: true})
                }
            })
    }

    handleLogout() {
        localStorage.removeItem('access_token');
        this.setState({isLoggedIn: false})
    }

    render() {
        return (
            <div className="App">
                <div>
                    {this.state.isLoggedIn
                        ? <Dashboard action={this.handleLogout}/>
                        : <LoginMenu action={this.submitLogin}/>
                    }
                </div>
            </div>
        );
    }
}

export default App;
