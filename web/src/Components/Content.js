import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Style.css';

import AllNote from '../AllNote/index.js';

class Content extends Component {
    render(){
        return (
            <div>
                <div className="tabs">
                    <ul>
                        <li  className="is-active"><Link to="/all-note">All Notes</Link></li>
                        <li><Link to="/my-note">My Notes</Link></li>
                        <li><Link to="/share-note">Share Notes</Link></li>
                    </ul>
                </div>
                    <AllNote/>
            </div>
        );
    }
}

export default Content;
