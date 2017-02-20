/**
 * Created by LMA3606 on 16/02/2017.
 */

import React, {Component} from 'react';
import {Input, Textarea, Button, Select, Option, Container, Row, Col} from 'muicss/react'; //https://www.muicss.com/docs/v1/react
import DatePicker from 'react-datepicker';
import './addEvent.css';
import 'react-datepicker/dist/react-datepicker.css';
import settings from '../config/settings'

export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            place: '',
            hours:[],
            time: '',
            isTimeSet: false,
            date: '',
            isDateSet: false,
            datetime: '',
            keyWords: '',
            description: '',
            errorTitle:'',
            errorType:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onPressSendNewEvent = this.onPressSendNewEvent.bind(this);
        this.isFormCorrect = this.isFormCorrect.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);

        this.generateHours();
    }

    handleTitleChange(event) {
        let title = event.target.value;
        if(title.length <= 2 ) {
            this.setState({
                errorTitle:'Le titre doit contenir au moins deux caractères.'
            })
        }

    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            date: date,
            isDateSet:true
        });
    }

    handleTimeChange(event) {
        this.setState({
            time: event.target.value,
            isTimeSet: true
        });
    }

    async onPressSendNewEvent(){
        if(this.state.isDateSet && this.state.isTimeSet) {
            let timeUnix = this.state.time.split(":")[0]*3600 + this.state.time.split(":")[1]*60;
            this.setState({
                datetime: this.state.date.valueOf() + timeUnix
            })
        }
        if(this.isFormCorrect()){
            await this.addEvent(
                this.state.name,
                this.state.datetime,
                this.state.keyWords,
                this.state.place,
                this.state.description
            );
        }
    }

    isFormCorrect() {
        let hasError = '';
        if (!this.state.isDateSet) {
            hasError = " une date";
        }
        if (!this.state.isTimeSet) {
            hasError = hasError + " une horaire"
        }
        if (this.state.name === '') {
            hasError = hasError + " un nom"
        }
        if (this.state.place === '') {
            hasError = hasError + " un lieu"
        }

        if (hasError !== '') {
            this.setState({errorType: 'Veuillez entrer :' + hasError});
            return false;
        } else {
            return true;
        }
    }

    async addEvent(name, datetime, keyWords, place, description){
        try{
            console.warn('New Event:\n');
            console.warn(datetime);
            let date = new Date(datetime);
            console.warn(date);
            console.warn(place + '\n');
            console.warn('URL : ' + settings.ADDEVENT_API_URL);
            let response = await fetch(settings.ADDEVENT_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": name,
                    "datetime": datetime,
                    "description": description,
                    "keyWords": keyWords,
                    "place": place,
                })
            })
            console.warn(response.status);
            let responseJson = await response.json();

            if(responseJson)
                return true;
        } catch (error){
            console.warn(error);
        }
    }

    generateHours(){
        const startHour = 8;
        const endHour = 19;

        for(let i = startHour; i <= endHour; i++) {
            let hourString = i + ":00";
            this.state.hours.push(<Option value={hourString} label={hourString} key={hourString} />);
            hourString = i + ":30";
            this.state.hours.push(<Option value={hourString} label={hourString} key={hourString} />);
        }
    }

    render() {
        return (
            <div className="new-event-form">
                <h1>Ajouter Evènement</h1>
                <div className="form">
                    <Container>
                        <Row>
                            <Input
                                name="name"
                                label="Nom de l'évènement"
                                value={this.state.name}
                                floatingLabel={true}
                                onChange={this.handleInputChange}
                                required={true}
                            />
                        </Row>
                        <Row>
                            <div className="error">{this.state.errorTitle}</div>
                        </Row>
                        <Row>
                            <Col md="8">
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.handleDateChange}
                                    dateFormat={"DD/MM/YYYY"}
                                    required={true}
                                    placeholderText="Date"
                                />
                            </Col>
                            <Col md="4">
                                <Select label="Horaire" onClick={this.handleTimeChange} id="time" >
                                    {this.state.hours}
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            <Input
                                name="place"
                                label="Lieu"
                                value={this.state.place}
                                floatingLabel={true}
                                onChange={this.handleInputChange}
                                required={true}
                            />
                        </Row>
                        <Row>
                            <Textarea
                                name="description"
                                label="Description"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                floatingLabel={true}
                            />
                        </Row>
                        <Row>
                            <Textarea
                                name="keywords"
                                label="Mots clé"
                                value={this.state.keyWords}
                                onChange={this.handleInputChange}
                                floatingLabel={true}
                            />
                        </Row>
                        <Row>
                    <div className="error">{this.state.errorType}</div>
                        </Row>
                        <Row>
                            <Button variant="flat" color="primary" onClick={this.onPressSendNewEvent}>Ajouter</Button>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}