import { writable } from "svelte/store";

export const docTitle = writable("");

export const userIsLoggedIn = writable(false);

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
export const userProfile = createGettableWritableStore({ loggedIn: false, name: "Anon", initials: "U" });

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