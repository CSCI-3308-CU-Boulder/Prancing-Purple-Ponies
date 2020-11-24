import firebase from "firebase";
import uuid from 'uuid/v4';
// import React, { NativeModules } from 'react';
// import NativeModules from "react-native-web/dist/exports/NativeModules";


const firebaseConfig = {
    apiKey: "AIzaSyBR7CWm1jHPSe-4m4qKiPscBTRoAi6futo",
    authDomain: "skoplay-7b008.firebaseapp.com",
    databaseURL: "https://skoplay-7b008.firebaseio.com",
    projectId: "skoplay-7b008",
    storageBucket: "skoplay-7b008.appspot.com",
    messagingSenderId: "761939565849",
    appId: "1:761939565849:web:303e473673f1be814eb988"
};

firebase.initializeApp(firebaseConfig);

export var db = firebase.firestore();
export var auth = firebase.auth();
export var currentUser = null;
export var storage = firebase.storage();

let onStateChangeFunction = null;

export function onAuthChange(func) {
    onStateChangeFunction = func;
}

auth.onAuthStateChanged(async () => {
    if (auth.currentUser) {
        await db.collection("user")
            .where("email", "==", auth.currentUser.email)
            .get().then((result) => {
                currentUser = result.docs[0];
        })
    } else {
        currentUser = null;
    }

    if (onStateChangeFunction) {
        onStateChangeFunction(currentUser);
    }
})

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export async function forEachEntry(collection, func) {
    await db.collection(collection).get().then((query) => {
        query.forEach((doc) => {
            func(doc);
        })
    });
}

export async function addEntry(collection, entry) {
    await db.collection(collection).add(entry)
        .then((docRef) => {
            console.log("New entry in " + collection + ": " + docRef.id);
        })
        .catch((error) => {
            console.log("Error adding entry to " + collection + ": " + error);
        })
}

export async function updateCurrentUser(newData) {
    await currentUser.ref.get().then((user) => {
        let oldData = user.data();
        newData = Object.assign(oldData, newData);
        console.log(newData);
        return currentUser.ref.set(newData);

    }).catch((error) => {
        console.log(error.message);
    })
}


// function stringToUint8Array(str) {
//     const length = str.length
//     const array = new Uint8Array(new ArrayBuffer(length))
//     for(let i = 0; i < length; i++) array[i] = str.charCodeAt(i)
//     return array
// }
//
// export async function fileToBase64(uri) {
//     try {
//         const content = await FileSystem.readAsStringAsync(uri)
//         console.log(content)
//         return base64.fromByteArray(stringToUint8Array(content))
//     } catch(e) {
//         console.warn('fileToBase64()', e.message)
//         return ''
//     }
// }

function getExtension(base64String) {
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

// Decode the string
    var decoded = Base64.decode(base64String);

// if the file extension is unknown
    var extension = undefined;
// do something like this
    var lowerCase = decoded.toLowerCase();
    // console.log(lowerCase)
    if (lowerCase.indexOf("png") !== -1) extension = "png"
    else if (lowerCase.indexOf("jpg") !== -1 || lowerCase.indexOf("jpeg") !== -1)
        extension = "jpg"
    else extension = "tiff";

    console.log(extension)
    return extension;
}

export async function uploadImage(image) {
    let ext = getExtension(image.base64);
    // const ext = image_uri.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${ext}`; // Generate unique name
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

    console.log("===========================================================================")
    console.log(image)
    console.log("Base 64: " + image.base64)
    console.log("Base 64 type: " + typeof image.base64)
    storage.ref(`images/${filename}`)
        .putString(image.base64).then((image) => {
            // console.log(image)
            updateCurrentUser({image: filename});
        }).catch((error) => {
            console.log(error.message);
        })
}
