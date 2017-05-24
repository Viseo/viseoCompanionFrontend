/**
 * Created by LMA3606 on 13/02/2017.
 */

// If you're running on another computer, make sure to put your own server ip address

///////////SERVER CONNECTION////////////////
// Localhost
    //let SERVER_API_URL = 'http://10.33.178.149:8080/api/';

// LEO
    let SERVER_API_URL = 'http://10.33.178.43:8080/'

// AWS Dev server
// let SERVER_API_URL = 'http://54.229.99.105:8080/viseocompanion/api/';

const restRoutes = {
    addEvent: SERVER_API_URL + 'events',
    getEvent: SERVER_API_URL + 'events/',
    editEvent: SERVER_API_URL + 'events/',
    getEvents: SERVER_API_URL + 'events/',
    authenticate: SERVER_API_URL + 'authenticate',
    changePassword: SERVER_API_URL + 'changePassword',
    deleteEvent: eventId => (SERVER_API_URL + 'events/' + eventId)
};

const settings = {
    api: restRoutes
};

export default settings;
