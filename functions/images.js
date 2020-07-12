// const {Storage} = require("@google-cloud/storage");
// const storage = new Storage();
const sharp = require("sharp");
const admin = require("./adminInit.js");
const escapeHtml = require("escape-html");
const cors = require("./cors.js");
const processing = require("./imageProcessing.js");

exports.generateThumbnailOnUpload = async (object) => {
    console.log("generateThumbnailOnUpload");
    const bucketName = object.bucket;
    const filePath = object.name;
    const contentType = object.contentType;

    if (!contentType.startsWith("image/")) {
        return console.log("This is not an image.");
    }

    const split = filePath.split("/");
    const ownerId = split[0];
    const filename = split[1];
    if (!ownerId || !filename)
        return console.log("missing owner or filename");
    
    console.log(`make thumbnail of ${filePath} and store it to ${bucketName}`);

    const thumbnailFilePath = `${ownerId}/thumbnails/${filename}`;
    console.log(`thumbnailFilePath=${thumbnailFilePath}`);
    
    try {
        await processing.genAndUploadThumbnail(bucketName, filePath, thumbnailFilePath)
    } catch(ex) {
        console.log(ex);
    }
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
    
    const thumbnailUploadStream = fileThumbnail.createWriteStream();
    const pipeline = sharp();
    pipeline.resize(200).pipe(thumbnailUploadStream);
    const orgFileReadStream = file.createReadStream();
    orgFileReadStream.pipe(pipeline);
    
    pipeline.on("data", (data) => {
        res.write(data);
    });
    pipeline.on("error", (err) => {
        console.error("error processing", err);
    });
    pipeline.on("end", () => {
        res.end();
    });
    
    return new Promise((resolve, reject) =>
      thumbnailUploadStream.on('finish', resolve).on('error', reject));
};

const getFullFile = async (filePath, res) => {
    console.log(`GetFullFile ${filePath}`);
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);
    const metadata = await file.getMetadata();
    const contentType = metadata[0].contentType;
    const stream  = file.createReadStream();
    res.writeHead(200, {"Content-Type": contentType });
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
