/**
 * Created by MBE3664 on 13/06/2017.
 */

import React, {Component} from 'react';
import {Button, Input, Row} from 'muicss/react';
import Modal from 'react-modal';

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props.history.location.state,
            modalVisible: false,
        };
    }

    render() {
        return (
            <div className="user-profile-form" style={{textAlign: 'center'}}>
                <h1>Détails du profil</h1>
                <div className="form" style={{width: 200, textAlign: 'left', marginHorizontal: 'auto'}}>
                    <Row>{this.renderUserFirstName()}</Row>
                    <Row>{this.renderUserLastName()}</Row>
                    <Row>{this.renderUserMail()}</Row>
                    <Row>{this.renderBirthday()}</Row>
                    {/*<Row>{this.renderFormButtons()}</Row>*/}
                </div>

            </div>
        );
    }

    renderUserFirstName() {
        return (
            <Input
                name="firstName"
                label="Prénom"
                className="firstNameInput"
                value={this.state.firstName}
                floatingLabel={true}
                onChange={(firstName) => this.setState({firstName})}
                onClick={''}
                required={''}
            />
        );
    }

    renderUserLastName() {
        return (
            <Input
                name="lastName"
                label="Nom"
                className="lastNameInput"
                value={this.state.lastName}
                floatingLabel={true}
                onChange={(lastName) => this.setState({lastName})}
            />
        );
    }

    renderUserMail() {
        return (
            <Input
                type="email"
                name="mail"
                label="Adresse e-mail"
                className="mailInput"
                value={this.state.email}
                floatingLabel={true}
                onChange={(email) => this.setState({email})}
            />
        );
    }

    renderBirthday() {
        const birthdayDefined = this.state.birthday || false;
        return (
            <Input
                type={birthdayDefined ? 'date' : ''}
                name="birthday"
                label="Date de naissance"
                className="birthDayInput"
                value={this.state.birthday}
                floatingLabel={true}
                onChange={(birthday) => this._handleDateChange(birthday)}
            />
        );
    }

    renderFormButtons() {
        return (
            <div>
                <Button
                    variant="flat"
                    color="primary"
                    className="submitButton"
                    onClick={''}
                >
                    Modifier
                </Button>
                <Button
                    variant="flat"
                    color="danger"
                    className="deleteButton"
                    onClick={this.onPressSendDeleteUser}
                >
                    Supprimer
                </Button>
            </div>
        );
    }

    renderModal() {
        return (
            <Modal
                isOpen={this.state.modalVisible}
                closeTimeoutMS={20}
                style={modalStyle}
                contentLabel="Modal"
            >
                <p>Etes-vous sûr(e) de vouloir supprimer?</p>
                <div>
                    <div style={{display: 'inline-block'}}>
                        <Button
                            variant="flat"
                            color="primary"
                            onClick={() => {
                                this.setState({
                                    modalVisible: false,
                                });
                            }}
                        >
                            Annuler
                        </Button>
                    </div>
                    <div style={{display: 'inline-block'}}>
                        <Button
                            variant="flat"
                            color="danger"
                            onClick={''}
                        >
                            Confirmer
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }

    onPressSendDeleteUser = async () => {

        this.setState({modalVisible: true});
    };

    _handleDateChange(event) {
        this.setState({birthday: event.target.value});
    }
}
UserProfile.defaultProps = {
    birthday: '2016-01-01',
};
const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        border: '1px solid #ccc',
        background: '#fff',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
    },
};
