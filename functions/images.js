
const getRawBody = require("raw-body");
// const {Storage} = require("@google-cloud/storage");
// const storage = new Storage();
const admin = require("firebase-admin");
admin.initializeApp();
const sharp = require("sharp");
const escapeHtml = require("escape-html");
const cors = require("./cors.js");

exports.generateThumbnailOnUpload = async (object) => {
    console.log("generateThumbnailOnUpload");
    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name; // File path in the bucket.
    const contentType = object.contentType;

    if (!contentType.startsWith("image/")) {
        return console.log("This is not an image.");
    }

    console.log(`make thumbnail of ${filePath} and store it to ${fileBucket}`);
    const bucket = admin.storage().bucket(fileBucket);
    const file = bucket.file(filePath);
    const orgFileReadStream = file.createReadStream();
    const orgFileBuffer = await getRawBody(orgFileReadStream);

    const split = filePath.split("/");
    const ownerId = split[0];
    const filename = split[1];
    if (!ownerId || !filename)
        return console.log("missing owner or filename");
    
    const thumbnailFilePath = `${ownerId}/thumbnails/${filename}`;
    console.log(`thumbnailFilePath=${thumbnailFilePath}`);
    const fileThumbnail = bucket.file(thumbnailFilePath);
    const writeStreamThumbnail = fileThumbnail.createWriteStream();
    let sharpStream = sharp(orgFileBuffer).resize(200);
    await sharpStream.pipe(writeStreamThumbnail);
    console.log("done writing thumbnail");
    return true;
};
exports.getThumbnail = async (req, res) => {
    cors.add(req, res);
    console.log("getThumbnail");
    let filename;
    if (req.query.name) {
        filename = `${escapeHtml(req.query.name)}`;
    }
    if (!filename) {
        res.status(404).send("Sorry no f!");
        return;
    }

    let ownerId;
    if (req.query.owner) {
        ownerId = `${escapeHtml(req.query.owner)}`;
    }
    if (!ownerId) {
        res.status(404).send("Sorry no o!");
        return;
    }

    const filePath = `${ownerId}/${filename}`;
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);
    const exists = await file.exists();
    if (!exists[0]) {
        res.status(404).send("main p does not exist!");
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
    
    res.writeHead(200, {"Content-Type": contentType });
    console.log("make thumbnail and store it and then serve it right back");
    const orgFileReadStream = file.createReadStream();
    const orgFileBuffer = await getRawBody(orgFileReadStream);
    const writeStreamThumbnail = fileThumbnail.createWriteStream();
    let sharpStream = sharp(orgFileBuffer).resize(200);
    sharpStream.on("data", (data) => {
        res.write(data);
    });
    sharpStream.on("error", (err) => {
        console.error("error reading stream", err);
    });
    sharpStream.on("end", () => {
        res.end();
    });
    await sharpStream.pipe(writeStreamThumbnail);
    
    console.log("ok?");
};

const getFullFile = async (filePath, res) => {
    console.log(`GetFullFile ${filePath}`);
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);
    const stream  = file.createReadStream();
    res.writeHead(200, {"Content-Type": "image/jpg" });
    stream.on("data", (data) => {
        res.write(data);
    });
    stream.on("error", (err) => {
        console.log("error reading stream", err);
    });
    stream.on("end", () => {
        res.end();
    });
};
