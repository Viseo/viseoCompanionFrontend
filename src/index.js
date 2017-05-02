import React from 'react';
import ReactDOM from 'react-dom';
import db from './utils/db';
import AddEvent from './scenes/addEvent';
import SignIn from './scenes/signIn';
import App from './scenes/App';
import './index.css';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import Calendar from "./scenes/Calendar";

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Calendar}/>
            <Route path="calendar" component={Calendar}/>
            <Route path="signIn" component={SignIn} db={db}/>
            <Route path="add" component={AddEvent} />
        </Route>
    </Router>,
    document.getElementById('root')
);

