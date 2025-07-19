const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    projectId: "msc-announcement-s",
  }),
});

console.log("Firebase connected successfully");

module.exports = admin.firestore();