import React from 'react';

import "./posts_list.css"

class PostsList extends React.Component {
    render() {
        return (
            <div className="posts-list">

                <p className="post-list-title"> My Posts </p>

                <p className="no-posts-placeholder"> No posts found. Try adding some! </p>
                
            </div>
        );
    }
}

export default PostsList;
