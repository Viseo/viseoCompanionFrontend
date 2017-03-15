/**
 * Created by AAB3605 on 20/02/2017.
 */

export default class Event {
    constructor(
        id,
        name,
        description,
        date,
        location,
        keyWords
    ) {
        this._name = name;
        this._description = description;
        this._date = date;
        this._location = location;
        this._keyWords = keyWords;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get date() {
        return this._date;
    }

    get location() {
        return this._location;
    }


    get keyWords() {
        return this._keyWords;
    }
}