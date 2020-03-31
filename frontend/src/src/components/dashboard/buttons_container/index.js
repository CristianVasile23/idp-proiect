import React from 'react';

// Font awesome
import { faCog, faList, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./buttons_list.css"

class ButtonsList extends React.Component {
    render() {
        return (
            <div className="buttons-list-wrapper">
                <div className="buttons-list">

                    <div className="button-element">
                        <FontAwesomeIcon icon={faPlus} size="lg"/>
                    </div>

                    <div className="button-element">
                        <FontAwesomeIcon icon={faList} size="lg"/>  
                    </div>

                    <div className="button-element">
                        <FontAwesomeIcon icon={faUser} size="lg"/>
                    </div>

                    <div className="button-element">
                        <FontAwesomeIcon icon={faCog} size="lg"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ButtonsList;
