import crud from "./firestoreCrud.js";
const collName = "tags";
import { userIsLoggedIn, tagsStore } from "../store";

const create = async (name, color) => {
    const isLoggedIn = userIsLoggedIn.get();
    if (!isLoggedIn)
        throw new Error("not logged in");
    
    const newTag = await crud.createOrUpdate(collName, {name, color});
    const tags = tagsStore.get();
    tags.push(newTag);
    tagsStore.set(tags);
    return newTag;
};

const all = async () => {
    const isLoggedIn = userIsLoggedIn.get();
    if (!isLoggedIn)
        return [];
    let tags = tagsStore.get();
    if (tags.length === 0 && isLoggedIn) {
        tags = await crud.getAll(collName);
        tagsStore.set(tags);
    }
    return tags;
};

const find = async (id) => {
    const allGals = await all();
    if (allGals.length === 0)
        return null;
    const gal = allGals.find(g => g._id === id);
    return gal;
};

export default {
    create, all, find
};
