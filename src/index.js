import React from 'react';
import ReactDOM from 'react-dom';
import db from './utils/db';
import AddEvent from './scenes/addEvent';
import SignIn from './scenes/signIn';
import App from './scenes/App';
import './index.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import EditEvent from "./scenes/editEvent";
import moment from "moment";
import Home from "./scenes/home";

let event={
    id:2,
    name:"event name",
    description:"desription",
    location:"location ",
    keyWords:"keys",
    categoryId:0,
    date:moment(new Date('2017','03','05')),
    time:"13:30"

}
ReactDOM.render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>,
    document.getElementById('root')
);
