import React from 'react';

import Navbar from "./navbar"
import PostsList from "./posts_list"
import ButtonsList from "./buttons_container"

import MarkdownEditor from "./markdown_editor"

import "./dashboard.css"

class Dashboard extends React.Component {
    _isMounted = false;

    state = {
        editorActive: false,
        editorValue: "",
        editorFunction: undefined,
        posts: []
    }

    componentDidMount() {
        this._isMounted = true;

        this.getPosts()
            .then((res) => {
                let markdownContent = [];

                res.array.forEach(e => {
                    markdownContent.push(e);
                });

                if (this._isMounted) {
                    this.setState({posts: markdownContent});
                }
            })
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
		this._isMounted = false;
	}

    addPost(markdown) {
        const token = localStorage.getItem('access_token');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
			},
            body: JSON.stringify({markdown: markdown})
        };

        fetch('/add_post', requestOptions)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(res.status.toString())
            }

            return res.json()
        })
        .then(content => {
            let newPostList = this.state.posts

            newPostList.unshift([content.post_id, markdown])

            if (this._isMounted) {
                this.setState({posts: newPostList});
            }

            console.log("Added post");
        })
        .catch(function(error) {
            console.log(error)
        })

        this.toggleEditor();
    }

	async getPosts() {
        const fetchUrl = "/get_posts/" + localStorage.getItem('username');
		const response = await fetch(fetchUrl);
		const body = await response.json();

		if (response.status !== 200) {
		  throw Error(body.message) 
		}

		return body;
    };
    
    deletePost(id) {
        const token = localStorage.getItem('access_token');

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
			},
            body: JSON.stringify({post_id: id})
        };

        fetch('/delete_post', requestOptions)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(res.status.toString())
            }

            return res.json()
        })
        .then(content => {
            const newPostList = this.state.posts.filter(elem => elem[0] !== id);

            if (this._isMounted) {
                this.setState({posts: newPostList});
            }

            console.log("Deleted post with id " + id);
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    editPost(id, markdown) {
        const token = localStorage.getItem('access_token');

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
			},
            body: JSON.stringify({post_id: id, markdown: markdown})
        };

        fetch('/update_post', requestOptions)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(res.status.toString())
            }

            return res.json()
        })
        .then(content => {
            const newPostList = this.state.posts
            newPostList.forEach(elem => {
                if (elem[0] === id) {
                    elem[1] = markdown
                }
            });

            if (this._isMounted) {
                this.setState({posts: newPostList});
            }

            console.log("Edited post with id " + id);
        })
        .catch(function(error) {
            console.log(error)
        })

        this.toggleEditor();
    }

    onEdit(id, markdown){
        this.setState({
            editorValue: markdown,
            editorFunction: (markdown) => this.editPost(id, markdown)
        })
        this.toggleEditor()
    }

    onAdd() {
        this.setState({
            editorValue: "",
            editorFunction: (markdown) => this.addPost(markdown)
        })
        this.toggleEditor()
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
                                <MarkdownEditor
                                    editorValue={this.state.editorValue}
                                    toggleEditor={() => this.toggleEditor()}
                                    submitEdit={(markdown) => this.state.editorFunction(markdown)}
                                />
                            </div>
                        :
                            <div className="content-wrapper">
                                <ButtonsList onAdd={() => this.onAdd()}/>
                                <PostsList
                                    posts={this.state.posts}
                                    onDelete={(id) => this.deletePost(id)}
                                    onEdit={(id, markdown) => this.onEdit(id, markdown)}
                                />
                            </div>
                    }
                </div>
                
            </div>
        );
    }
}

export default Dashboard;
