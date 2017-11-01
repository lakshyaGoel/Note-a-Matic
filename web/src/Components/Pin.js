import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';

class Pin extends Component{
    render(){
        return(
            <div>
                <div>
                    <div>Place to show image for the post.</div>
                    <div>Show Like/Unlike  Button</div>
                </div>
                <div>Place to show Description.</div>
                <div>Place to show Tags.</div>
                <div>Place to add friends button. Text would be the number of friends liking the post.</div>
            </div>
        )
    }
}

export default Pin;