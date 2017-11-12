import React, {Component} from 'react';
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
  'terminal'
]
languages.forEach((lang) => {
  require(`brace/mode/${lang}`)
  require(`brace/snippets/${lang}`)
})

themes.forEach((theme) => {
  require(`brace/theme/${theme}`)
})

class CodeNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultNoteContent,
      theme: props.theme,
      mode: props.mode,
      enableLiveAutocompletion: props.autoComplete,
      fontSize: 14,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: props.lineNumber
    };
    this.setTheme = this.setTheme.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
  }
  onChange(newValue) {
    this.setState({value: newValue})
    this.props.onCodeUpdates(this.state);
  }

  setTheme(e) {
    this.setState({theme: e.target.value})
  }
  setMode(e) {
    this.setState({mode: e.target.value})
  }
  setBoolean(name, value) {
    this.setState({[name]: value})
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
                  {languages.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </span>
            </p>
          </div>

          <div className="field">
            <label>
              Theme:
            </label>
            <p className="control">
              <span className="select">
                <select name="Theme" onChange={this.setTheme} value={this.state.theme}>
                  {themes.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.enableLiveAutocompletion}
                  onChange={(e) => this.setBoolean('enableLiveAutocompletion', e.target.checked)}/>
                Enable Live Autocomplete
              </label>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.showLineNumbers}
                  onChange={(e) => this.setBoolean('showLineNumbers', e.target.checked)}/>
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
            tabSize: 2
          }}/>
        </div>
      </div>
    );
  }
}
export default CodeNote;