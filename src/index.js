import React from 'react';
import ReactDOM from 'react-dom';
import AddEvent from './scenes/addEvent';
import App from './scenes/App';
import './index.css';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={AddEvent}/>
            <Route path="add" component={AddEvent}/>
            {/*<Route path="*" component={Error}/>*/}
        </Route>
    </Router>,
    document.getElementById('root')
);

