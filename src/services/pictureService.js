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
    const listRef = storageRef.child(`user/${up.id}`);
    // Find all the prefixes and items.
    const res = await listRef.listAll();
    res.prefixes.forEach((folderRef) => {
        console.log(folderRef);
    });
    const list = await getFilesInfo(res.items);
    return list;
};

const getFilesInfo = async (files) => {
    const promises = files.map(async fileRef => {
        let path = fileRef.location.path;
        const metadata = await fileRef.getMetadata();
        const { name, size, contentType, updated, md5Hash, generation } = metadata;
        return {
            path, name, size, contentType, updated, md5Hash, generation
        };
    });
    const res = Promise.all(promises);
    return res;
};

export default { getThumbnailUrl, listAllFiles};
