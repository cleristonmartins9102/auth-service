"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsCredentialRepository = void 0;
const firestore_1 = require("@google-cloud/firestore");
const errors_1 = require("@/application/errors/errors");
class FsCredentialRepository {
    async create(credentials) {
        const firestore = new firestore_1.Firestore();
        try {
            await firestore.collection('credentials').add({ ...credentials, created_at: new Date() });
        }
        catch (error) {
            throw new errors_1.FirestoreError(error);
        }
    }
    async getByRefreshToken(refreshToken) {
        const firestore = new firestore_1.Firestore();
        const snapshot = await firestore.collection('credentials').where('refreshToken', '==', refreshToken).get();
        if (snapshot.empty)
            return null;
        let document = null;
        snapshot.docs.forEach(doc => {
            document = { ...doc.data(), id: doc.id };
        });
        return document;
    }
    async getByEmail(email) {
        const firestore = new firestore_1.Firestore();
        const snapshot = await firestore.collection('credentials').where('email', '==', email).get();
        if (snapshot.empty)
            return null;
        let document = null;
        snapshot.docs.forEach(doc => {
            document = doc.data();
        });
        return document;
    }
    async update(credentialId, credential) {
        const firestore = new firestore_1.Firestore();
        try {
            await firestore.collection('credentials').doc(`${credentialId}`).update({ ...credential, updated_at: new Date() });
        }
        catch (error) {
            console.log(credentialId);
        }
        return true;
    }
}
exports.FsCredentialRepository = FsCredentialRepository;
//# sourceMappingURL=fs-credential-repository.js.map