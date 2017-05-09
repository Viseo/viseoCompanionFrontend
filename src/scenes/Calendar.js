import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import {Link} from "react-router-dom";

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

var events = [{
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1)
}];

export default class extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const calendar = (
            <div style={{height:400}}>
                <BigCalendar
                    {...this.props}
                    events={events}
                    defaultDate={new Date()}
                />
            </div>
        );
        return (
            <div>
                <Link to="add">ADD</Link>
                <p>
                    Calendar view
                </p>
                {calendar}
            </div>
        );
    }
}