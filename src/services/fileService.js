import crud from "./firestoreCrud.js";
import storage from "./firestorage.js";

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

const findByName = async (name) => {
    const files = await crud.getByProp(collName, "name", name);
    if (files && Array.isArray(files) && files.length > 0)
        return files[0];
    return null;
};

const manyByPath = async (paths) => {
    let all = [];
    for(let i = 0; i < paths.length; i++) {
        let path = paths[i];
        let file = await findByPath(path);
        if (file)
            all.push(file);
    }
    return all;
};

const manyByName = async (names) => {
    let all = [];
    for(let i = 0; i < names.length; i++) {
        let name = names[i];
        let path = `${storage.userFolder()}/${name}`;
        let file = await findByPath(path);
        if (file)
            all.push(file);
    }
    return all;
    
};

const findByPath = async (path) => {
    const files = await crud.getByProp(collName, "path", path);
    if (files.length === 0)
        return null;
    if (files.length === 1)
        return files[0];
    return files;
};

const setUrls = async (f, url, thumbnail) => {
    const file = await crud.get(collName, f._id);
    file.url = url;
    file.thumbnail = thumbnail;
    const newFile = await crud.createOrUpdate(collName, file);
    return newFile;
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

const deleteByFileName = async (name) => {
    const file = await findByName(name);
    if (file) {
        const rd = await crud.delete(collName, file._id);
        console.log(rd);
    }
};
export default {
    create, all, find, findByPath, deleteByFileName, addTag, manyByPath, manyByName, setUrls
};
