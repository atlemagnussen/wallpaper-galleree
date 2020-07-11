let baseUrl = "http://localhost:5001/wallpaper-galleree/us-central1";
if (!location.host.startsWith("localhost")) {
    baseUrl = "https://us-central1-wallpaper-galleree.cloudfunctions.net";
}
import { userProfile } from "../store";

const getThumbnailUrl = (filename) => {
    const up = userProfile.get();
    if (!up.id) {
        throw new Error("need id");
    }
    return `${baseUrl}/getThumbnail?name=${filename}&owner=${up.id}`;
};

const listAllFiles = async () => {
    const up = userProfile.get();
    if (!up.id) {
        throw new Error("be logged in");
    }
    const storageRef = firebase.storage().ref();
    const listRef = storageRef.child(up.id);
    // Find all the prefixes and items.
    const res = await listRef.listAll();
    res.prefixes.forEach((folderRef) => {
        console.log(folderRef);
    });
    res.items.forEach((itemRef) => {
        console.log(itemRef);
    });
};


export default { getThumbnailUrl, listAllFiles};
