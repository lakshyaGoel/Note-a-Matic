import React, { Component } from 'react';


class CardHeadImage extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.state.imgURL = props.imgURL;
        if(typeof this.state.imgURL === "undefined"){
            this.state.imgURL = "https://bulma.io/images/placeholders/1280x960.png";
        }
    }

    render(){
        return (
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={this.state.imgURL} alt="Placeholder image"/>
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

class CardFooter extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.state.friendCount = this.props.friendCount;
        if(typeof this.state.friendCount === "undefined"){
            this.state.friendCount = 0;
        }

        this.incrementFriendCount = this.incrementFriendCount.bind(this);
    }

    incrementFriendCount(){
        this.setState({"friendCount": this.state.friendCount + 1});
    }
    render(){
        return (
            <footer className="card-footer">
                {/* basic item goes here
                 temporary, I add save edit delete button same as example
                 https://bulma.io/documentation/components/card/
                 */}
                <a className="card-footer-item" onClick={this.incrementFriendCount}>Add Friends: {this.state.friendCount}</a>
            </footer>
        );
    }
}

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
        this.state = {};
        this.state.likeCount = props.likeCount;
        if(typeof this.state.likeCount === "undefined"){
            this.state.likeCount = 0;
        }

        this.state.dislikeCount = props.dislikeCount;
        if(typeof this.state.dislikeCount === "undefined"){
            this.state.dislikeCount = 0;
        }

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
    }

    render(){
        return (
        <div className="control">
            <div className="tags has-addons">
                <a className="tag is-light">{this.props.tagName}</a>
                <a className="tag is-delete"> </a>
            </div>
        </div>
        )
    }
}

class Card extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return (
            <CardContainer>
                {/*
                 # require goods
                 -[x] image part
                 -[x] like/unlike
                 - show tags
                 -[x] description
                 -[x] add friends?
                 */}
                <CardHeadImage/>
                <CardHeader title={this.props.cardTitle}/>
                <CardContent>
                    This is inside card. main content.
                    Click like and unlike button! Now working!<br/>
                    Also, Add Friend button working!<br />
                    <p style={ {fontWeight:700, color:"green", fontSize:36} }>
                        Thank you to commit freaquently, I really appreciate that, But
                    </p>
                    <p style={ {fontWeight:700, color:"red", fontSize:36} }>
                        Guys, don't commit code which stop whole system.
                        </p>
                    <CardButtons/>
                    <TagField>
                        <Tag tagName="Item1"/>
                        <Tag tagName="Item2"/>
                        <Tag tagName="Item3"/>
                    </TagField>
                </CardContent>
                <CardFooter />
            </CardContainer>
        );
    }
}

export default Card;
