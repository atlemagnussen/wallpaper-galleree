const admin = require("./adminInit.js");
const db = admin.firestore();

const create = async (collName, data) => {
    const colRef = db.collection(collName);
    let docRef = colRef.doc();
    return await docRef.set(data);
};

const saveFile = async (data) => {
    const res = await create("files", data)
    console.log("save file");
    return res;
}
exports.saveFile = saveFile;