import React, { Component } from 'react';
import { withAuth } from '../Auth';
import './Style.css';
class NewNote extends Component{
    constructor(props){
        super(props);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onShare = this.onShare.bind(this);
        this.state = {share: "No"};
    }

    save(){
        console.log("SAVED");
    }

    cancel(){
        console.log("CANCELLED");
    }

    onShare(event){
        var checked = event.target.defaultValue;
        this.setState({share: checked});
        if(checked === "Yes"){
            document.getElementById("shareToggleClass").classList.add("shareToggleClassShow");
            document.getElementById("shareToggleClass").classList.remove("shareToggleClassHide");
        }else if(checked === "No"){
            document.getElementById("shareToggleClass").classList.add("shareToggleClassHide");
            document.getElementById("shareToggleClass").classList.remove("shareToggleClassShow");
        }
    }
    render(){
        return(
            <div>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="What's your note about?"/>
                    </div>
                </div>
                <TextNote/>
                <div className="field">
                    <label className="label">#Tags</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Enter the tags starting with # seperated by ','"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Do you want to share this note?</label>
                    <div className="control">
                        <label className="radio">
                            <input type="radio" name="question" value="Yes" checked={this.state.share === "Yes"} onChange={this.onShare}/>
                            Yes
                        </label>
                        <label className="radio">
                            <input type="radio" name="question" value="No" checked={this.state.share === "No"} onChange={this.onShare}/>
                            No
                        </label>
                    </div>
                </div>
                <div className="field shareToggleClassHide" id="shareToggleClass">
                    <label className="label">People you want to share with</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Enter your friend's username seperated by ','"/>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={this.save}>Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-text" onClick={this.cancel}>Cancel</button>
                    </div>
                </div>
            </div>
            );
        }
}

class TextNote extends Component{

    render(){
        return(
            <div className="field">
                <label className="label">Note</label>
                <div className="control">
                    <textarea className="textarea" placeholder="Write what you want to save..."></textarea>
                </div>
            </div>
        );
    }
}

// class CodeNote extends Component{

// }
export default withAuth(NewNote);