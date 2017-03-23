import React from 'react';
import ReactDOM from 'react-dom';
import AddEvent from './scenes/addEvent';
import SignIn from './scenes/signIn';
import App from './scenes/App';
import './index.css';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={SignIn}/>
            <Route path="signIn" component={SignIn}/>
            <Route path="add" component={AddEvent} />
        </Route>
    </Router>,
    document.getElementById('root')
);

