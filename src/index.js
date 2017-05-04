import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';

import db from './utils/db';
import './index.css';

import App from './scenes/App';
import Calendar from "./scenes/Calendar";
import AddEvent from './scenes/addEvent';
import SignIn from './scenes/signIn';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="src/" component={App}>
            <IndexRoute component={Calendar}/>
            <Route path="calendar" component={Calendar}/>
            <Route path="signIn" component={SignIn} db={db}/>
            <Route path="add" component={AddEvent} />
        </Route>
    </Router>,
    document.getElementById('root')
);

