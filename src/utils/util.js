/**
 * Created by LMA3606 on 15/03/2017.
 */

export function isNameValid(name) {
    if(name.length < 2){
        return -2;
    } else {
        const regexTitle = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\s\-,'?!"/+*#]*$/;
        return regexTitle.test(name);
    }
}

export function isPlaceValid(place) {
    if(place.length < 2){
        return -2;
    } else {
        const regexPlace = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s\-']*$/;
        return regexPlace.test(place);
    }
}

export function getUnixTime(time) {
    return (time.split(":")[0] * 3600 + time.split(":")[1] * 60 + 3600) * 1000;

}

export function getDateTime(date, time) {
    return (date.valueOf() + getUnixTime(time))
}

export function formatMessageWithSlash(string1, string2){
    if (string1.length !== 0) {
        string1 += " /" + string2;
        return string1
    } else {
        return string2;
    }
}