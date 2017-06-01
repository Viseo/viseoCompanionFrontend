import React, {Component} from 'react'
import {Button, Input} from "muicss/react";
import settings from "../config/settings";

export default class ResetPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            passwordError: '',
            passwordCheck: '',
            passwordCheckError: '',
            submitError: '',
            isChanged: false,
        }
    }

    render() {
        const {id, token} = this.getUrlParams()
        const passwordInput = this.renderPasswordInput()
        const passwordCheckInput = this.renderPasswordCheckInput()
        const submitButton = this.renderSubmitButton()
        const passwordWasChangedMessage = this.renderPasswordWasChangedMessage()
        return (
            <div>
                <h1>Réinitialisation de mot de passe</h1>
                {this.state.isChanged ?
                    <div style={{margin: 'auto', width: 300}}>
                        {passwordWasChangedMessage}
                    </div> :
                    <div style={{margin: 'auto', width: 300}}>
                        {passwordInput}
                        {passwordCheckInput}
                        {submitButton}
                    </div>
                }
            </div>
        )
    }

    renderPasswordInput() {
        const {password, passwordError} = this.state
        return (
            <div>
                <Input
                    name="password"
                    label="Nouveau mot de passe"
                    className="nameInput"
                    value={password}
                    floatingLabel={true}
                    onChange={this.onPasswordChange}
                    onClick={this.onPasswordChange}
                    required={true}
                />
                <div className="error errorLocation">{passwordError}</div>
            </div>
        )
    }

    renderPasswordCheckInput() {
        const {passwordCheck, passwordCheckError} = this.state
        return (
            <div>
                <Input
                    name="password"
                    label="Vérifiez le mot de passe"
                    className="nameInput"
                    value={passwordCheck}
                    floatingLabel={true}
                    onChange={this.onPasswordCheckChange}
                    onClick={this.onPasswordCheckChange}
                    required={true}
                />
                <div className="error errorLocation">{passwordCheckError}</div>
            </div>
        )
    }

    renderSubmitButton() {
        return (
            <div>
                <div className="error errorForm">{this.state.submitError}</div>
                <Button
                    variant="flat"
                    color="primary"
                    className="submitButton"
                    onClick={this.onSubmitChangePassword}
                >
                    Changer mon mot de passe
                </Button>
            </div>
        )
    }

    renderPasswordWasChangedMessage() {
        return (
            <div
                className="success"
                style={{
                    marginBottom: 8,
                    background: 'rgba(47, 255, 30, 0.11)',
                    color: '#1f5618=',
                    borderRadius: 10,
                    fontSize: 18
                }}
            >
                Mot de passe changé avec succès!
            </div>
        )
    }

    changePassword = async (id, password, token) => {
        try {
            let response = await fetch(settings.api.changePassword, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: id,
                    password,
                    tokenGuid: token
                })
            });
            let didChangePassword = await response.json()
            return didChangePassword
        } catch (error) {
            console.warn('ResetPassword::changePassword ' + error)
        }
    }

    doPasswordsMatch(password, passwordCheck) {
        return password === passwordCheck
    }

    getUrlParams() {
        let url = this.props.location.search
        let params = url.slice(url.indexOf('?') + 1)
        let paramList = params.split('&')
        return paramList.map(param => {
            let keyValue = param.split('=')
            let key = '' + keyValue[0]
            let value = '' + keyValue[1]
            return [key, value]
        }).reduce((obj, value) => {
                obj[value[0]] = value[1]
                return obj
            },
            {})
    }

    isPasswordValid(password) {
        return password.length >= 6
    }

    onPasswordChange = (event) => {
        let password = event.target.value
        let passwordError = this.isPasswordValid(password) ?
            '' :
            'Le mot de passe doit contenir au moins 6 caractères'
        this.setState({
            password,
            passwordError
        })
    }

    onPasswordCheckChange = (event) => {
        let {password} = this.state
        let passwordCheck = event.target.value
        let passwordCheckError = this.doPasswordsMatch(password, passwordCheck) ?
            '' :
            "Vous n'avez pas saisi le même mot de passe"
        this.setState({
            passwordCheck,
            passwordCheckError
        })
    }

    onSubmitChangePassword = async () => {
        let {password, passwordCheck} = this.state
        if (this.isPasswordValid(password)
            && this.doPasswordsMatch(password, passwordCheck)) {
            const {id, token} = this.getUrlParams()
            let didChangePassword = await this.changePassword(id, password, token)
            if (!didChangePassword) {
                this.setState({
                    submitError: "Le lien utilisé n'est plus valide"
                })
            } else {
                this.setState({
                    isChanged: true
                })
            }
        } else {
            this.setState({
                submitError: 'Les champs ne sont pas correctement remplis'
            })
        }
    }
}
