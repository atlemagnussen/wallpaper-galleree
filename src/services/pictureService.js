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

export default {getThumbnailUrl};