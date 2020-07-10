const functions = require("firebase-functions");
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const admin = require('firebase-admin');
admin.initializeApp()
const sharp = require('sharp');
const escapeHtml = require('escape-html');

exports.getThumbnail = async (req, res) => {
    console.log("getThumbnail");
    let filename;
    if (req.query.name) {
        filename = `${escapeHtml(req.query.name)}`.toLowerCase();
        console.log(`filename=${filename}`);
    }
    if (!filename) {
        console.log("no file name");
        res.status(404).send("Sorry no f!")
        return;
    }

    let ownerId;
    if (req.query.owner) {
        ownerId = `${escapeHtml(req.query.owner)}`.toLowerCase();
        console.log(`ownerId=${ownerId}`);
    }
    if (!ownerId) {
        console.log("no owner id");
        res.status(404).send("Sorry no o!")
        return;
    }

    const filePath = `${ownerId}/${filename}`;
    //const storage = functions.storage.object();
    const bucket = admin.storage().bucket();
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const res = await bucket.file(filePath).download({destination: tempFilePath});
    console.log(res);
    console.log('Image downloaded locally to', tempFilePath);
    sharp('input.jpg')
        .rotate()
        .resize(200)
        .toBuffer()
};

