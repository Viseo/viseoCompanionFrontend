/**
 * Created by LMA3606 on 09/03/2017.
 */
import testUtil from './testUtil';

describe('In the Add event page the user', () => {
    const addEvent = testUtil.createAddEvent();
    it('should see the title', () => {
        testUtil.checkTitleContent(addEvent, "h1", "Ajouter Evènement");
    });
    it('should be able to type a event name, location, description and Keyword', () => {
        testUtil.checkIfClassExist(addEvent, 'nameInput');
        testUtil.checkIfClassExist(addEvent, 'locationInput');
        testUtil.checkIfClassExist(addEvent, 'descriptionInput');
        testUtil.checkIfClassExist(addEvent, 'keyWordsInput');
    });
    it('should not be able to type a name smaller then 2 letters', () => {
        testUtil.simulateTextInput(addEvent, 'nameInput', 'b');
        testUtil.checkDivContent(addEvent, 'errorName', 'Le nom doit contenir entre 2 et 30 caractères.');
    });
    it('should not be able to type a name with forbidden character', () => {
        testUtil.simulateTextInput(addEvent, 'nameInput', '%%%%');
        testUtil.checkDivContent(addEvent, 'errorName', 'Le nom doit seulement contenir des caractères alphanumériques et ., -, \', ", /, +, *, #, ?, !');
    });
    it('should not be able to type a location with forbidden character', () => {
        testUtil.simulateTextInput(addEvent, 'locationInput', '%%%%');
        testUtil.checkDivContent(addEvent, 'errorLocation', 'Le lieu doit seulement contenir des caractères alphanumériques, tiret ou apostrophe.');
    });
    it('should not be able to type a location smaller then 2 letters', () => {
        testUtil.simulateTextInput(addEvent, 'locationInput', 'b');
        testUtil.checkDivContent(addEvent, 'errorLocation', 'Le lieu doit contenir au moins deux caractères.');
    });
    it('should not be able to not type a date', () => {
        testUtil.simulateDateInput(addEvent, 'datepicker', '');
        testUtil.checkIfClassExist(addEvent, 'datepicker_empty');
    });
    it('should not be able to not type a time', () => {
        testUtil.simulateTextInput(addEvent, 'select_notVisited', 0);
        testUtil.checkIfClassExist(addEvent, 'select_empty');
    });
    it('should be able to see what is missing', () => {
        testUtil.simulateTextInput(addEvent, 'locationInput', 'At my place');
        testUtil.simulateClickOnButton(addEvent, "submitButton");
        testUtil.checkDivContent(addEvent, 'success', 'Evènement ajouté !');
        testUtil.checkDivContent(addEvent, 'errorForm', 'Veuillez entrer : un nom correct / une date correcte / un horaire');

    });
    it('should be able to add the new event', () => {
        testUtil.simulateTextInput(addEvent, 'locationInput', 'At my place');
        testUtil.simulateTextInput(addEvent, 'nameInput', 'Let\'s party !');
        testUtil.simulateTextInput(addEvent, 'datepicker_empty', '25/03/2017');
        testUtil.simulateTextInput(addEvent, 'select_empty', '8:00');
        testUtil.simulateClickOnButton(addEvent, "submitButton");
        testUtil.checkDivContent(addEvent, 'success', 'Evènement ajouté !');
    });
});