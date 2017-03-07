/**
 * Created by LMA3606 on 16/02/2017.
 */

import React, {Component} from 'react';
import {Input, Textarea, Button, Select, Option, Container, Row, Col} from 'muicss/react'; //https://www.muicss.com/docs/v1/react
import DatePicker from 'react-datepicker';
import moment from 'moment';
import localisationLogo from '../images/localisation.png';
import './addEvent.css';
import 'react-datepicker/dist/react-datepicker.css';
import settings from '../config/settings'

export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            place: '',
            errorPlace:'',
            hours:[],
            time: '',
            isTimeSet:'',
            date: '',
            isDateSet: '',
            datetime: '',
            keyWords: '',
            description: '',
            errorTitle:'',
            errorType:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this);
        this.onPressSendNewEvent = this.onPressSendNewEvent.bind(this);
        this.isFormCorrect = this.isFormCorrect.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);

        this.generateHours();
    }

    emptyFields(){
        this.setState({
            name: '',
            place: '',
            errorPlace:'',
            hours:[],
            time: '',
            isTimeSet:'',
            date: '',
            isDateSet: '',
            datetime: '',
            keyWords: '',
            description: '',
            errorTitle:'',
            errorType:''
        })
    }

    handleTitleChange(event) {
        let value = event.target.value;
        const regexTitle =/^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\s\-,'?!"/+*#]*$/;

        this.setState({
            name:value
        });

        if(value.length < 2 ) {
            this.setState({
                errorTitle:'Le nom doit contenir au moins deux caractères.'
            });
        }else if(!regexTitle.test(value)){
            this.setState({
            errorTitle:'Le nom doit seulement contenir des caractères alphanumériques et ., -, \', ", /, +, *, #, ?, !'
            });
        }else {
            this.setState({
                errorTitle:''
            });
        }
    }

    handlePlaceChange(event) {
        let value = event.target.value;
        const regexPlace =/^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s\-']*$/;

        this.setState({
            place:value
        });

        if(value.length < 2 ) {
            this.setState({
                errorPlace:'Le lieu doit contenir au moins deux caractères.'
            });
        }else if(!regexPlace.test(value)){
            this.setState({
                errorPlace:'Le lieu doit seulement contenir des caractères alphanumériques, tiret ou apostrophe.'
            });
        }else {
            this.setState({
                errorPlace:''
            });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value,
        });
    }

    handleDateChange(date) {
        this.setState({
            date: date,
            isDateSet:true
        });
    }

    handleTimeChange(event) {
        if(parseInt(event.target.value, 10) === 0){
            this.setState({
                isTimeSet: false
            });
        }else {
            this.setState({
                time: event.target.value,
                isTimeSet: true
            });
        }
    }

    isFormCorrect() {
        let hasError = '';
        if (!this.state.isDateSet) {
            hasError = " une date";
        }else if (!this.state.isTimeSet) {
            hasError = this.formatMessage(hasError, " un horaire");
        } else {
            let timeUnix = (this.state.time.split(":")[0]*3600 + this.state.time.split(":")[1]*60)*1000;
            this.setState({
                datetime: this.state.date.valueOf() + timeUnix
            })
        }
        if (this.state.name === '' || this.state.errorTitle !== '') {
            hasError = this.formatMessage(hasError, " un nom correct");
        }
        if (this.state.place === '' || this.state.errorPlace !== '') {
            hasError = this.formatMessage(hasError, " un lieu correct");
        }

        if (hasError !== '') {
            this.setState({errorType: 'Veuillez entrer :' + hasError});
            return false;
        } else {
            return true;
        }
    }

    async onPressSendNewEvent(){
        if(await this.isFormCorrect()){
            if(await this.addEvent(
                    this.state.name,
                    this.state.datetime,
                    this.state.keyWords,
                    this.state.place,
                    this.state.description
                )) {
                //window.location.reload();
                //todo diplay message during 5 second + handle the red soulignage qui reste quand on vide les champs
                this.emptyFields();
                alert("Evènement ajouté.");
            } else {
                alert("Erreur lors de l'envois au serveur.");
            }
        }
    }

    async addEvent(name, datetime, keyWords, place, description){
        try{
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
            response = await response.status;

            if(response === 200)
                return true;
        } catch (error){
            console.warn(error);
        }
    }

    formatMessage(string1, string2) {
        if(string1.length !== 0){
            string1 += " /" + string2;
            return string1
        } else {
            return string2;
        }
    }

    generateHours(){
        const startHour = 8;
        const endHour = 19;

        this.state.hours.push(<Option value="0" label="Horaire" key="Horaire" />);
        for(let i = startHour; i <= endHour; i++) {
            let hourString = i + ":00";
            this.state.hours.push(<Option value={hourString} label={hourString} key={hourString}/>);
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
                                onChange={this.handleTitleChange}
                                required={true}
                            />
                        </Row>
                            <div className="error">{this.state.errorTitle}</div>
                        <Row>
                            <Col md="8">
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.handleDateChange}
                                    dateFormat={"DD/MM/YYYY"}
                                    placeholderText="Date"
                                    todayButton={"Aujourd'hui"}
                                    minDate={moment()}
                                />
                            </Col>
                            <Col md="4">
                                <Select onChange={this.handleTimeChange} id="time" >
                                    {this.state.hours}
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="10">
                                <Input
                                    name="place"
                                    label="Lieu"
                                    value={this.state.place}
                                    floatingLabel={true}
                                    onChange={this.handlePlaceChange}
                                    required={true}
                                />
                            </Col>
                            <Col md="2">
                                <div className="localisationLogo">
                                    <img src={localisationLogo} alt="Localisation" style={{width:26}}/>

                                </div>
                            </Col>
                        </Row>
                            <div className="error">{this.state.errorPlace}</div>
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
                                name="keyWords"
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