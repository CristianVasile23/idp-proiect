import React from 'react';
import PostElements from './post_elements'

import "./posts_list.css"

class PostsList extends React.Component {
    render() {

        console.log(this.props.posts)

        return (
            <div className="posts-list">

                <p className="post-list-title"> My Posts </p>

                {this.props.posts.length === 0
                    ?
                        <p className="no-posts-placeholder"> No posts found. Try adding some! </p>
                    :
                        <div className="post-elements-container">
                            <PostElements
                                posts={this.props.posts}
                                onDelete={this.props.onDelete}
                                onEdit={this.props.onEdit}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default PostsList;
