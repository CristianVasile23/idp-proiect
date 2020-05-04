import React from "react";
import MarkdownIt from 'markdown-it'

import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./post_elements.css"

class PostElements extends React.Component {

    mdParser = new MarkdownIt({
        linkify: true,
    });

    render() {
        const postList = this.props.posts;

        if (postList) {

            const items = postList.map((element, index) => {

                let result = this.mdParser.render(element[1]);

                return (
                    <div className="post-element-main-wrapper" key={index}>
                        <div className="post-element-wrapper">

                            <div className="post-element-buttons">
                                <div
                                    className="post-element-button"
                                    onClick={() => this.props.onEdit(element[0], element[1])}
                                >
                                    <FontAwesomeIcon icon={faPen} />
                                </div>

                                <div
                                    className="post-element-button"
                                    onClick={() => this.props.onDelete(element[0])}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </div>

                            <div
                                className="post-element"
                                dangerouslySetInnerHTML={{__html: result}}
                            />
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