/**
 * Created by LMA3606 on 09/03/2017.
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
import testUtil from './testUtil';

describe('Add event page', () => {
    it('should have a title', () => {
        // const component = renderIntoDocument(
        //     <AddEvent/>
        // );
        // testUtil.checkFieldContent(component, 'h1', "Ajouter Evènement");

        const checkbox = shallow(
            <AddEvent />
        );

        expect(checkbox.text()).to.equal('Off');

    })
})