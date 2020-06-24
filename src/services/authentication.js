class Authentication {
    constructor() {
        this.root = `${window.location.origin}/`;
    }
    async loginGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const user = await firebase.auth().signInWithPopup(provider);
        return user;
    }
    async loginEmailPass(email, pass) {
        const user = await firebase.auth().signInWithEmailAndPassword(email, pass);
        return user;
    }
    async sendForgotPasswordMail(email) {
        const res = await firebase.auth().sendPasswordResetEmail(email);
        return res;
    }
    async changePassword(password) {
        const user = this.getCurrentUser();
        const res = await user.updatePassword(password);
        return res;
    }
    getCurrentUser() {
        return firebase.auth().currentUser;
    }
    
}
export default new Authentication();
