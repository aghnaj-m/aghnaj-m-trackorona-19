/*const express = require('express');
const request = require('request');
const functions = require('firebase-functions');
require('es6-promise').polyfill();
require('isomorphic-fetch');

var firebase = require("firebase/app");
require('firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyBzi7U782_DFMdsaxOUPwkwftXLPA5w7ZU",
    authDomain: "trackorona-19.firebaseapp.com",
    databaseURL: "https://trackorona-19.firebaseio.com",
    projectId: "trackorona-19",
    storageBucket: "trackorona-19.appspot.com",
    messagingSenderId: "580530527055",
    appId: "1:580530527055:web:a2a6fb8b50318cfb9f033a",
    measurementId: "G-XLY5T31PN8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.covidDataBackups = functions.https.onRequest((request, response) => {
    var date = new Date();
    var currentdate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    request.get('https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=11',function(err,response,body){
      if (!err && response.statusCode === 200) {  
        let obj = JSON.parse(body);
        var confirmed = Array(),
        deaths = Array(),
        recovered = Array(),
        countries = Array();
        for(let i = 0;i<obj.data.rows.length;i++){
            confirmed.push(obj.data.rows[i].total_cases);
            deaths.push(obj.data.rows[i].total_deaths);
            recovered.push(obj.data.rows[i].total_recovered);
            countries.push(obj.data.rows[i].country);
        }
        
  
        for(let j  = 0;j<countries.length;j++)
        {
            var docRef = firebase.firestore().doc('backup:'+currentdate+'/'+countries[j]);
            docRef.set({
                confirmed: confirmed[j],
                recovered: recovered[j],
                deaths: deaths[j]
            }).then(function(){
                console.log("done "+countries[j]);
                return "Done"+countries[j];
            }).catch(function(){
                console.log("error: "+countries[j]);
            });
        }
    }else{
      console.log("ERUUUUUUUUUUR");
    }
  });
  
});*/
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