/**
 * Created by AAB3605 on 09/03/2017.
 */
export default class User {
    constructor(id,
                firstName,
                lastName,
                email,
                password,
                birthday,
                role ) {

        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
        this._birthday = birthday;
        this._role = role;
    }

    get birthday() {
        return this._birthday;
    }

    set birthday(value) {
        this._birthday = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }
}
