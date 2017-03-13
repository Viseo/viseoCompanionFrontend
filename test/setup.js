require('babel-polyfill');
require('isomorphic-fetch');

import jsdom from 'jsdom';
import chai from 'chai';

const doc = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;
global.expect = chai.expect;

Object.keys(window).forEach((key) => {
    if(!(key in global)) {
        global[key] = window[key];
    }
});


//for image issue
const m = require('module');
const originalLoader = m._load;
m._load = function hookedLoader(request, parent, isMain) {
    if (request.match(/.jpeg|.jpg|.png$/)) {
        return { uri: request };
    }

    return originalLoader(request, parent, isMain);
};