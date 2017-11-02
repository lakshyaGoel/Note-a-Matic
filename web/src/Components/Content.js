import React, { Component } from 'react';
import './Style.css';

import Pin from './Pin';
import Card from "./Card";
import Modal from "./Modal";

class Content extends Component {
  render() {
    return (
        <div>{/*
            <Pin />
            */}
            <Modal active={false}/>
            {/*
             active version is here
             <Modal active={true}/>
             */}
            <div className="columns is-multiline">
                <Card cardTitle="title" />

            </div>
        </div>
    );
  }
}

export default Content;
