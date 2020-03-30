import React from 'react';

import Navbar from "./navbar"
import PostsList from "./posts_list"

import "./dashboard.css"

class Dashboard extends React.Component {

    state = {
        posts: []
    }

    render() {
        return (
            <div className="dashboard">

                <Navbar logout={this.props.action}/>

                <PostsList/>

            </div>
        );
    }
}

export default Dashboard;
