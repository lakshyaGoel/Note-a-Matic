import React, { Component } from 'react';
import './Style.css';

import Pin from './Pin';
import Card from "./Card";

class Content extends Component {
  render() {
    return (
        <div>
            <Pin />
            <div className="columns is-multiline">
                <Card cardTitle="title" />
                Temporary Commit!
            </div>
        </div>
    );
  }
}

export default Content;
