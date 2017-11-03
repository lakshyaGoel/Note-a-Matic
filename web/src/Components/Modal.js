import React, { Component } from 'react';

import { isSet } from "../functions";

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
        return (
            <div className="">
                <a onClick={this.showModal} className="button">{this.props.buttonLabel}</a>
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
    render(){
        return (
            <footer className="modal-card-foot">
                {/*temporary same as example,
                 https://bulma.io/documentation/components/modal/
                 */}
                <button className="button is-success">Save changes</button>
                <button className="button">Cancel</button>
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
            <ModalContainer active={this.state.active} buttonLabel={this.props.buttonLabel} title={this.props.title}>
                <ModalCardBody>
                    {this.props.content}
                </ModalCardBody>
                <ModalCardFooter/>
            </ModalContainer>
        );
    }
}

export default Modal;