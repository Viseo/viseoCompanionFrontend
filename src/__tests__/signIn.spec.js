/**
 * Created by LMA3606 on 22/03/2017.
 */

import testUtil from './testUtil';

describe('In the signIn event page the user', () => {
    const signIn = testUtil.createSignIn();

    it('should be able to type a email and password', () => {
        testUtil.checkIfClassExist(signIn, 'emailInput');
        testUtil.checkIfClassExist(signIn, 'passwordInput');
    });
    it('should see an error when the credential are not correct', () => {
        testUtil.simulateTextInput(signIn, 'emailInput', 'leo.maisonneuve@erreur.com');
        testUtil.simulateTextInput(signIn, 'passwordInput', 'tatata');

        testUtil.simulateClickOnButton(signIn, "submitButton");
        testUtil.checkDivContent(signIn, 'error', 'Email ou mot de passe incorrect');
    });
    it('should be able to connect when the credentials are correct', () => {
        testUtil.simulateTextInput(signIn, 'emailInput', 'leo.maisonneuve@gmail.com');
        testUtil.simulateTextInput(signIn, 'passwordInput', 'tatata');

        testUtil.simulateClickOnButton(signIn, "submitButton");
        testUtil.checkDivContent(signIn, 'success', 'Evènement ajouté !');
    });
});