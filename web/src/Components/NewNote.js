import React, { Component } from 'react';
import { withAuth } from '../Auth';
import './Style.css';
import AceEditor from 'react-ace';
import 'brace/mode/jsx';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

const languages = [
    'javascript',
    'java',
    'python',
    'xml',
    'sass',
    'mysql',
    'json',
    'html',
    'handlebars',
    'csharp',
    'typescript',
    'css'
  ]
  
  const themes = [
    'github',
    'tomorrow',
    'kuroir',
    'twilight',
    'xcode',
    'textmate',
    'solarized_dark',
    'solarized_light',
    'terminal',
  ]
  
  languages.forEach((lang) => {
    require(`brace/mode/${lang}`)
    require(`brace/snippets/${lang}`)
  })
  
  themes.forEach((theme) => {
    require(`brace/theme/${theme}`)
  })
  
  
  const defaultValue =
  `function onLoad(editor) {
    console.log("i've loaded");
  }`;
class NewNote extends Component{
    constructor(props){
        super(props);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onShare = this.onShare.bind(this);
        this.state = {private: "Yes", noteType:"Text"};
    }

    save(){
        console.log("SAVED");
    }

    cancel(){
        console.log("CANCELLED");
    }

    onShare(event){
        var checked = event.target.defaultValue;
        this.setState({private: checked});
        if(checked === "No"){
            document.getElementById("shareToggleClass").classList.add("shareToggleClassShow");
            document.getElementById("shareToggleClass").classList.remove("shareToggleClassHide");
        }else if(checked === "Yes"){
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
                {this.state.noteType === "Text" ? <TextNote/> : <CodeNote/>}
                <div className="field">
                    <label className="label">#Tags</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Enter the tags starting with # seperated by ','"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Keep this Note Private?</label>
                    <div className="control">
                        <label className="radio">
                            <input type="radio" name="question" value="Yes" checked={this.state.private === "Yes"} onChange={this.onShare}/>
                            Yes
                        </label>
                        <label className="radio">
                            <input type="radio" name="question" value="No" checked={this.state.private === "No"} onChange={this.onShare}/>
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
class CodeNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: defaultValue,
          theme: 'github',
          mode: 'javascript',
          enableLiveAutocompletion: false,
          fontSize: 14,
          showGutter: true,
          showPrintMargin: true,
          highlightActiveLine: true,
          enableSnippets: false,
          showLineNumbers: true,
        };
        this.setTheme = this.setTheme.bind(this);
        this.setMode = this.setMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setBoolean = this.setBoolean.bind(this);
    }

    onLoad() {
      console.log('i\'ve loaded');
    }
    onChange(newValue) {
      console.log('change', newValue);
      this.setState({
        value: newValue
      })
    }
  
    onSelectionChange(newValue, event) {
      console.log('select-change', newValue);
      console.log('select-change-event', event);
    }
  
    onCursorChange(newValue, event) {
      console.log('cursor-change', newValue);
      console.log('cursor-change-event', event);
    }
  
    onValidate(annotations) {
      console.log('onValidate', annotations);
    }
  
    setTheme(e) {
      this.setState({
        theme: e.target.value
      })
    }
    setMode(e) {
      this.setState({
        mode: e.target.value
      })
    }
    setBoolean(name, value) {
      this.setState({
        [name]: value
      })
    }
    render() {
      return (
        <div className="columns">
          <div className="column">
             <div className="field">
               <label>
                 Mode:
               </label>
                 <p className="control">
                   <span className="select">
                     <select name="mode" onChange={this.setMode} value={this.state.mode}>
                       {languages.map((lang) => <option  key={lang} value={lang}>{lang}</option>)}
                     </select>
                    </span>
                 </p>
             </div>
  
             <div className="field">
               <label>
                 Theme:
               </label>
                 <p className="control">
                   <span  className="select">
                     <select name="Theme" onChange={this.setTheme} value={this.state.theme}>
                      {themes.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                     </select></span>
                 </p>
             </div>
             <div className="field">
              <p className="control">
                <label className="checkbox">
                  <input type="checkbox" checked={this.state.enableLiveAutocompletion} onChange={(e) => this.setBoolean('enableLiveAutocompletion', e.target.checked)} />
                   Enable Live Autocomplete
                </label>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <label className="checkbox">
                  <input type="checkbox" checked={this.state.showLineNumbers} onChange={(e) => this.setBoolean('showLineNumbers', e.target.checked)} />
                   Show Line Numbers
                </label>
              </p>
            </div>
  
  
        </div>
          <div className="examples column">
            <h2>Editor</h2>
            <AceEditor
            mode={this.state.mode}
            theme={this.state.theme}
            name="blah2"
            onLoad={this.onLoad}
            onChange={this.onChange}
            onSelectionChange={this.onSelectionChange}
            onCursorChange={this.onCursorChange}
            onValidate={this.onValidate}
            value={this.state.value}
            fontSize={this.state.fontSize}
            showPrintMargin={this.state.showPrintMargin}
            showGutter={this.state.showGutter}
            highlightActiveLine={this.state.highlightActiveLine}
            setOptions={{
              enableBasicAutocompletion: this.state.enableBasicAutocompletion,
              enableLiveAutocompletion: this.state.enableLiveAutocompletion,
              enableSnippets: this.state.enableSnippets,
              showLineNumbers: this.state.showLineNumbers,
              tabSize: 2,
            }}/>
        </div>
      </div>
      );
    }
  }
export default withAuth(NewNote);