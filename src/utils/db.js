/**
 * Created by LMA3606 on 15/03/2017.
 */
import settings from '../config/settings';

export async function addEvent(event){
    try {
        let response = await fetch(settings.api.addEvent, {
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
            })
        });
        response = await response.status;
        return (parseInt(response, 10) === 200);
    } catch (error) {
        console.warn('db::addEvent ' + error);
    }
}

const db = {
    addEvent
};

export default db;