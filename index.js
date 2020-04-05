const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
//var firebase = require("firebase/app");
//require('firebase/database');


//var async      = require('async');
//var credentials = {connectionLimit: 10}


//connect to db
//const mysql = require('mysql');
 
/*const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'expressdb',
    port: '3306'
});
 
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
});*/

/*var firebaseConfig = {
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


  var database = firebase.database();
  var ref = database.ref('covidData/brief');

  var usersRef = ref.child("users");
  usersRef.set({
    alanisawesome: {
      date_of_birth: "June 23, 1912",
      full_name: "Alan Turing"
    },
    gracehop: {
      date_of_birth: "December 9, 1906",
      full_name: "Grace Hopper"
    }
  });   */
  

app.use(express.static(path.join(__dirname, 'assets')));



//definir moteur de template
//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));





app.post('/covid19/timeseries',(req, res) => {

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let fullDate = year + "-" + month + "-" + date;

    request.get('https://covidapi.info/api/v1/country/'+req.body.country+'/timeseries/2020-02-01/'+fullDate, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
    });
});


app.get('/index',function(req, res) {
    var result = {};
    request.get('https://covid19.mathdro.id/api', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            let data = JSON.parse(body);
            result.brief = data;
        }
    });
    request.get('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            let data = JSON.parse(body);
            result.latest = data;
            res.render('index', {
               brief : result.brief,
               latest : result.latest
            });
        }
    });

});



app.get('/index/viewAll',function(req, res) {
    var result = {};
    request.get('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            let data = JSON.parse(body);
            result.brief = data;
        }
    });
    request.get('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            let data = JSON.parse(body);
            result.latest = data;
            res.render('tableView', {
               brief : result.brief,
               latest : result.latest
            });
        }
    });

});

app.get('/index/regional',(req, res) => {
    var result = {};
    request.get('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            result.latest = JSON.parse(body);
            res.render('regional', {
               latest : result.latest
            });
        }
    });
});


/*app.post('/covid19/regional',(req, res) => {
    request.get('https://covidapi.info/api/v1/country/'+req.body.country+'/timeseries/2020-02-01/2020-03-31', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
    });
});*/

app.get('/index/morocco/details',(req, res) => {
    request.get('https://covidma.herokuapp.com/api?fbclid=IwAR0xnMi3BhuAvBfzDzyCXoLK9yuMetjX8tGb51zhQXCtbjnpSwMaIPjsALc', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            res.render('morocco', {
               data : JSON.parse(body)
            });
        }
    });
});




app.get('*', function(req, res){
    res.redirect('/index');
  });



/*
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname+'/views/maintenance.html'));
  });
*/

// Server Listening
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
  