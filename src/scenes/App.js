import React, {Component} from 'react';
import Header from '../components/header';
import {Route, BrowserRouter as Router, Link} from "react-router-dom";
import EditEvent from "./editEvent";
import AddEvent from "./addEvent";
import SignIn from "./signIn";
import db from "../utils/db";
import Home from "./home";
import Calendar from "./Calendar";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Router>
                    <div>
                        <Link to="/">Home</Link>
                        <Route exact path="/" component={Calendar}/>
                        <Route path="/signIn" component={SignIn} db={db}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/add" component={AddEvent}/>
                        <Route path="/edit/:id" component={EditEvent} event={event}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;