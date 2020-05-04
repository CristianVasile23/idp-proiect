import React from 'react';

// Font awesome
import { faCog, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ButtonsList extends React.Component {
    render() {
        return (
            <div className="buttons-list-wrapper">
                <div className="buttons-list">
                    <div className="button-element" onClick={this.props.onAdd}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </div>

                    <div className="button-element">
                        <FontAwesomeIcon icon={faUser}/>
                    </div>

                    <div className="button-element">
                        <FontAwesomeIcon icon={faCog}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ButtonsList;
