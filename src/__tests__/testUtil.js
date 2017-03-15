/**
 * Created by LMA3606 on 10/03/2017.
 */
import React from 'react';
import {
    renderIntoDocument,
    findRenderedDOMComponentWithTag,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils';
import {shallow} from 'enzyme';

import AddEvent from '../scenes/addEvent';

function checkTitleContent(component, titleName, filedValue) {
    expect(component.find(titleName).text()).to.equal(filedValue);
}

function checkIfClassExist(component, className) {
    expect(component.find('.' + className).exists()).to.equal(true);
}

function checkDivContent(component, divClassName, contentValue) {
    expect(component.find('.' + divClassName).props().children).to.equal(contentValue);
}

function simulateTextInput(component, inputClassName, textValue){
    component.find('.' + inputClassName).simulate('change', { target: {value: textValue} });
}

function simulateDateInput(component, dateInputClassName, dateValue){
    component.find('.' + dateInputClassName).simulate('change', dateValue);
}

function simulateClickOnButton(component, buttonClassName){
    component.find('.' + buttonClassName).simulate('click');
}

function createAddEvent(){
    return shallow(<AddEvent />);
}

const testUtil = {
    checkTitleContent,
    createAddEvent,
    checkIfClassExist,
    simulateTextInput,
    simulateDateInput,
    checkDivContent,
    simulateClickOnButton,
};

export default testUtil;
