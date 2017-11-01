import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';

// import App from './App';

// ReactDOM.render((
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// ), document.getElementById('root'));

import Header from './Components/Header';
import LeftSideBar from './Components/LeftSideBar';
import Content from './Components/Content';
import RightSideBar from './Components/RightSideBar';
import Footer from './Components/Footer';

ReactDOM.render(
    <div>
        <Header/>
        <div className="ContentArea">
            <div style={{"display":"table-row"}}>
                <LeftSideBar />
                <Content />
                <RightSideBar/>
            </div>
        </div>
        <Footer/>
    </div>
    , document.getElementById('root'));
