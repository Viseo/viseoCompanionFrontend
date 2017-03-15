/**
 * Created by LMA3606 on 13/02/2017.
 */

// If you're running on another computer, make sure to put your own server ip address

///////////SERVER CONNECTION////////////////
// Localhost
// let SERVER_API_URL = 'http://10.33.179.112:8080/api/';

// AWS Dev server
let SERVER_API_URL = 'http://54.229.99.105:8080/viseocompanion/api/';

const restRoutes = {
    addEvent: SERVER_API_URL + 'events',
};

const settings = {
    api: restRoutes
};

export default settings;
