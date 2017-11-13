import React, {Component} from 'react';
import './Style.css';
import {Link} from 'react-router-dom';
import {TagWCount, TagField} from "./Card";
import {getAuthorizationHeader, getUserId} from "../functions";

class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        let dataList = [];
        this.state = {
            tags: [],
            tempTagList: [],
            tagSS: [],
            "dataList": dataList,
            "currentUserId": ""
        };
        this.displayTag = this
            .displayTag
            .bind(this);

    }

    displayTag(value) {
        console.log("tag selected");
        console.log(value);
        this
            .props
            .displayTagValue1(value);
    }

    componentDidMount() {
        let request = new Request('/api/db/all-note', {
            method: 'POST',
            headers: {
                "Authorization": getAuthorizationHeader().Authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.props.profile)
        });

        // TODO: write re-rendering with setState and binding.
        fetch(request).then(response => {
            if (!response.ok) {
                console.log("Error: could not conect server, in AllNote/index.js");
                return false;
            }
            return response.json();
        }).then(res => {
            if (res) {
                this.setState({"dataList": res.content, "currentUserId": res.currentUserId});
                let tags = [],
                    tagSS = []
                for (let i = 0; i < this.state.dataList.length; i++) {
                    this.setState({tempTagList: []});
                    this.setState({tempTagList: this.state.dataList[i].tagNameList});
                    for (var j = 0; j < this.state.tempTagList.length; j++) {
                        if (tagSS.indexOf(Object(this.state.tempTagList[j])) > -1) {
                            tags.push({
                                "tagName": this.state.tempTagList[j],
                                "count": tags[tags.findIndex(this.state.tempTagList[j])].count + 1
                            });

                        } else {
                            tagSS.push(this.state.tempTagList[j]);
                            tags.push({"tagName": this.state.tempTagList[j], "count": 1});

                        }
                    }
                    this.setState({tags, tagSS});
                }
            }
        });
    }
    render() {

        // TODO: use Bulma CSS. Read Bulma documentation.
        return (
            <div className="customLeftSideBar">

                <img className="img-circle" src={this.props.profile.picture} alt="Placeholder"/>

                <div className="sideBarTableRow">
                    <div className="sideBarTableRowImg">
                        <i class="fa fa-user-circle-o"></i>
                    </div>
                    <div className="sideBarTableRowLink">
                        <Link
                            className="centre-this is-small is-active"
                            to={"/user-info"}
                            onClick={this
                            .props
                            .displayTextUser
                            .bind(this)}>{this.props.profile.nickname}</Link>
                    </div>
                </div>
                <div className="sideBarButtons">
                    <div className="sideBarTableRow">
                        <div className="sideBarTableRowImg">
                            <i class="fa fa-globe "></i>
                        </div>
                        <div className="sideBarTableRowLink">
                            <Link
                                className="centre-this is-active"
                                id="myLink"
                                to={"/all-note"}
                                onClick={this
                                .props
                                .displayTextAllNotes
                                .bind(this)}>All Notes</Link>
                        </div>
                    </div>
                    <div className="sideBarTableRow">
                        <div className="sideBarTableRowImg">
                            <i class="fa fa-user-secret"></i>
                        </div>
                        <div className="sideBarTableRowLink">
                            <Link
                                id="myLink"
                                title="Click to do something"
                                to={"/my-note"}
                                onClick={this
                                .props
                                .displayTextMyNotes
                                .bind(this)}>My Notes</Link>
                        </div>
                    </div>
                    <div className="sideBarTableRow">
                        <div className="sideBarTableRowImg">
                            <i class="fa fa-share-alt"></i>
                        </div>
                        <div className="sideBarTableRowLink">
                            <Link
                                className="centre-this"
                                id="myLink"
                                to={"/share-note"}
                                onClick={this
                                .props
                                .displayTextSharedNotes
                                .bind(this)}>Shared Notes</Link>
                        </div>
                    </div>
                </div>
                <br/><br/><br/><br/><br/><br/><br/>
                <div>
                    <i class="fa fa-tags "></i>
                    <p>My Tags</p>
                    <TagField>
                        {this
                            .state
                            .tags
                            .map((tagData, key) => <TagWCount
                                tagName={tagData.tagName}
                                tagCount={tagData.count}
                                setTagValue={this.displayTag}
                                key={key.toString()}/>)}
                    </TagField>
                </div>
            </div>
        );
    }
}

export default LeftSideBar;
