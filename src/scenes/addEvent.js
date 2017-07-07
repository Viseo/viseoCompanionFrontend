import React, {Component} from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import locationLogo from "../images/locationLogo.png";
import "./addEvent.css";
import "react-datepicker/dist/react-datepicker.css";
import Event from "../utils/event";
import db from "../utils/db";
import * as util from "../utils/util";
import HorizontalToggleBar from "../components/horizontalToggleBar";
import categories from "../utils/eventCategories";
import {Input, Textarea, Button, Option, Container, Row, Col} from "muicss/react"; //https://www.muicss.com/docs/v1/react
import FileUpload  from "react-fileupload";
import FaDownload from "react-icons/lib/fa/download";
import  PlacesAutocomplete from "react-places-autocomplete";
import geocoding from "reverse-geocoding";
export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            errorName: "",
            isNameRequired: true,
            errorLocation: "",
            isLocationRequired: false,
            hours: [],
            time: "",
            isTimeSet: "",
            timeStyle: "select_notVisited",
            date: this.getDateFromCalendar(),
            isDateSet: true,
            datepickerStyle: "datepicker",
            datetime: "",
            keyWords: "",
            description: "",
            errorType: "",
            categoryId: "",
            imageName: "",
            imageFile: null,
            coords: {},
            location: "",
        };


        this.generateSelectHours();

    }

    onChange = (address) => {
        this.setState({address});
        this.handleLocationChange({address});
    };
    getDateFromCalendar() {
        let datePickedFromCalendar = this.props.location.state ? this.props.location.state.date : null;
        return datePickedFromCalendar ?
            moment(datePickedFromCalendar) :
            null;
    }

    componentWillMount() {
        this._setLatLng();

    }

    _setLatLng = async () => {
        const geolocation = navigator.geolocation;
        this.getLocation(geolocation)
            .then(({coords}) => {
                this.setState({
                    coords: coords,
                });
                this.getUserLocation(coords);
            });
    };

    emptyFields = () => {
        this.setState({
            name: "",
            isNameRequired: false,
            location: "",
            isLocationRequired: false,
            errorLocation: "",
            time: "",
            isTimeSet: "",
            date: "",
            isDateSet: "",
            datetime: "",
            keyWords: "",
            description: "",
            errorName: "",
            errorType: "",
            timeStyle: "select_notVisited",
        });
    };

    generateSelectHours() {
        const startHour = 8;
        const endHour = 19;

        this.state.hours.push(<Option value="0" label="Horaire" key="Horaire"/>);
        for (let i = startHour; i <= endHour; i++) {

            let hourString = i + ":00";
            this.state.hours.push(<Option value={hourString}
                                          label={hourString} key={hourString}/>);
            hourString = i + ":30";
            this.state.hours.push(<Option value={hourString}
                                          label={hourString} key={hourString}/>);
        }
    };

    displaySuccessMessage = () => {
        this.success.style.transition = "initial";
        this.success.style.opacity = 100;
        setTimeout(() => {
            this.success.style.transition = "opacity 5s ease-in";
            this.success.style.opacity = 0;
        }, 10);
    };

    isFormCorrect = () => {
        let hasError = "";
        if (this.state.name === "" || this.state.errorName !== "") {
            hasError = " un nom correct";
        }
        if (!this.state.isDateSet) {
            hasError = util.formatMessageWithSlash(hasError, " une date correcte");
        }
        if (!this.state.isTimeSet) {
            hasError = util.formatMessageWithSlash(hasError, " un horaire");
        }
        if (this.state.location === "" || this.state.errorLocation !== "") {
            hasError = util.formatMessageWithSlash(hasError, " un lieu correct");
        }

        if (hasError !== "") {
            this.setState({errorType: "Veuillez entrer :" + hasError});
            return false;
        } else {
            this.setState({
                datetime: util.getDateTime(this.state.date, this.state.time),
            });
            return true;
        }
    };

    onPressSendNewEvent = async () => {
        if (await this.isFormCorrect()) {
            let newEvent = new Event(null,
                this.state.name,
                this.state.description,
                this.state.datetime,
                this.state.location,
                this.state.keyWords,
                this.state.categoryId);
            if (await db.addEvent(newEvent, this.state.imageFile)) {
                this.emptyFields();
                this.displaySuccessMessage();
                this.props.history.push("/home");
            } else {
                this.setState({errorType: "Erreur lors de l'envois au serveur."});
            }
        }
    };

    handleNameChange = (event) => {
        let inputValue = event.target.value;
        if (inputValue.length <= 30) {
            this.setState({
                name: inputValue,
                isNameRequired: true,
            });
        }
        let isNameValid = util.isNameValid(inputValue);
        if (isNameValid === -2) {
            this.setState({
                errorName: "Le nom doit contenir entre 2 et 30 caractères.",
            });
        } else if (!isNameValid) {
            this.setState({
                errorName: "Le nom doit seulement contenir des caractères alphanumériques et ., -, ', \", /, +, *, #, ?, !",
            });
        } else {
            this.setState({
                errorName: "",
            });
        }
    };

    handleLocationChange = (location) => {
        let inputValue = location;
        this.setState({
            location: inputValue,
            isLocationRequired: true,
        });
        let isLocationValid = util.isLocationValid(inputValue);
        if (isLocationValid === -2) {
            this.setState({
                errorLocation: "Le lieu doit contenir au moins deux caractères.",
            });
        } else {
            this.setState({
                errorLocation: "",
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
                datepickerStyle: "datepicker",
                date,
                isDateSet: true,
            });
        } else {
            this.setState({
                datepickerStyle: "datepicker_empty",
                isDateSet: false,
            });
        }
    };

    handleTimeChange = (event) => {
        if (parseInt(event.target.value, 10) === 0) {
            this.setState({
                time: "",
                isTimeSet: false,
                timeStyle: "select_empty",
            });
        } else {
            this.setState({
                time: event.target.value,
                isTimeSet: true,
                timeStyle: "select_filled",
            });
        }
    };

    renderNameInput() {
        const limit = 30;
        let remainder = limit - this.state.name.length;
        let remainderColor = remainder > 5 ? "blue" : "red";
        return (
            <div>
                <Row>
                    <Col md="11">
                        <Input
                            name="name"
                            label="Nom de l'évènement"
                            className="nameInput"
                            value={this.state.name}
                            floatingLabel={true}
                            onChange={this.handleNameChange}
                            onClick={this.handleNameChange}
                            required={this.state.isNameRequired}
                        />
                    </Col>
                    <Col md="1">
                        <div className="remainingLetters" style={{color: remainderColor}}>
                            {remainder}
                        </div>
                    </Col>
                </Row>
                <div className="error errorName">{this.state.errorName}</div>
            </div>
        );
    };

    renderLocationInput() {


        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,

        };
        return (
            <div>
                <Row>
                    <Col md="10" style={{marginTop: 15}}>
                        <form>
                            <PlacesAutocomplete
                                inputProps={inputProps}
                                required={this.state.isLocationRequired}/>
                        </form>


                    </Col>
                    <Col md="2">
                        <div className="locationLogo">
                            <img src={locationLogo} alt="location" style={{width: 26}}/>
                        </div>
                    </Col>
                </Row>
                <div className="error errorLocation">{this.state.errorLocation}</div>
            </div>
        );
    }

    getLocation = async (geolocation) => {
        return new Promise((resolve, reject) => {
            if (!geolocation) {
                reject(new Error("Not Supported"));
            }

            geolocation.getCurrentPosition((position) => {
                resolve(position);

            }, () => {
                reject(new Error("Permission denied"));
            });
        });
    };

    getUserLocation(coords){
        const {latitude, longitude} = coords;

        if (latitude && longitude) {
            let config = {
                "latitude": parseFloat(latitude),
                "longitude": parseFloat(longitude),
            };

            geocoding.location(config, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    this.setState({
                        address: data.results[0].formatted_address,
                    });
                    console.log(this.state.address);
                }
            });
        }
    }

    renderDateInput() {
        const prefilledDate = this.state.date ?
            moment(this.state.date) :
            "";
        return (
            <DatePicker
                selected={prefilledDate}
                onChange={this.handleDateChange}
                dateFormat={"DD/MM/YYYY"}
                placeholderText="Date"
                todayButton={"Aujourd'hui"}
                minDate={"19/01/1993"}
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

    renderCategoryInput() {
        let names = categories.eventCategories;
        let colors = [categories.eventCategoriesColors[names[0]],
            categories.eventCategoriesColors[names[1]],
            categories.eventCategoriesColors[names[2]]];
        return (
            <HorizontalToggleBar items={names} colors={colors} onCategorySelected={this.onCategorySelected}/>
        );
    }

    onCategorySelected = (categoryName) => {
        let categoryId = categories.eventCategories.indexOf(categoryName);
        this.setState({categoryId: categoryId});
    };

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

    renderImageUpload() {

        const options = {
            baseUrl: "/add",
            accept: "image/*",
            numberLimit: 1,
            chooseAndUpload: false,
            chooseFile: (files) => {
                this.setState({
                    imageName: files[0].name,
                    imageFile: files[0],
                });

            },

        };

        return (
            <FileUpload
                options={options}
                ref="fileUpload"
            >
                <p>{this.state.imageName}</p>
                <div ref="chooseBtn">
                    <FaDownload />
                    <span> Ajouter une image</span>
                </div>
            </FileUpload>

        );
    }

    render() {
        let nameInput = this.renderNameInput();
        let dateInput = this.renderDateInput();
        let timeInput = this.renderTimeInput();
        let locationInput = this.renderLocationInput();
        let descriptionInput = this.renderDescriptionInput();
        let categoryInput = this.renderCategoryInput();
        let ketWordsInput = this.renderKeyWordsInput();
        let imageUpload = this.renderImageUpload();
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
                            {locationInput}
                        </Row>
                        <Row>
                            {descriptionInput}
                        </Row>
                        <Row style={{justifyContent: "center", marginLeft: 0}}>
                            {categoryInput}
                        </Row>
                        <Row>
                            {ketWordsInput}
                        </Row>
                        <Row>
                            {imageUpload}
                        </Row>
                        <Row>
                            <div className="error errorForm">{this.state.errorType}</div>
                            <div
                                className="success"
                                ref={(success) => {
                                    this.success = success;
                                }}
                            >Evènement ajouté !
                            </div>
                        </Row>
                        <Row>
                            <Button
                                variant="flat"
                                color="primary"
                                className="submitButton"
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
};