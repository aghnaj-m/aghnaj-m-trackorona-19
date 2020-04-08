const functions = require('firebase-functions');
const firestoreService = require('firestore-export-import');
const admin = require('firebase-admin');
var firebase = require("firebase/app");
require('firebase/firestore');

exports.JsonBackups = functions.https.onRequest((request, response) => {

// JSON To Firestore
const jsonToFirestore = async () => {
  try {
    console.log('Initialzing Firebase');
    admin.initializeApp(functions.config().firebase);
            console.log('Firebase Initialized');

    await firestoreService.restore('./backups.json');
    console.log('Upload Success');
  }
  catch (error) {
    console.log(error);
  }
};

jsonToFirestore();

});