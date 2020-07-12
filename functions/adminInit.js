const admin = require('firebase-admin');
var env = process.env.NODE_ENV || "development";
console.log(`env=${env}`);
// if (env == "development") {
//     admin.initializeApp({
//         credential: admin.credential.applicationDefault(),
//         storageBucket: "wallpaper-galleree.appspot.com"
//     });
// } else {
    admin.initializeApp();
//}
module.exports = admin;
