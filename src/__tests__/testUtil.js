/**
 * Created by LMA3606 on 10/03/2017.
 */
import {
    renderIntoDocument,
    findRenderedDOMComponentWithTag,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils';

function checkFieldContent(component, fieldName, filedValue) {
    const title = findRenderedDOMComponentWithTag(component, fieldName);
    return expect(title).to.equal(filedValue);
}

const testUtil = {
    checkFieldContent
};

export default testUtil;
