import React from "react";

import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'

import Buttons from "./buttons"

import 'react-markdown-editor-lite/lib/index.css';
import './markdown_editor.css'

class MarkdownEditor extends React.Component {
    mdEditor = undefined;
    mdParser = undefined;

    constructor(props) {
        super(props);

        this.mdParser = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true
        });
    }

    async finishEditing(editConfirmed) {
        const markdown = this.mdEditor?.getMdValue()
        if (markdown === undefined) {
            console.log("Empty")
            return
        }

        if (editConfirmed) {
            setTimeout(() => this.props.toggleEditor(), 500);
        } else {
            setTimeout(() => this.props.toggleEditor(), 500);
        }
    }

    render() {
        return(
            <div className="markdown-editor">
                <Buttons finish={() => this.finishEditing(true)} cancel={() => this.finishEditing(false)}/>

                <div className="editor-wrapper">
                    <MdEditor
                        ref={node => (this.mdEditor = node || undefined)}
                        value=""
                        renderHTML={(text) => this.mdParser.render(text)}
                    />
                </div>
            </div>
        );
    }
}

export default MarkdownEditor