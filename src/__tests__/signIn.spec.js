/**
 * Created by LMA3606 on 22/03/2017.
 */

import testUtil from './testUtil';

import React, {Component} from 'react';
import SignIn from '../scenes/signIn';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { browserHistory } from 'react-router';

describe('In the signIn event page the user', () => {
    const signIn = testUtil.createSignIn();

    it('should be able to type a email and password', () => {
        testUtil.checkIfClassExist(signIn, 'emailInput');
        testUtil.checkIfClassExist(signIn, 'passwordInput');
    });
    it('should see an error when all the field are not fielded', () => {
        testUtil.simulateTextInput(signIn, 'emailInput', 'leo.maisonneuve@erreur.com');
        testUtil.simulateClickOnButton(signIn, "submitButton");
        testUtil.checkDivContent(signIn, 'error', 'Veuillez remplir tous les champs.');
    });
    it('should see an error when the credential are not correct', async () => {
        testUtil.simulateTextInput(signIn, 'emailInput', 'leo.maisonneuve@erreur.com');
        testUtil.simulateTextInput(signIn, 'passwordInput', 'tatata');

        testUtil.simulateClickOnButton(signIn, "submitButton");
        testUtil.checkDivContent(signIn, 'error', 'Les informations fournies sont incorrectes.');
    });
    it('should be able to connect when the credentials are correct', () => {

        testUtil.simulateTextInput(signIn, 'emailInput', 'test@gmail.com');
        testUtil.simulateTextInput(signIn, 'passwordInput', 'tatata');

        sinon.spy(browserHistory, 'push');

        testUtil.simulateClickOnButton(signIn, "submitButton");

        expect(browserHistory.push).to.have.been.called;
    });
});