/**
 * Created by LMA3606 on 16/02/2017.
 */

import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import placeLogo from '../images/placeLogo.png';
import './addEvent.css';
import 'react-datepicker/dist/react-datepicker.css';
import Event from '../utils/event';
import db from '../utils/db';
import * as util from '../utils/util';
import {Input, Textarea, Button, Option, Container, Row, Col} from 'muicss/react'; //https://www.muicss.com/docs/v1/react

export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isNameRequired: true,
            place: '',
            errorPlace: '',
            hours: [],
            time: '',
            isTimeSet: '',
            timeStyle: '',
            date: '',
            isDateSet: '',
            datepickerStyle: '',
            datetime: '',
            keyWords: '',
            description: '',
            errorTitle: '',
            errorType: '',
            successMessage: 'Evènement ajouté !',
        };
        this.generateSelectHours();
    }

    emptyFields = () => {
        this.setState({
            name: '',
            isNameRequired: false,
            place: '',
            placeRequired: false,
            errorPlace: '',
            time: '',
            isTimeSet: '',
            date: '',
            isDateSet: '',
            datetime: '',
            keyWords: '',
            description: '',
            errorTitle: '',
            errorType: '',
            timeStyle: 'select_notVisited',
        })
    };

    generateSelectHours() {
        const startHour = 8;
        const endHour = 19;

        this.state.hours.push(<Option value="0" label="Horaire" key="Horaire"/>);
        for (let i = startHour; i <= endHour; i++) {
            let hourString = i + ":00";
            this.state.hours.push(<Option value={hourString} label={hourString} key={hourString}/>);
            hourString = i + ":30";
            this.state.hours.push(<Option value={hourString} label={hourString} key={hourString}/>);
        }
    };

    diplaySuccessMessage = () => {
        this.success.style.transition = 'initial';
        this.success.style.opacity = 100;
        setTimeout(() => {
            this.success.style.transition = 'opacity 5s ease-in';
            this.success.style.opacity = 0;
        }, 10);
    };

    isFormCorrect = () => {
        let hasError = '';
        if (!this.state.isDateSet) {
            hasError = " une date correcte";
        } else if (!this.state.isTimeSet) {
            hasError = util.formatMessageWithSlash(hasError, " un horaire");
        } else {
            this.setState({
                datetime: util.getDateTime(this.state.date, this.state.time)
            })
        }
        if (this.state.name === '' || this.state.errorTitle !== '') {
            hasError = util.formatMessageWithSlash(hasError, " un nom correct");
        }
        if (this.state.place === '' || this.state.errorPlace !== '') {
            hasError = util.formatMessageWithSlash(hasError, " un lieu correct");
        }

        if (hasError !== '') {
            this.setState({errorType: 'Veuillez entrer :' + hasError});
            return false;
        } else {
            return true;
        }
    };

    onPressSendNewEvent = async () => {
        if (await this.isFormCorrect()) {
            let newEvent = new Event(null, this.state.name, this.state.description, this.state.datetime, this.state.place, this.state.keyWords)
            if (await db.addEvent(newEvent)) {
                this.emptyFields();
                this.diplaySuccessMessage();
            } else {
                alert("Erreur lors de l'envois au serveur.");
            }
        }
    };

    handleTitleChange = (event) => {
        let inputValue = event.target.value;
        this.setState({
            name: inputValue,
            isNameRequired: true
        });
        let isNameValid = util.isNameValid(inputValue);
        if (isNameValid === -2) {
            this.setState({
                errorTitle: 'Le nom doit contenir au moins deux caractères.'
            });
        } else if (!isNameValid) {
            this.setState({
                errorTitle: 'Le nom doit seulement contenir des caractères alphanumériques et ., -, \', ", /, +, *, #, ?, !'
            });
        } else {
            this.setState({
                errorTitle: ''
            });
        }
    };

    handlePlaceChange = (event) => {
        let inputValue = event.target.value;
        this.setState({
            place: inputValue,
            placeRequired: true,
        });
        let isPlaceValid = util.isPlaceValid(inputValue);
        if (isPlaceValid === -2) {
            this.setState({
                errorPlace: 'Le lieu doit contenir au moins deux caractères.'
            });
        } else if (!isPlaceValid) {
            this.setState({
                errorPlace: 'Le lieu doit seulement contenir des caractères alphanumériques, tiret ou apostrophe.'
            });
        } else {
            this.setState({
                errorPlace: ''
            });
        }
    };

    handleInputChange = (event) => {
        const stateName = event.target.name;
        const stateValue = event.target.value;

        this.setState({
            [stateName]: stateValue,
        });
    };

    handleDateChange = (date) => {
        if (date) {
            this.setState({
                datepickerStyle:'datepicker',
                date,
                isDateSet: true,
            });
        } else {
            this.setState({
                datepickerStyle:'datepicker_empty',
                isDateSet: false,
            })
        }
    };

    handleTimeChange = (event) => {
        if (parseInt(event.target.value, 10) === 0) {
            this.setState({
                time: '',
                isTimeSet: false,
                timeStyle: 'select_empty'
            });
        } else {
            this.setState({
                time: event.target.value,
                isTimeSet: true,
                timeStyle: 'select_filled',
            });
        }
    };

    renderNameInput() {
        return (
            <div>
                <Input
                    name="name"
                    label="Nom de l'évènement"
                    className="nameInput"
                    value={this.state.name}
                    floatingLabel={true}
                    onChange={this.handleTitleChange}
                    onClick={this.handleTitleChange}
                    required={this.state.isNameRequired}
                />
                <div className="error errorName">{this.state.errorTitle}</div>
            </div>
        );
    };

    renderDateInput () {
        return (
            <DatePicker
                selected={this.state.date}
                onChange={this.handleDateChange}
                dateFormat={"DD/MM/YYYY"}
                placeholderText="Date"
                todayButton={"Aujourd'hui"}
                minDate={moment()}
                className={this.state.datepickerStyle}
            />
        );
    }

    renderTimeInput() {
        return (
            <select className={this.state.timeStyle} onClick={this.handleTimeChange} onChange={this.handleTimeChange}
                    value={this.state.time}>
                {this.state.hours}
            </select>
        );
    }

    renderPlaceInput() {
        return (
            <div>
                <Row>
                    <Col md="10">
                        <Input
                            name="place"
                            label="Lieu"
                            className="placeInput"
                            value={this.state.place}
                            floatingLabel={true}
                            onChange={this.handlePlaceChange}
                            onClick={this.handlePlaceChange}
                            required={this.state.placeRequired}
                        />
                    </Col>
                    <Col md="2">
                        <div className="placeLogo">
                            <img src={placeLogo} alt="place" style={{width: 26}}/>
                        </div>
                    </Col>
                </Row>
                <div className="error errorPlace">{this.state.errorPlace}</div>
            </div>
        );
    }

    renderDescriptionInput() {
        return (
            <Textarea
                name="description"
                label="Description"
                className="descriptionInput"
                value={this.state.description}
                onChange={this.handleInputChange}
                floatingLabel={true}
            />
        );
    }

    renderKeyWordsInput() {
        return (
            <Textarea
                name="keyWords"
                label="Mots clé"
                className="keyWordsInput"
                value={this.state.keyWords}
                onChange={this.handleInputChange}
                floatingLabel={true}
            />
        );
    }

    render() {
        let nameInput = this.renderNameInput();
        let dateInput = this.renderDateInput();
        let timeInput = this.renderTimeInput();
        let placeInput = this.renderPlaceInput();
        let descriptionInput = this.renderDescriptionInput();
        let ketWordsInput = this.renderKeyWordsInput();
        return (
            <div className="new-event-form">
                <h1>Ajouter Evènement</h1>
                <div className="form">
                    <Container>
                        <Row>
                            {nameInput}
                        </Row>
                        <Row>
                            <Col md="8">
                                {dateInput}
                            </Col>
                            <Col md="4">
                                {timeInput}
                            </Col>
                        </Row>
                        <Row>
                            {placeInput}
                        </Row>
                        <Row>
                            {descriptionInput}
                        </Row>
                        <Row>
                            {ketWordsInput}
                        </Row>
                        <Row>
                            <div className="error errorForm">{this.state.errorType}</div>
                            <div className="success" ref={(success) => {
                                this.success = success;
                            }}>{this.state.successMessage}</div>
                        </Row>
                        <Row>
                            <Button
                                variant="flat"
                                color="primary"
                                onClick={this.onPressSendNewEvent}
                            >
                                Ajouter
                            </Button>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}