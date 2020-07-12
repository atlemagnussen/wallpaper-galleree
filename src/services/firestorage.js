
const get = async (path) => {
    const storageRef = firebase.storage().ref();
    
    const fileRef = storageRef.child(path);
    const url = await fileRef.getDownloadURL();
    return url;

};
const upload = (path, file) => {

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(path);
    // const metadata = {
    //     contentType: "image/jpeg",
    // };
    const uploadTask = fileRef.put(file);
    return uploadTask;
};

export default {
    get, upload
};
