import cryptoRandomString from 'crypto-random-string';

export default function getIdentifier () {
    let storage = window.localStorage;
    let identifier;
    try {
        if (!storage.getItem("key")) {
            storage.setItem("key", cryptoRandomString({length:10}));
            identifier = storage.getItem("key");
        } else {
            identifier = storage.getItem("key")
        }
    } catch (e) {
        console.log("Error: " + e);
    }
    return identifier;
}