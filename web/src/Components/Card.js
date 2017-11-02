import React, { Component } from 'react';


class CardHeadImage extends Component {
    render(){
        return (
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={this.props.imgURL} alt="Placeholder image"/>
                </figure>
            </div>
        );
    }
}

class CardHeader extends Component {
    render(){
        return (
            <header className="card-header">
                <p className="card-header-title">
                    {this.props.title}
                </p>
            </header>
        );
    }
}

class CardContent extends Component {
    render(){
        return (
            <div className="card-content">
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class CardFooter extends Component{
    render(){
        return (
            <footer className="card-footer">
                {/* basic item goes here
                    temporary, I add save edit delete button same as example
                    https://bulma.io/documentation/components/card/
                */}
                <a className="card-footer-item">Save</a>
                <a className="card-footer-item">Edit</a>
                <a className="card-footer-item">Delete</a>
            </footer>
        );
    }
}

class CardContainer extends Component {
    render(){
        return (
            <div className="column is-one-quarter">
                <div className="card">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class Card extends Component{
    constructor(props){
       super(props);

    }
    render(){
        return (
            <CardContainer>
                <CardHeader title={this.props.cardTitle}/>
                <CardContent>
                    This is inside card. main content.
                </CardContent>
                <CardFooter />
            </CardContainer>
        );
    }
}

export default Card;
