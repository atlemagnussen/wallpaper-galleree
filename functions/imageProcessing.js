const admin = require("./adminInit.js");
const sharp = require("sharp");

const genAndUploadThumbnail = (bucketName, orgFilePath, thumbFilePath) => {
    return new Promise(async (resolve, reject) => {
        const bucket = admin.storage().bucket(bucketName);
        const orgFile = bucket.file(orgFilePath);
        const orgExists = await orgFile.exists();
        if (!orgExists[0])
            reject(`org file ${orgFilePath} does not exists`);
        
        const thumbFile = bucket.file(thumbFilePath);
        const thumbExists = await thumbFile.exists();
        if (thumbExists[0])
            reject(`thumb file ${thumbFilePath} already exists`);
        
        const thumbUploadStream = thumbFile.createWriteStream();
        let pipeline = sharp();
        pipeline.resize(200).pipe(thumbUploadStream);
        const orgFileReadStream = orgFile.createReadStream();
        orgFileReadStream.pipe(pipeline);
        thumbUploadStream.on("finish", resolve).on("error", reject);
    });
};

const getMetaData = async (bucketName, filePath) => {
    const bucket = admin.storage().bucket(bucketName);
    const file = bucket.file(filePath);
    const fileExists = await file.exists();
    if (!fileExists[0])
        reject(`org file ${filePath} does not exists`);
    const metadata = await file.getMetadata();
    return metadata[0];
};

exports.genAndUploadThumbnail = genAndUploadThumbnail;
exports.getMetaData = getMetaData;