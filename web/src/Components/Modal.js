import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {getAuthorizationHeader, isSet} from "../functions";

class ModalContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: isSet(this.props.active, false)
        };

        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    hideModal(){
        this.setState({"active": false});
    }

    showModal(){
        this.setState({"active": true});
    }

    render(){
        var result;
        if(this.state.active){
            result = (
                <div className="">
                    <a onClick={this.showModal} className="card-footer-item">{this.props.buttonLabel}</a>
                    <div className={this.state.active? "modal is-active": "modal"}>
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">{this.props.title}</p>
                                <button className="delete" aria-label="close" onClick={this.hideModal}>
                                </button>
                            </header>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            )
        }else{
            result = (
                    <a onClick={this.showModal} className="card-footer-item">{this.props.buttonLabel}</a>
            )
        }
        return result;
    }
}


class ModalCardBody extends Component {
    render(){
        return (
            <section className="modal-card-body">
                {this.props.children}
            </section>
        )
    }
}

class ModalCardFooter extends Component {
    constructor(props){
        super(props);
        console.log("ModalCardFooter ",this.props.deleteFlg);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(){
        let request = new Request('/api/db/delete', {
            method: 'POST',
            headers: {
                "Authorization": getAuthorizationHeader().Authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId: this.props.userId, noteId: this.props.noteId})
        });
        console.log("send data:",{userId: this.props.userId, noteId: this.props.noteId});
        console.log(request);
        // TODO: write re-rendering with setState and binding.
        fetch(request)
        .then(response => {
            if(!response.ok) {
                console.log("Error: could not conect server, in Modal.js");
                return false;
            }
            return response.json();
        }).then(res => {
            if(res){
                console.log("like detect",res);
            }
        });
    }
    render(){
        return (
            <footer className="modal-card-foot">
                 {/*
                 //TODO : need a proper parameter to separate page.
                 see:https://github.com/ReactTraining/react-router/blob/v3/docs/guides/RouteConfiguration.md#adding-an-index
                 */}
                <Link to="new" className="button is-success">Edit</Link>
                {this.props.deleteFlg? <button className="button is-danger" onClick={this.deleteItem}>Delete</button>: ""}
            </footer>
        )
    }
}

class Modal extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: isSet(props.active, false)
        };
        if(typeof this.state.active === "undefined"){
            this.setState(state=>({active: false}));
        }

    }

    render(){
        return (
            <ModalContainer active={this.state.active} buttonLabel={this.props.buttonLabel} title={this.props.title} >
                <ModalCardBody>
                    {this.props.content}
                </ModalCardBody>
                <ModalCardFooter deleteFlg={this.props.deleteFlg} userId={this.props.userId} noteId={this.props.noteId}/>
            </ModalContainer>
        );
    }
}

export default Modal;