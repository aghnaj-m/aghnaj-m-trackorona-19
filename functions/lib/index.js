"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require('firebase-admin');
const functions = require('firebase-functions');
//const fetch = require("node-fetch");
const demande = require('request');
//admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.covidData = functions.https.onRequest((request, res) => {
    //const date = new Date();
    //const currentdate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    const firestore = admin.firestore();
    demande.get('https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=5', function (err, response, body) {
        if (!err && response.statusCode === 200) {
            const objs = JSON.parse(body);
            const confirmed = [], deaths = [], recovered = [], countries = [];
            objs.data.rows.forEach((element) => {
                confirmed.push(element.total_cases);
                deaths.push(element.total_deaths);
                recovered.push(element.total_recovered);
                countries.push(element.country);
            });
            // var obj:any = {}
            for (let i = 0; i < countries.length; i++) {
                let aTuringRef = firestore.collection('backups').doc(countries[i]);
                aTuringRef.set({
                    'confirmed': confirmed[i],
                    'recovered': recovered[i],
                    'deaths': deaths[i]
                });
            }
            //res.send(obj);
            /*for(let i  = 0;i<countries.length;i++)
            {
                const docRef = firestore.doc(currentdate+"/"+countries[i])
                docRef.set({
                    confirmed: confirmed[i],
                    recovered: recovered[i],
                    deaths: deaths[i]
                })
            }*/
        }
    });
    /*fetch('')
    .then((res: { json: () => any; })=>{
        return res.json()
    })
    .then( (objs: { data: { row: any[]; }; }) =>{
        const confirmed: any[] = [],deaths: any[] = [], recovered: any[] = [], countries: any[] = []
            /*objs.data.row.forEach((element : any) => {
            confirmed.push(element.total_cases)
            deaths.push(element.total_deaths);
            recovered.push(element.total_recovered);
            countries.push(element.country);
        });
        
        for(let i  = 0;i<countries.length;i++)
        {
            const docRef = firestore.doc(currentdate+"/"+countries[i])
            docRef.set({
                confirmed: confirmed[i],
                recovered: recovered[i],
                deaths: deaths[i]
            })
        }
        response.send("DATA IS HERE");
        console.log(objs)
        response.send(objs)

    }).catch((error:any) => {
        console.error("Error sending data to server")
    })*/
});
//# sourceMappingURL=index.js.map