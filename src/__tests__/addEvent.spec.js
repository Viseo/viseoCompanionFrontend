/**
 * Created by LMA3606 on 09/03/2017.
 */
import testUtil from './testUtil';

describe('In the Add event page the user', () => {
    const addEvent = testUtil.createAddEvent();
    it('should see the title', () => {
        testUtil.checkFieldContent(addEvent, "h1", "Ajouter Evènement");
    });
    it('should type a event name, place, description and Keyword', () => {
        testUtil.checkIfInputExist(addEvent, 'nameInput');
        testUtil.checkIfInputExist(addEvent, 'placeInput');
        testUtil.checkIfInputExist(addEvent, 'descriptionInput');
        testUtil.checkIfInputExist(addEvent, 'keyWordsInput');
    })
});