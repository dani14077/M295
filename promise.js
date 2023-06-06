'use strict'

let fs = require('fs');

function leseDateiInhalt(filePath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, function(err, data) {
            if(err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
};

leseDateiInhalt('promise.js')
.then(function(inhalt){
    console.log("Der Inhalt der Datei ist so lang: " + inhalt.length);
})
.catch(function(error) {
    console.error("Es gab einen Fehler: " + error);
})