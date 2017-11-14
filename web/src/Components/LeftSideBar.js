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
                        if (tagSS.indexOf((this.state.tempTagList[j].toString())) > -1) {
                            tags[tagSS.indexOf((this.state.tempTagList[j].toString()))].count=tags[tagSS.indexOf((this.state.tempTagList[j].toString()))].count + 1;
                            

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
        return (
            <div className="customLeftSideBar">
                <hr/>
                <div className="sideBarTableRowTagImg">
                    <i class="fa fa-id-card"></i>
                </div>
                <div className="sideBarTableRowTagHeader">
                    <div className="centre-this is-active navbar-item">Profile</div>
                </div>
                <hr/>
                <div style={{paddingTop:"2rem"}}>
                    <img className="img-circle" src={this.props.profile.picture} alt="Placeholder"/>
                    <div className="sideBarTableRow">
                        <div className="sideBarTableRowImg">
                            <i class="fa fa-user-circle-o"></i>
                        </div>
                        <div className="sideBarTableRowLink">
                            <Link
                                className="centre-this is-small is-active navbar-item"
                                to={"/user-info"}
                                onClick={this
                                .props
                                .displayTextUser
                                .bind(this)}>{this.props.profile.nickname}</Link>
                        </div>
                    </div>
                </div>
                <div className="sideBarButtons">
                    <hr/>
                    <div className="sideBarTableRowTagImg">
                        <i class="fa fa-file-text "></i>
                    </div>
                    <div className="sideBarTableRowTagHeader">
                        <div className="centre-this is-active navbar-item">Notes</div>
                    </div>
                    <hr/>
                    <div className="sideBarTableRow">
                        <div className="sideBarTableRowImg">
                            <i class="fa fa-globe "></i>
                        </div>
                        <div className="sideBarTableRowLink">
                            <Link
                                className="centre-this is-active navbar-item"
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
                                className="centre-this is-active navbar-item"
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
                                className="centre-this is-active navbar-item"
                                id="myLink"
                                to={"/share-note"}
                                onClick={this
                                .props
                                .displayTextSharedNotes
                                .bind(this)}>Shared Notes</Link>
                        </div>
                    </div>
                </div>
                <br/>
                <div>
                    <hr/>
                    <div>
                        <div className="sideBarTableRowTagImg">
                            <i class="fa fa-tags "></i>
                        </div>
                        <div className="sideBarTableRowTagHeader">
                            <div className="centre-this is-active navbar-item">Tags</div>
                        </div>
                        <hr/>
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
            </div>
        );
    }
}

export default LeftSideBar;
