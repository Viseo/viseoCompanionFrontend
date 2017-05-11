import React, {Component} from 'react'
import {Button, Input} from "muicss/react";

export default class ResetPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            passwordError: '',
            passwordCheck: '',
            passwordCheckError: '',
            submitError:''
        }
    }

    render() {
        const {id, token} = this.getUrlParams()
        const passwordInput = this.renderPasswordInput()
        const passwordCheckInput = this.renderPasswordCheckInput()
        const submitButton = this.renderSubmitButton()
        return (
            <div>
                <p>Reset ton pass bro!</p>
                <p>{id + '  ' + token}</p>

                <div style={{margin: 'auto', width: 300}}>
                    {passwordInput}
                    {passwordCheckInput}
                    {submitButton}
                </div>
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
            'Les deux mots de passe ne correspondent pas'
        this.setState({
            passwordCheck,
            passwordCheckError
        })
    }

    onSubmitChangePassword = () => {
        let {password, passwordCheck} = this.state
        if(this.isPasswordValid(password)
            && this.doPasswordsMatch(passwordCheck)) {

        } else {
            this.setState({
                submitError: 'Les champs ne sont pas correctement remplis'
            })
        }
    }
}