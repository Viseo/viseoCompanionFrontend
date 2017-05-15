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
        const calendar = this.renderCalendar()
        const addEventButton = this.renderAddEventButton()
        return (
            <div>
                <h2>Liste des événements</h2>
                {addEventButton}
                {calendar}
            </div>
        )
    }

    renderAddEventButton() {
        return (
            <Button
                style={{backgroundColor: '#2196F3', color: 'white'}}
                onClick={this.addEvent}
            >
                Ajouter
            </Button>
        )
    }

    renderCalendar() {
        const events = this.getEventsFormattedForCalendar()
        return (
            <div style={{height: "75vh", marginHorizontal:100}}>
                <BigCalendar
                    selectable
                    events={events}
                    defaultDate={new Date()}
                    onSelectEvent={this.editSelectedEvent}
                    onSelectSlot={this.createEventOnSelectedSlot}
                />
            </div>
        )
    }

    addEvent = async () => {
        this.props.history.push('/add');
    }

    createEventOnSelectedSlot = (slotInfo) => {
        let newEvent = {
            date: slotInfo.start,
        }
        this.props.history.push('/add', newEvent)
    }

    editSelectedEvent = (event) => {
        this.props.history.push('/edit/' + event.id)
    }

    getEventsFormattedForCalendar() {
        return this.state.events.map(event => {
            return {
                'title': event.name,
                'start': moment(event.date).toDate(),
                'end': moment(event.date).add(2, 'hour').toDate(),
                id: event.id
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