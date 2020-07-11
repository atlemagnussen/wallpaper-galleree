const path = require("path");
const os = require("os");
const functions = require("firebase-functions");
const getRawBody = require('raw-body');
// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage();
const admin = require('firebase-admin');
admin.initializeApp()
const sharp = require('sharp');
const escapeHtml = require('escape-html');

exports.getThumbnail = async (req, res) => {
    cors(req, res);
    console.log("getThumbnail");
    let filename;
    if (req.query.name) {
        filename = `${escapeHtml(req.query.name)}`;
    }
    if (!filename) {
        res.status(404).send("Sorry no f!")
        return;
    }

    let ownerId;
    if (req.query.owner) {
        ownerId = `${escapeHtml(req.query.owner)}`;
    }
    if (!ownerId) {
        res.status(404).send("Sorry no o!")
        return;
    }

    const filePath = `${ownerId}/${filename}`;
    //const storage = functions.storage.object();
    const bucket = admin.storage().bucket();
    //const tempFilePath = path.join(os.tmpdir(), filename);
    const file = bucket.file(filePath);
    const exists = await file.exists();
    if (!exists[0]) {
        res.status(404).send("main pic does not exist!")
        return;
    }

    const metadata = await file.getMetadata();
    const contentType = metadata[0].contentType;
    
    const thumbnailFilePath = `${ownerId}/thumbnails/${filename}`;
    const fileThumbnail = bucket.file(thumbnailFilePath);
    const thumbnailExists = await fileThumbnail.exists();
    if (thumbnailExists[0]) {
        console.log("thumbnail already created, serve");
        return getFullFile(thumbnailFilePath, res);
    }
    //const r = await file.download({destination: tempFilePath});// to file
    //const r = await file.download();// to file
    //console.log(r);
    
    //const buffer = await getRawBody(stream);
    // res.writeHead(200, {'Content-Type': 'image/jpg' });
    // stream.on('data', (data) => {
    //     res.write(data);
    // });
    // stream.on('error', (err) => {
    //     console.log('error reading stream', err);
    // });
    // stream.on('end', () => {
    //     res.end();
    // });
    // console.log('Image downloaded locally to', tempFilePath);
    //res.writeHead(200, {"Content-Type": contentType });
    console.log("try it");
    const readStream = file.createReadStream();
    const writeStream = fileThumbnail.createWriteStream();
    const thumbIt = (stream) => 
        sharp(stream).resize(200);

    await readStream
        .pipe(thumbIt)
        .pipe(writeStream)
    
    console.log("ok?");
    return getFullFile(thumbnailFilePath, res);
};

const getFullFile = async (filePath, res) => {
    //const filePath = `${ownerId}/${filename}`;
    //const storage = functions.storage.object();
    const bucket = admin.storage().bucket();
    //const tempFilePath = path.join(os.tmpdir(), filename);
    //console.log(`tempFilePath=${tempFilePath}`);
    const file = bucket.file(filePath);
    const stream  = file.createReadStream();
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    stream.on('data', (data) => {
        res.write(data);
    });
    stream.on('error', (err) => {
        console.log('error reading stream', err);
    });
    stream.on('end', () => {
        res.end();
    });
};
const origins = [
    "localhost:8000",
    "http://wallpaper-galleree.web.app"
]
const defaultOrigin = "http://localhost:8000";
const cors = (req, res) => {
    let origin = req.headers.origin ? req.headers.origin : defaultOrigin;
    console.log(`origin=${origin}`);
    if(origins.indexOf(origin) >= 0){
        res.header("Access-Control-Allow-Origin", origin);
    }   
    
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
};