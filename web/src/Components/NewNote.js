import React, {Component} from 'react';
import {withAuth} from '../Auth';
import './Style.css';
import {Link, Redirect} from 'react-router-dom';
import CodeNote from './CodeEditor';
import {getAuthorizationHeader} from "../functions";

const defaultValue = `function onLoad(editor) {
  console.log("i've loaded");
}`;
class NewNote extends Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.onShare = this.onShare.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateDesc = this.updateDesc.bind(this);
        this.onCodeUpdates = this.onCodeUpdates.bind(this);
        // TODO: Lakshya, need note id to update Note when edit.
        this.state = {
            private: "Yes",
            noteType: "",
            noteTitle: "",
            noteDesc: "",
            noteCont: "",
            tags: "",
            shared: "",
            userID: this.props.profile.name,
            lastEdit: this.props.profile.name,
            editorProp: {
                mode: "javascript",
                theme: "github",
                autoComplete: false,
                lineNumber: true
            },
            redirect: false
        };
    }

    save() {
        //   console.log("All the updated data: " + JSON.stringify(this.state));
        var auth = getAuthorizationHeader();
        let request = new Request('/api/db/add-note', {
            method: 'POST',
            headers: {
                "Authorization": auth.Authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        });
        fetch(request).then(function (data) {
            console.log('Request succeeded with JSON response', data);
            if (data.status === 200) {
                return true;
            }
        }).then(re => {
            if (re) {
                this.setState({redirect: true});
                }
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }
    componentDidMount() {
        var type = this._reactInternalFiber._debugOwner.stateNode.props.match.params.type;
        var noteId = this._reactInternalFiber._debugOwner.stateNode.props.match.params.noteId;
        if (noteId) { // when editing, not creating new note.
            this.setState({noteType: type});
            let request = new Request('/api/db/get-note', {
                method: 'POST',
                headers: {
                    "Authorization": getAuthorizationHeader().Authorization,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"noteId": noteId})
            });

            fetch(request).then(response => {
                if (!response.ok) {
                    console.log("Error: could not conect server, in AllNote/index.js");
                    return false;
                }
                return response.json();
            }).then(res => {
                if (res) {
                    console.log("After fetching: ",res.note.content);
                    document.getElementById("noteTags").setAttribute("disabled", "");
                    this.setState({
                        private: !res.note.share,
                        noteType: res.note.type,
                        noteTitle: res.note.title,
                        noteDesc: res.note.description,
                        noteCont: res.note.content,
                        tags: [],
                        shared: [],
                        userID: this.props.profile.name,
                        lastEdit: this.props.profile.name
                    });
                    if (res.note.type === "Code") {
                        this.setState({
                            editorProp: {
                                mode: res.note.codeSetting.mode,
                                theme: res.note.codeSetting.theme,
                                autoComplete: res.note.codeSetting.autoComplete,
                                lineNumber: res.note.codeSetting.lineNumber
                            }
                        });
                    }
                }
            });
        } else {
            document.getElementById("noteTags").removeAttribute("disabled");
            this.setState({noteType: type});
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onShare(event) {
        var checked = event.target.defaultValue;
        this.setState({private: checked});
        if (checked === "No") {
            document
                .getElementById("shareToggleClass")
                .classList
                .add("shareToggleClassShow");
            document
                .getElementById("shareToggleClass")
                .classList
                .remove("shareToggleClassHide");
        } else if (checked === "Yes") {
            document
                .getElementById("shareToggleClass")
                .classList
                .add("shareToggleClassHide");
            document
                .getElementById("shareToggleClass")
                .classList
                .remove("shareToggleClassShow");
        }
    }
    updateDesc(value) {
        this.setState({noteCont: value});
    }
    onCodeUpdates(v) {
        this.setState({noteCont: v.value, mode: v.mode, theme: v.theme, autoComplete: v.enableLiveAutocompletion, lineNumber: v.showLineNumbers});
    }
    render() {
        console.log(this.state.noteCont);
        if (!this.state.redirect) {
            return (
                <div className="NoteClass">
                    <p className="title">Adding a new {this.state.noteType}
                        Note</p>
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input
                                value={this.state.noteTitle}
                                onChange={this.handleChange}
                                className="input"
                                name="noteTitle"
                                type="text"
                                placeholder="What's your note about?"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <input
                                value={this.state.noteDesc}
                                onChange={this.handleChange}
                                className="input"
                                name="noteDesc"
                                type="text"
                                placeholder="Explain your note in 1 line"/>
                        </div>
                    </div>
                    {this.state.noteType === "Text"
                        ? <TextNote content={this.state.noteCont} onEditDesc={this.updateDesc}/>
                        : <CodeNote
                            mode={this.state.editorProp.mode}
                            theme={this.state.editorProp.theme}
                            autoComplete={this.state.editorProp.autoComplete}
                            lineNumber={this.state.editorProp.lineNumber}
                            defaultNoteContent={this.state.noteCont}
                            onCodeUpdates={this.onCodeUpdates}/>}
                    <div className="field">
                        <label className="label">#Tags</label>
                        <div className="control">
                            <input
                                value={this.state.tags}
                                onChange={this.handleChange}
                                className="input"
                                name="tags"
                                type="text"
                                id="noteTags"
                                placeholder="Enter the tags starting with # seperated by ','"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Keep this Note Private?</label>
                        <div className="control">
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="question"
                                    value="Yes"
                                    checked={this.state.private === "Yes"}
                                    onChange={this.onShare}/>
                                Yes
                            </label>
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="question"
                                    value="No"
                                    checked={this.state.private === "No"}
                                    onChange={this.onShare}/>
                                No
                            </label>
                        </div>
                    </div>
                    <div className="field shareToggleClassHide" id="shareToggleClass">
                        <label className="label">People you want to share with</label>
                        <div className="control">
                            <input
                                value={this.state.shared}
                                onChange={this.handleChange}
                                className="input"
                                name="shared"
                                type="text"
                                placeholder="Enter your friend's username seperated by ','"/>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link" onClick={this.save}>Submit</button>
                        </div>
                        <div className="control">
                            <Link to={'/'} className="button is-light">Cancel</Link>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<Redirect to='/'/>);
        }
    }
}
class TextNote extends Component {
    constructor(props) {
        super(props);
        this.onChange = this
            .onChange
            .bind(this);
        this.state = {
            desc: props.content
        };
    }

    onChange(event) {
        this.setState({desc: event.target.value});
        this
            .props
            .onEditDesc(event.target.value);
    }
    render() {
        return (
            <div className="field">
                <label className="label">Note;</label>
                <div className="control">
                    <textarea
                        value={this.state.desc}
                        onChange={this.onChange}
                        className="textarea"
                        placeholder="Write what you want to save...">{this.props.content}</textarea>
                </div>
            </div>
        );
    }
}
export default withAuth(NewNote);