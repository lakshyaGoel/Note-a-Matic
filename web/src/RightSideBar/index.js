import React, { Component } from 'react';
import '../Style.css';

class RightSideBar extends Component {
  constructor(props){
        super(props);
        var dataList = [];
        // demo data
        for(let i = 0; i < 5; i++){
            let data = {
                "name": "name" + i,
                "type": i, //edited or viewed
                "note_id" : "note_id "+i,
                "note_title" : "note_title"+i
            };
            dataList.push(data);
        }

        this.state = {"dataList": dataList};
        this.deleteClick=this.deleteClick.bind(this);
  }
  
  deleteClick(){
        //return(<div>{alert({this.state.name})}</div>);
        this.setState({"is_render": false});
  }

  render() {
    return (
        
            <div className="customRightSideBar">
                <div><p className="subtitle " >Notification Pannel</p></div>
                    {this.state.dataList.map((ldata) => <div class="notification is-info">
                            <button class="delete" onClick={this.deleteClick}></button>
                                <strong>{ldata.name}</strong>
                                <div>note {ldata.note_title} has been <strong>{ldata.type%2==0 ? <span>edited</span> : <span>viewed</span>}</strong></div>
                            </div>
                    )}
                </div>        
    );
  }
}

export default RightSideBar;
