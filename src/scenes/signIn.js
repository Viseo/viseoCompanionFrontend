/**
 * Created by LMA3606 on 22/03/2017.
 */

import React, {Component} from 'react';
import {Input, Button, Container, Row} from 'muicss/react'; //https://www.muicss.com/docs/v1/react
import db from '../utils/db';


export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',

        };
    }

    onPressSignIn = async () => {
        this.setState({errorMessage: ''});
        if (!this.state.email || !this.state.password) {
            this.setState({errorMessage: "Veuillez remplir tous les champs."});
        } else {
            this.authenticateUser();
        }
    };

    authenticateUser = async () => {
        try {
            this.setState({email: this.state.email.toLowerCase()});
            let user = await db.authenticateAdmin(this.state.email, this.state.password);
            const unabledToReachServerCode = -1;
            if (user === unabledToReachServerCode) {
                this.setState({errorMessage: "Impossible de joindre le serveur, veuillez réessayer plus tard ou vérifiez votre connexion internet."});
            } else if (user) {
                this.props.history.push('/home')
            } else {
                this.setState({errorMessage: "Les informations fournies sont incorrectes."});
            }
        } catch (error) {
            console.warn('signIn::authenticateUser ' + error);
            this.setState({errorMessage: "Impossible de joindre le serveur, veuillez réessayer plus tard ou vérifiez votre connexion internet."});
        }
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
        });
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    render(){
        return (
            <div className="connexionPage" style={style.form}>
                <h1>Connexion administrateur</h1>
                <Container style={style.container}>
                    <Row>
                        <Input
                            name="email"
                            label="Email"
                            className="emailInput"
                            type="email"
                            value={this.state.email}
                            floatingLabel={true}
                            onChange={this.handleEmailChange}
                        />
                    </Row>
                    <Row>
                        <Input
                            name="password"
                            label="Password"
                            className="passwordInput"
                            type="password"
                            value={this.state.password}
                            floatingLabel={true}
                            onChange={this.handlePasswordChange}
                        />
                    </Row>
                    <Row>
                        <div className="error" style={style.error}>{this.state.errorMessage}</div>
                    </Row>
                    <Row>
                        <Button
                            variant="flat"
                            color="primary"
                            className="submitButton"
                            onClick={this.onPressSignIn}
                        >
                            Connexion
                        </Button>
                    </Row>
                </Container>
            </div>
        );
    }
}

const style = {
    form: {
        marginTop: 20,
        width: 400,
        height: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    error: {
        marginBottom: 8,
        background: 'rgba(255, 24, 24, 0.11)',
        color: 'red',
        borderRadius: 10,
        fontSize: 13,
    },
    container: {
        marginTop:30,
    }
};