/**
 * Created by IBO3693 on 03/05/2017.
 */
import React, {Component} from 'react';
import settings from "../config/settings";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            events:[]
        }
        this.loadEvents();
    }

    loadEvents = async () => {
        let eventsResponse = await fetch(settings.api.getEvents)
        let eventsJson = await eventsResponse.json()
        let events = this.getEventsFromJson(eventsJson)
        this.setState({
            events
        })
    }

    getEventsFromJson(json) {
        let events = [];
        for (let i = 0; i < json.length; i++) {
            let event = json[i];
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

    render() {
        const eventLinks = this.state.events.map(event => {
            return (
                <div>
                    <a href={"/edit/"+event.id}>{event.name}</a><br/>
                </div>
            )
        })
        return (
            <div>
                <p>Welcome to Home</p>
                {eventLinks}
            </div>
        )
    }
}