
const get = async (path) => {
    const storageRef = firebase.storage().ref();
    
    const fileRef = storageRef.child(path);
    const url = await fileRef.getDownloadURL();
    return url;

};
const upload = async (path, file) => {

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(path);
    // const metadata = {
    //     contentType: "image/jpeg",
    // };
    const res = await fileRef.put(file);
    console.log("done uploading");
    return res;
};

export default {
    get, upload
};
