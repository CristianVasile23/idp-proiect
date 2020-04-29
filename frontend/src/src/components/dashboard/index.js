import React from 'react';

import Navbar from "./navbar"
import PostsList from "./posts_list"
import ButtonsList from "./buttons_container"

import MarkdownEditor from "./markdown_editor"

import "./dashboard.css"

class Dashboard extends React.Component {

    state = {
        editorActive: false,
        posts: []
    }

    toggleEditor() {
        this.setState({editorActive: !this.state.editorActive})
    }

    render() {
        return (
            <div className="dashboard">
                <Navbar logout={this.props.action}/>

                <div className="dashboard-content">
                    {this.state.editorActive
                        ?
                            <div className="content-wrapper">
                                <MarkdownEditor toggleEditor={() => this.toggleEditor()}/>
                            </div>
                        :
                            <div className="content-wrapper">
                                <ButtonsList onAdd={() => this.toggleEditor()}/>
                                <PostsList/>
                            </div>
                    }
                </div>


            </div>
        );
    }
}

export default Dashboard;
