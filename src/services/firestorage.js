import auth from "./authentication.js";

const getUrl = async (name, subfolder) => {
    const user = auth.getCurrentUser();

    const storageRef = firebase.storage().ref();
    let userRef = storageRef.child(`user/${user.uid}`);

    let fileRef = userRef.child(name);
    if (subfolder)
        fileRef = userRef.child(`${subfolder}/${name}`);
    const url = await fileRef.getDownloadURL();
    return url;

};
const upload = (name, file) => {
    const user = auth.getCurrentUser();

    const storageRef = firebase.storage().ref();
    const userRef = storageRef.child(`user/${user.uid}`);
    const fileRef = userRef.child(name);
    
    const uploadTask = fileRef.put(file);
    return uploadTask;
};

export default {
    getUrl, upload
};
