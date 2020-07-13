import auth from "./authentication.js";

class FirestoreCrud {
    async getAll(colname) {
        const db = firebase.firestore();
        const colRef = db.collection(colname);
        const all = [];
        try {
            const user = auth.getCurrentUser();
            const docRef = colRef.where("ownerId", "==", user.uid);
            const docs = await docRef.get();
            docs.forEach((d) => {
                const doc = d.data();
                doc._id = d.id;
                all.push(doc);
            });
        }
        catch(e) {
            console.log(e);
        }
        return all;
    }
    async get(colname, id) {
        const db = firebase.firestore();
        const docRef = await db.collection(colname).doc(id).get();
        if (!docRef.exists)
            return null;
        const doc = docRef.data();
        doc._id = id;
        return doc;
    }
    async createOrUpdate(colname, data, id) {
        if (!data)
            throw new Error("No data to set");
        
        const copyOfData = Object.assign({}, data); 
        const db = firebase.firestore();
        const colRef = db.collection(colname);
        let docRef;
        if (id) {
            docRef = colRef.doc(id);
        }
        else if (copyOfData._id) {
            docRef = colRef.doc(copyOfData._id);
            Reflect.deleteProperty(copyOfData, "_id");
        }
        else {
            docRef = colRef.doc(); //means create new
        }
        
        if (!copyOfData.ownerId) {
            const user = auth.getCurrentUser();
            copyOfData.ownerId = user.uid;
        }
        await docRef.set(copyOfData);
        copyOfData._id = docRef.id;
        return copyOfData;
    }
    async delete(colname, id) {
        const db = firebase.firestore();
        return await db.collection(colname).doc(id).delete();
    }
}

export default new FirestoreCrud();
