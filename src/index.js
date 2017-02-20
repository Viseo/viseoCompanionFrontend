import React from 'react';
import ReactDOM from 'react-dom';
import AddEvent from './addEvent/addEvent';
import Header from './header/header';
import './index.css';

ReactDOM.render(
    <Header />,
    document.getElementById('Header')
);

ReactDOM.render(
    <AddEvent />,
    document.getElementById('AddEvent')
);



