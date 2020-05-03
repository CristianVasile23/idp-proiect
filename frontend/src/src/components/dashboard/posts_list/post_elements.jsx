import React from "react";
import MarkdownIt from 'markdown-it'

import "./post_elements.css"

class PostElements extends React.Component {

    mdParser = new MarkdownIt();

    render() {
        const postList = this.props.posts;

        if (postList) {

            const items = postList.map((element, index) => {

                let result = this.mdParser.render(element[1]);

                return (
                    <div key={index}>
                        <div
                            className="post-element-wrapper"
                            dangerouslySetInnerHTML={{__html: result}}
                        />

                        <div onClick={() => this.props.onDelete(element[0])}>
                            DELETE
                        </div>

                        <div onClick={() => this.props.onEdit(element[0], element[1])}>
                            EDIT
                        </div>
                    </div>
                );
            });

            return(
                items
            );

        } else {
            return null;
        }
    };

}

export default PostElements