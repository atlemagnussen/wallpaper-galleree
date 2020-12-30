
import crud from "./firestoreCrud.js";
import storage from "./firestorage.js";
import fileService from "./fileService.js";

const collName = "galleries";
import { userIsLoggedIn, galleriesStore } from "../store";

const create = async (name) => {
    const isLoggedIn = userIsLoggedIn.get();
    if (!isLoggedIn)
        throw new Error("not logged in");
    
    const newGal = await crud.createOrUpdate(collName, {name});
    const galleries = galleriesStore.get();
    galleries.push(newGal);
    galleriesStore.set(galleries);
    return newGal;
};

const all = async () => {
    const isLoggedIn = userIsLoggedIn.get();
    if (!isLoggedIn)
        return [];
    let galleries = galleriesStore.get();
    if (galleries.length === 0 && isLoggedIn) {
        galleries = await crud.getAll(collName);
        galleriesStore.set(galleries);
    }
    return galleries;
};

const find = async (id) => {
    const allGals = await all();
    if (allGals.length === 0)
        return null;
    const gal = allGals.find(g => g._id === id);
    return gal;
};

const addpictureToGalree = async (id, filename) => {
    const gal = await find(id);
    if (!gal || !gal.files || !Array.isArray(gal.files) || gal.files.length === 0)
        gal.files = [];
    gal.files.push(filename);

    await crud.createOrUpdate(collName, gal);
    return gal;
};

const ret = async (gal, cb) => {
    if (!gal || !gal.files || !Array.isArray(gal.files) || gal.files.length === 0) {
        cb([]);
        return;
    }
    
    const files = await fileService.manyByName(gal.files);
    files.forEach(async f => {
        if (!f.url || !f.thumbnail) {
            const { name } = f;
            const url = await getFileUrl(name);
            const thumbnail = await getFileUrl(name, "thumbnails");
            f.url = url;
            f.thumbnail = thumbnail;
            fileService.setUrls(f, url, thumbnail);
        }
    });
    // const filesData = await loadFilesUrls(files);
    cb(files);
};
let unsub;
const getFilesData = async (id, callback) => {
    if (unsub) unsub();
    const db = firebase.firestore();
    const galRef = db.collection(collName).doc(id);
    unsub = galRef.onSnapshot((snapshot) => {
        const gal = snapshot.data();
        gal._id = snapshot.id;
        ret(gal, callback);
    });
};

const loadFilesUrls = async (files) => {
    const promises = files.map(async file => {
        const { name } = file;
        const url = await getFileUrl(name);
        const thumbnail = await getFileUrl(name, "thumbnails");
        return {
            name, url, thumbnail
        };
    });
    const res = Promise.all(promises);
    return res;
};

const getFileUrl = async (name, subfolder) => {
    const isLoggedIn = userIsLoggedIn.get();
    if (isLoggedIn) {
    
        const url = await storage.getUrl(name, subfolder);
        return url;
    }
    return null;
};

const uploadFile = (id, filename, file) => {

    const isLoggedIn = userIsLoggedIn.get();
    if (isLoggedIn) {
        const uploadTask = storage.upload(filename, file);
        
        uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        }, (error) => {
            console.error(error);
        }, async () => {
            await addpictureToGalree(id, filename);
            console.log("added pic to gal after upload");
        });
        return uploadTask;
    }
    return null;
};

const removeAndDeleteFile = async (galreeId, filename) => {
    const isLoggedIn = userIsLoggedIn.get();
    if (isLoggedIn) {
        const gal = await find(galreeId);
        const reducedFiles = gal.files.reduce((arr, f) => {
            if (f !== filename)
                arr.push(f);
            return arr;
        }, []);

        gal.files = reducedFiles;
        await crud.createOrUpdate(collName, gal);

        await fileService.deleteByFileName(filename);
        const res = storage.delete(filename);
        return res;
    }
    return false;
};

export default {
    create, all, find, getFileUrl, uploadFile, getFilesData, removeAndDeleteFile
};
