
import auth from "./authentication.js";
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
    if (!gal.files || !Array.isArray(gal.files))
        gal.files = [];
    gal.files.push(filename);

    await crud.createOrUpdate(collName, gal);
    return gal;
};

const getFilesData = async (id) => {
    const gal = await find(id);
    if (!gal) return [];
    const paths = gal.files.map(f => {
        return `user/${gal.ownerId}/${f}`;
    });
    const files = fileService.manyByPath(paths);
    const filesData = await loadFilesUrls(files);
    return filesData;
};

const loadFilesUrls = async (files) => {
    const promises = files.map(async name => {
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
    
        const user = auth.getCurrentUser();
        let path = `user/${user.uid}/${name}`;
        if (subfolder)
            path = `${user.uid}/${subfolder}/${name}`;
        const url = await storage.get(path);
        return url;
    }
    return null;
};

const uploadFile = (id, filename, file) => {

    const isLoggedIn = userIsLoggedIn.get();
    if (isLoggedIn) {
        const user = auth.getCurrentUser();
        const path = `user/${user.uid}/${filename}`;
        const uploadTask = storage.upload(path, file);
        
        uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        }, (error) => {
            console.log(error);
        }, async () => {
            await addpictureToGalree(id, filename);
            console.log("added pic to gal after upload");
        });
        return uploadTask;
    }
    return null;
};

export default {
    create, all, find, getFileUrl, uploadFile, getFilesData
};
