import React, {Component} from 'react';
import settings from "../config/settings";
import {Button} from "muicss/react";
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {Link} from "react-router-dom";

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
        this.loadEvents()
    }

    render() {
        const eventLinks = this.state.events.map(event => {
            return (
                <div>
                    <Link to={"/edit/" + event.id}>{event.name}</Link><br/>
                </div>
            )
        })
        const events = this.getEventsFormattedForCalendar()
        const calendar = (
            <div style={{height: 400}}>
                <BigCalendar
                    events={events}
                    defaultDate={new Date()}
                />
            </div>
        )
        return (

            <div>
                <h2>Liste des événements</h2>

                {eventLinks}
                {calendar}
                <Button
                    style={{backgroundColor: '#2196F3', color: 'white'}}
                    onClick={this.addEvent}
                >
                    Ajouter
                </Button>
            </div>
        )
    }

    addEvent = async () => {
        this.props.history.push('/add');
    }

    getEventsFormattedForCalendar() {
        return this.state.events.map(event => {
            return {
                'title': event.name,
                'allDay': true,
                'start': moment(event.date).toDate(),
                'end': moment(event.date).toDate()
            }
        })
    }

    getEventsFromJson(json) {
        let events = []
        for (let i = 0; i < json.length; i++) {
            let event = json[i]
            events.push({
                id: event.id,
                name: event.name,
                description: event.description,
                date: event.datetime,
                location: event.place,
                category: event.category
            })
        }
        return events
    }

    loadEvents = async () => {
        let eventsResponse = await fetch(settings.api.getEvents)
        let eventsJson = await eventsResponse.json()
        let events = this.getEventsFromJson(eventsJson)
        this.setState({
            events
        })
    }
}