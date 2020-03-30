import React from 'react';

import LoginMenu from "./components/login"
import Dashboard from "./components/dashboard"

class App extends React.Component {

    state = {
        isLoggedIn: true
    }

    constructor(props) {
        super(props)
        this.submitLogin = this.submitLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    submitLogin(username, password) {
        this.setState({isLoggedIn: true})
    }

    handleLogout() {
        console.log("Cacat")
        this.setState({isLoggedIn: false})
    }

    render() {
        return (
            <div className="App">

                {this.state.isLoggedIn
                    ? <Dashboard action={this.handleLogout}/>
                    : <LoginMenu action={this.submitLogin}/>
                }

            </div>
        );
    }
}

export default App;
