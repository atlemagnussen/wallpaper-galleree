import { writable } from "svelte/store";

export const docTitle = writable("");

export const curSearchParam = writable("");

export const plansStore = writable([]);

export const isSpinning = writable(true);

const createGettableWritableStore = (initialVal) => {
    let val = initialVal;
    const { subscribe, set, update } = writable(val);
    const get = () => val;
    var newSet = (newVal) => {
        val = newVal;
        return set(val);
    };
    return { subscribe, set: newSet, update, get };
};
export const userIsLoggedIn = createGettableWritableStore(false);
export const userProfile = createGettableWritableStore({ loggedIn: false, name: "Anon", initials: "U" });
export const galleriesStore = createGettableWritableStore([]);
export const currentFile = createGettableWritableStore( {
    filename: "dummy",
    url: "https://firebasestorage.googleapis.com/v0/b/wallpaper-galleree.appspot.com/o/YemV2Tau6ReKvK5CEFwLLlxp28k1%2Fbackground-red-sunset-tjensvoll_1400x900.jpg?alt=media&token=ca6056da-42b3-46f4-8844-fb224b7c5f61"
    //url: "/assets/galree.jpg"
});

const createGettableAppendableWriteableStore = (initialVal) => {
    let val = initialVal;
    const { subscribe, set, update } = writable(val);
    var newSet = (newVal) => {
        val = newVal;
        return set(val);
    };
    const get = () => val;
    const append = (app) => {
        set(`${val}${app}`);
    };
    return { subscribe, set: newSet, update, get, append };
};
export const curRoute = createGettableAppendableWriteableStore("");


const createGettableTogglableWriteableStore = (initialVal) => {
    let val = initialVal;
    const { subscribe, set, update } = writable(val);
    var newSet = (newVal) => {
        val = newVal;
        return set(val);
    };
    const get = () => val;
    const toggle = () => {
        val = !val;
        return set(val);
    };
    return { subscribe, set: newSet, update, get, toggle };
};

export const isDarkTheme = createGettableTogglableWriteableStore(false);