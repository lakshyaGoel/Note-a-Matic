import React, { Component } from 'react';
import MainComponent from "../Components/mainComponentPart";

class UserInfo extends Component {
    constructor(props){
        super(props);
        
    }
    render(){
        return (
            <div>
                <div>
                    <p className="centre-this title">User Information</p>
                    <img className="img" src={this.props.profile.picture} alt="Placeholder image" />
                    <p className="centre-this">Name: {this.props.profile.name}</p>
                    <p className="centre-this">Nickname: {this.props.profile.nickname}</p>
                </div>

                <div className="columns is-multiline">
                    
                    
                </div>
            </div>
        );
    }
}



export default UserInfo;