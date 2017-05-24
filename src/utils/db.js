/**
 * Created by LMA3606 on 15/03/2017.
 */

import settings from '../config/settings';
import User from './user';

async function addEvent(event) {
    try {
        let response = await fetch(settings.api.addEvent + '?host=1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": event.name,
                "datetime": event.date,
                "description": event.description,
                "keyWords": event.keyWords,
                "place": event.location,
                "category": event.category
            })
        });
        return (await response.status === 200);
    } catch (error) {
        console.warn('db::addEvent ' + error);
    }
}

async function EditEvent(event) {
    try {
        let response = await fetch(settings.api.editEvent, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": event.id,
                "name": event.name,
                "datetime": event.datetime,
                "description": event.description,
                "keyWords": event.keyWords,
                "place": event.location,
                "category": event.category
            })
        });
        return (await response.status === 200);
    } catch (error) {
        console.warn('db::editEvent ' + error);
    }
}

async function deleteEvent(id) {
    try {
        let response = await fetch(settings.api.deleteEvent(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return (await response.status === 200);
    } catch (error) {
        console.warn('db::deleteEvent ' + error);
    }
}

async function authenticateAdmin(email, password) {
    try {
        let response = await fetch(settings.api.authenticate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        if (await response.status === 302) {
            let user = await response.json();
            if (user && user.roles[0] && user.roles[0].id === 1) {
                return new User(user.id, user.firstName, user.lastName, user.email);
            }
        }
    } catch (error) {
        console.warn('db::authenticate ' + error);
        return -1;
    }
    return null;
}

const db = {
    addEvent,
    deleteEvent,
    EditEvent,
    authenticateAdmin
};

export default db;