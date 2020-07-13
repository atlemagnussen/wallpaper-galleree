
import crud from "./firestoreCrud.js";
const collName = "files";
import { userIsLoggedIn } from "../store";

const create = async (file) => {
    const isLoggedIn = userIsLoggedIn.get();
    if (!isLoggedIn)
        throw new Error("not logged in");
    
    const newFile = await crud.createOrUpdate(collName, file);
    return newFile;
};

const all = async () => {
    const isLoggedIn = userIsLoggedIn.get();
    if (!isLoggedIn)
        return [];

    const files = await crud.getAll(collName);
    return files;
};

const find = async (id) => {
    const file = await crud.get(collName, id);
    return file;
};

const addTag = async (id, tag) => {
    const file = await find(id);
    if (!file)
        throw new Error("no file");
    if (!file.tags || !Array.isArray(file.tags))
        file.tags = [];
    file.tags.push(tag);
    await crud.createOrUpdate(collName, file, id);
};
export default {
    create, all, find, addTag
};
