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

function checkFieldContent(component, fieldName, filedValue) {
    expect(component.find(fieldName).text()).to.equal(filedValue);
}

function checkIfInputExist(component, inputClassName) {
    expect(component.find('.' + inputClassName).exists()).to.equal(true);
}

function createAddEvent(){
    return shallow(<AddEvent />);
}

const testUtil = {
    checkFieldContent,
    createAddEvent,
    checkIfInputExist
};

export default testUtil;
