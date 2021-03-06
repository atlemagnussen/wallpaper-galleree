import { currentGallery, currentFile, userIsLoggedIn } from "./index.js";
import service from "../services/galreeService.js";
let galId = null;
let curFile = null;
let curIndex = 0;
const setCurrentGallery = async (id) => {
    if (galId === id)
        return;
    galId = id;
    loadData();
};

const loadData = async () => {
    const gal = { id: galId };
    await service.getFilesData(galId, (items) => {
        gal.items = items;
        currentGallery.set(gal);
    });
    
};

userIsLoggedIn.subscribe(val => {
    if (val)
        loadData();
});

currentFile.subscribe(val => {
    curFile = val;
    if (curFile) {
        const gal = currentGallery.get();
        if (gal && Array.isArray(gal.items) && gal.items.length > 0) {
            curIndex = gal.items.findIndex((item) => {
                return item.name === curFile.name;
            });
        }
    }
});

const next = () => {
    const gal = currentGallery.get();
    if (gal && Array.isArray(gal.items) && gal.items.length > 0 && curIndex !== null) {
        if (gal.items.length -1 > curIndex) {
            const file = gal.items[curIndex + 1];
            currentFile.set(file);
        }
    }
};
const prev = () => {
    const gal = currentGallery.get();
    if (gal && Array.isArray(gal.items) && gal.items.length > 0 && curIndex !== null) {
        if (curIndex > 0) {
            const file = gal.items[curIndex - 1];
            currentFile.set(file);
        }
    }
};
export default {
    setCurrentGallery,
    next,
    prev
};