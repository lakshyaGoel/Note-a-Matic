import React, { Component } from 'react';

class ModalContainer extends Component {
    constructor(props){
        super(props);
        this.state = {};

        this.state.active = this.props.active;
        this.hideModal = this.hideModal.bind(this);
    }

    hideModal(){
        this.setState({"active": false});
    }

    render(){
        return (
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
        this.state = {};
        this.state.active = props.active;
        if(typeof this.state.active === "undefined"){
            this.state.active = false;
        }
    }
    render(){
        return (
            <ModalContainer active={this.state.active}>
                <ModalCardBody>
                    This is the main part of the modal
                </ModalCardBody>
                <ModalCardFooter/>
            </ModalContainer>
        );
    }
}

export default Modal;