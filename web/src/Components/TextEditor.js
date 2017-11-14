

import React, { Component } from 'react';
import { EditorState, RichUtils, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css';

import createToolbarPlugin from 'draft-js-static-toolbar-plugin';



import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from 'draft-js-buttons';
import editorStyles from './EditorStyles.css';

const emojiPlugin = createEmojiPlugin();

const { EmojiSuggestions } = emojiPlugin;




const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton
  ]
});
const { InlineToolbar } = inlineToolbarPlugin;
const toolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton
  ]
});
const { Toolbar } = toolbarPlugin;
const plugins = [inlineToolbarPlugin];
const text = 'In this editor a toolbar shows up once you select part of the text …';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  onChange = (editorState) => {
    
    const contentState = editorState.getCurrentContent();
    this.setState({
        editorState
      });
    this
    .props
    .onEditDesc(JSON.stringify(convertToRaw(contentState)));
  }
  focus = () => {
    this.editor.focus();
  };
  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }
  

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }
  render() {
    return (
      <div className="editor">
                {/*<button onClick={this.onUnderlineClick}>Underline</button>*/}
        
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={[emojiPlugin, inlineToolbarPlugin, toolbarPlugin]}
          ref={(element) => { this.editor = element; }}
        />
        <EmojiSuggestions />
        <Toolbar />
      </div>
    );
  }
}

export default TextEditor;