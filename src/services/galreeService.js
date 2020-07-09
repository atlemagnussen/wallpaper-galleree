import crud from "./firestoreCrud.js";
const collName = "galleries";
import { userIsLoggedIn, galleriesStore } from "../store";

export const create = async (name) => {
    const isLoggedIn = userIsLoggedIn.get();
    if (!isLoggedIn)
        throw new Error("not logged in");
    
    const newGal = await crud.createOrUpdate(collName, {name});
    const galleries = galleriesStore.get();
    galleries.push(newGal);
    galleriesStore.set(galleries);
    return newGal;
};

export const all = async () => {
    const isLoggedIn = userIsLoggedIn.get();
    if (!isLoggedIn)
        return [];
    const galleries = galleriesStore.get();
    if (galleries.length === 0 && isLoggedIn) {
        const galleries = await crud.getAll(collName);
        galleriesStore.set(galleries);
    }
    return galleries;
};

export const find = async (id) => {
    const all = await all();
    if (all.length === 0)
        return null;
    const gal = all.find(g => g._id === id);
    return gal;
};