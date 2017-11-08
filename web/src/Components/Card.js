import React, { Component } from 'react';
import textImg from "./text.png";
import codeImg from "./code.jpg";

import {isSet} from "../functions";

class CardHeadImage extends Component {
    constructor(props){
        super(props);
        let bgImage = Math.round(Math.random()*10)%2;
        let imgUrl = "https://bulma.io/images/placeholders/1280x960.png";
        if(bgImage === 0){// FIXME: temporary: pure text image
            imgUrl = textImg;
        }else{// FIXME: temporary: pure text image
            imgUrl = codeImg;
        }
        this.state = {
            imgURL: isSet(props.imgURL, imgUrl)
        };
    }

    render(){
        return (
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={this.state.imgURL} alt="Placeholder" />
                </figure>
                {this.props.children}
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

// class CardFooter extends Component {
//     constructor(props){
//         super(props);
//         this.state = {friendCount: isSet(this.props.friendCount, 0)};
//
//         this.incrementFriendCount = this.incrementFriendCount.bind(this);
//     }
//
//     incrementFriendCount(){
//         this.setState({"friendCount": this.state.friendCount + 1});
//     }
//     render(){
//         return (
//             <footer className="card-footer">
//                 {/* basic item goes here
//                  temporary, I add save edit delete button same as example
//                  https://bulma.io/documentation/components/card/
//                  */}
//                 <a className="card-footer-item" onClick={this.incrementFriendCount}>Add Friends: {this.state.friendCount}</a>
//             </footer>
//         );
//     }
// }

class CardContainer extends Component {
    render(){
        return (
            <div className="column is-one-third">
                <div className="card">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class CardButtons extends Component {
    constructor(props){
        super(props);
        this.state = {
            likeCount: isSet(props.likeCount, 0),
            dislikeCount: isSet(props.dislikeCount, 0)
        };


        this.incrementLike = this.incrementLike.bind(this);
        this.incrementDislike = this.incrementDislike.bind(this);
    }

    incrementLike(){
        this.setState({"likeCount": this.state.likeCount + 1});
    }

    incrementDislike(){
        this.setState({"dislikeCount": this.state.dislikeCount + 1});
    }



    render(){
        return (
            <nav className="level is-mobile">
                <div className="level-left">
                    <a className="level-item" onClick={this.incrementLike}>
                        <span className="icon is-small"><i className="fa fa-heart"> </i>{this.state.likeCount}</span>
                    </a>
                    <a className="level-item" onClick={this.incrementDislike}>
                        <span className="icon is-small"><i className="fa fa-thumbs-o-down"> </i>{this.state.dislikeCount}</span>
                    </a>
                </div>
            </nav>
        )
    }
}

class TagField extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div className="field is-grouped is-grouped-multiline">
                {this.props.children}
            </div>
        )
    }
}

class Tag extends Component{
    constructor(props){
        super(props);
        this.state = {
            is_render: isSet(props.is_render, true)
        };

        this.deleteContent = this.deleteContent.bind(this);
    }


    deleteContent(){
        this.setState({"is_render": false});
    }

    render(){
        var renderContent = (
            <div className="control">
                <div className="tags has-addons">
                    <a className="tag is-light">{this.props.tagName}</a>
                    <a className="tag is-delete" onClick={this.deleteContent}> </a>
                </div>
            </div>
        );
        if(!this.state.is_render){
            renderContent = null;
        }
        return renderContent;
    }
}

class TagWCount extends Component{
    constructor(props){
        super(props);
        this.state = {
            is_render: isSet(props.is_render, true)
        };

        this.deleteContent = this.deleteContent.bind(this);
    }


    deleteContent(){
        this.setState({"is_render": false});
    }

    render(){
        var renderContent = (
            <div className="control">
                <div className="tags has-addons">
                    <a className="tag is-light">{this.props.tagName}</a>
                    <a className="tag is-light">{this.props.tagCount}</a>
                </div>
            </div>
        );
        if(!this.state.is_render){
            renderContent = null;
        }
        return renderContent;
    }
}

class Card extends Component {
    render(){
        return (
            <CardContainer>
                <CardHeadImage>
                <CardHeader title={this.props.cardTitle}/>
                </CardHeadImage>
                <CardContent>
                    {this.props.children}
                </CardContent>
                {this.props.cardFooter}
            </CardContainer>
        );
    }
}

export default Card;
export {Card, Tag, TagWCount, TagField, CardButtons};