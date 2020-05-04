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
            this.setState({checkedLoginStatus: true})
            return
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
                    console.log(content.logged_in_as)
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
                    localStorage.setItem('username', username);
                    this.setState({isLoggedIn: true});
                }
            })
    }

    handleLogout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
        this.setState({isLoggedIn: false})
    }

    submitRegistration(username, email, password) {
        // console.log("Registration submitted " + username + " " + email + " " + password)
        const reqOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, email: email, password: password})
        }

        fetch("/add_user", reqOptions)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(res.status.toString())
            }

            return res.json()
        })
        .then(content => {
            return true
        })
        .catch(function(error) {
            console.log(error)
            return false
        })
    }


    render() {
        return (
            <div className="App">
                <div>
                    {this.state.isLoggedIn
                        ?
                            <Dashboard action={this.handleLogout}/>
                        :
                            <LoginMenu
                                action={this.submitLogin}
                                submitRegistration={(username, email, password) => this.submitRegistration(username, email, password)}
                            />
                    }
                </div>
            </div>
        );
    }
}

export default App;
