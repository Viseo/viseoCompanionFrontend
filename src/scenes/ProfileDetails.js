/**
 * Created by MBE3664 on 13/06/2017.
 */

import React, {Component} from 'react';
import {Button, Col, Input, Row} from "muicss/react";
import Modal from 'react-modal';
import db from '../utils/db';

export default class ProfileDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="profile-details-form">
                <h1>Détails du profil</h1>
                <div className="form" style={{width: '100%'}}>
                    <Row>{this.renderUserFirstName()}</Row>
                    <Row>{this.renderUserLastName()}</Row>
                    <Row>{this.renderUserMail()}</Row>
                </div>
            </div>
        );
    }

    renderUserFirstName() {
        return (
            <div>
                <Row>
                    <Col md="11" style={{textAlign: 'left'}}>
                        <Input
                            name="firstName"
                            label="Prénom"
                            className="firstNameInput"
                            value={""}
                            floatingLabel={true}
                            onChange={""}
                            onClick={""}
                            required={""}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    renderUserLastName() {
        return (
            <div>
                <Row>
                    <Col md="11" style={{textAlign: 'left'}}>
                        <Input
                            name="lastName"
                            label="Nom"
                            className="lastNameInput"
                            value={""}
                            floatingLabel={true}
                            onChange={""}
                            onClick={""}
                            required={""}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    renderUserMail() {
        return (
            <div>
                <Row>
                    <Col md="11" style={{textAlign: 'left'}}>
                        <Input
                            name="mail"
                            label="Adresse e-mail"
                            className="mailInput"
                            value={""}
                            floatingLabel={true}
                            onChange={""}
                            onClick={""}
                            required={""}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}