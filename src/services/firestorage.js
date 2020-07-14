import auth from "./authentication.js";

const userFolder = () => {
    const user = auth.getCurrentUser();
    return `user/${user.uid}`;
};
const getUrl = async (name, subfolder) => {
    const storageRef = firebase.storage().ref();
    const folder = userFolder();
    let userRef = storageRef.child(folder);

    let fileRef = userRef.child(name);
    if (subfolder)
        fileRef = userRef.child(`${subfolder}/${name}`);
    const url = await fileRef.getDownloadURL();
    return url;

};
const upload = (name, file) => {
    const storageRef = firebase.storage().ref();
    const folder = userFolder();
    let userRef = storageRef.child(folder);
    const fileRef = userRef.child(name);
    
    const uploadTask = fileRef.put(file);
    return uploadTask;
};

export default {
    getUrl, upload, userFolder
};
