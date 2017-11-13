import React, { Component } from 'react';
import textImg from "./text.png";
import codeImg from "./code.jpg";
import {Link} from 'react-router-dom';


import {getAuthorizationHeader, isSet} from "../functions";

class CardHeadImage extends Component {
    constructor(props){
        super(props);
        let bgImage = props.cardType.indexOf("code") !== -1;// TODO: need some fix,,,
        let imgUrl = "https://bulma.io/images/placeholders/1280x960.png";
        if(bgImage){
            imgUrl = codeImg;
        }else{
            imgUrl = textImg;
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
        let request = new Request('/api/db/like-dislike', {
            method: 'POST',
            headers: {
                "Authorization": getAuthorizationHeader().Authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId: this.props.userId, noteId: this.props.noteId, operation: "like"})
        });
        // TODO: write re-rendering with setState and binding.
        fetch(request)
        .then(response => {
            if(!response.ok) {
                console.log("Error: could not conect server, in AllNote/index.js");
                return false;
            }
            return response.json();
        }).then(res => {
            if(res){
                console.log("like detect",res);
                if(res.status === 200){
                    this.setState({"likeCount":res.result.like, "dislikeCount": res.result.dislike});
                }
            }
        });
    }

    incrementDislike(){
        let request = new Request('/api/db/like-dislike', {
            method: 'POST',
            headers: {
                "Authorization": getAuthorizationHeader().Authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId: this.props.userId, noteId: this.props.noteId, operation: "dislike"})
        });
        // TODO: write re-rendering with setState and binding.
        fetch(request)
        .then(response => {
            if(!response.ok) {
                console.log("Error: could not conect server, in AllNote/index.js");
                return false;
            }
            return response.json();
        }).then(res => {
            if(res){
                console.log("dislike detect",res);
                if(res.status === 200){
                    this.setState({"likeCount":res.result.like, "dislikeCount": res.result.dislike});
                }
            }
        });
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
    }

    render(){
        var renderContent = (
            <div className="control">
                <div className="tags has-addons">
                    <span className="tag is-light">{this.props.tagName}</span>
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
                <Link className="centre-this" id="myLink" to={"/tag-search"} ><a className="tag is-light" onClick={this.props.setTagValue.bind(this,this.props.tagName)}>{this.props.tagName}</a></Link>
                
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
        var dateString;
        var date = new Date(this.props.cardFooter.props.children.props.allProps.updatedAt);
        dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + " at " + date.toLocaleTimeString();;
        
        return (
            <CardContainer>
                <CardHeadImage cardType={this.props.cardType}>
                <CardHeader title={this.props.cardTitle}/>
                </CardHeadImage>
                <CardContent>
                    {this.props.children}
                </CardContent>
                {this.props.cardFooter}
                <hr/>
                <div className="LasteEditedDate">Last Edited on {dateString}</div>
            </CardContainer>
        );
    }
}

export default Card;
export {Card, Tag, TagWCount, TagField, CardButtons};