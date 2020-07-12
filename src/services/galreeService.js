
import auth from "./authentication.js";
import crud from "./firestoreCrud.js";
import storage from "./firestorage.js";
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
    //const galleries = galleriesStore.get();
    // const planOrg = plans.find(p => p._id === plan._id);
    // Object.assign(planOrg, plan); // merge
    return gal;
};

const getFilesUrls = async (id) => {
    const gal = await find(id);
    if (!gal) return [];
    const urls = await loadFilesUrls(gal.files);
    return urls;
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

const getFileUrl = async (id, subfolder) => {
    const isLoggedIn = userIsLoggedIn.get();
    if (isLoggedIn) {
    
        const user = auth.getCurrentUser();
        let path = `${user.uid}/${id}`;
        if (subfolder)
            path = `${user.uid}/${subfolder}/${id}`;
        const url = await storage.get(path);
        return url;
    }
    return null;
};

const uploadFile = async (id, filename, file) => {

    const isLoggedIn = userIsLoggedIn.get();
    if (isLoggedIn) {
        const user = auth.getCurrentUser();
        const path = `${user.uid}/${filename}`;
        const res = await storage.upload(path, file);
        console.log(res);
        const gal = await addpictureToGalree(id, filename);
        return gal;
    }
    return null;
};

export default {
    create, all, find, getFileUrl, uploadFile, getFilesUrls
};
