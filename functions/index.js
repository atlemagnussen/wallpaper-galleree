const functions = require("firebase-functions");
const images = require("./images.js");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.getThumbnail = functions.https.onRequest(images.getThumbnail);

exports.generateThumbnailOnUpload = functions.storage.object().onFinalize(images.generateThumbnailOnUpload);