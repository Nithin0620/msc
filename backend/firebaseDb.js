const admin = require("firebase-admin");
const serviceAccount = require("./msc-announcement-s-firebase-adminsdk-fbsvc-5c89086205.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("Firebase DB connected successfully");

module.exports = admin.firestore();
