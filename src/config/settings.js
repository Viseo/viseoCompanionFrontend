import {conf, localhostIp} from './localConf';

/////////// SERVER CONNECTION ////////////////

//To change your LocalIp, edit the 'localConf.js' file.
const localhostURL = 'http://' + localhostIp + ':8080/';

// The server URL, you usually shouldn't have to change this
const remoteURL = 'http://companion-dev.viseolab.com/';


let serverURL = conf === 'DEV' ? localhostURL : remoteURL;


const restRoutes = {
    addEvent: serverURL + 'events',
    getEvent: serverURL + 'events/',
    editEvent: serverURL + 'events',
    getEvents: serverURL + 'events/',
    authenticate: serverURL + 'authenticate',
    updatedComment: serverURL + 'comments',
    changePassword: serverURL + 'changePassword',
    uploadImage: serverURL + 'upload',
    deleteEvent: eventId => (serverURL + 'events/' + eventId),
    addChildComment: (commentId) => {
        return serverURL + 'comments/' + commentId;
    },
    getAllCommentsByEvent: (eventId) => {
        return serverURL + 'comments/events/' + eventId + '?filter=all';
    },
    deleteComment: (commentId) => {
        return serverURL + 'comments/' + commentId;
    },
};

const settings = {
    api: restRoutes,
};

export default settings;
