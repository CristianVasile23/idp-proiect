import React from 'react';

// Font awesome
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class EditorButtons extends React.Component {
    render() {
        return (
            <div className="buttons-list-wrapper">
                <div className="buttons-list">
                    <div className="button-element" onClick={this.props.finish}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </div>

                    <div className="button-element" onClick={this.props.cancel}>
                        <FontAwesomeIcon icon={faBan}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditorButtons;
