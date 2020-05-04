import React from 'react';

// Font awesome
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './navbar.css';

class Navbar extends React.Component {

    render() {
        return (
            <div className="navbar">

                <div className="left-nav-buttons">
                    <p className="website-name"> MyWiki </p>
                </div>

                <div className="right-nav-buttons">
                    <div className="logout-button" onClick={this.props.logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <p className="nav-button"> Logout </p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Navbar;
