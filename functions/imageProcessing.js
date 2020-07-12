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
        pipeline.resize(200).pipe(thumbnailUploadStream);
        const orgFileReadStream = file.createReadStream();
        orgFileReadStream.pipe(pipeline);
        thumbUploadStream.on("finish", resolve).on("error", reject);
    });
};

exports.genAndUploadThumbnail = genAndUploadThumbnail;