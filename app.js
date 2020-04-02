const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
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

app.use(express.static('assets'));


//definir moteur de template
//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//ajouter le chemin d'accueil et définir la page d'index des etudiants
/*app.get('/',(req, res) => {
    //let sql = "SELECT etudiant.id as id,etudiant.nom as nom,filiere.nom as filiere FROM etudiant,filiere "+ 
    //"where etudiant.filiere = filiere.id";
    let sql = "select * from etudiant";
    connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('index', {
            title : 'gestion etudiants',
            etudiant : rows
        });
    });
});*/


app.post('/covid19/timeseries',(req, res) => {
    request.get('https://covidapi.info/api/v1/country/'+req.body.country+'/timeseries/2020-02-01/2020-03-31', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
    });
});


app.get('/index',function(req, res) {
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


app.post('/covid19/regional',(req, res) => {
    request.get('https://covidapi.info/api/v1/country/'+req.body.country+'/timeseries/2020-02-01/2020-03-31', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
    });
});

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
app.get('/add',(req, res) => {
    res.render('add', {
        title : 'gestion etudiants'
    });
});

app.post('/save',(req, res) => { 
    let data = [req.body.id,req.body.nom];
    let sql = "INSERT INTO etudiant values(?,?)";
    connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.get('/edit/:Id',(req, res) => {
    const Id = req.params.Id;
    let sql = `Select * from etudiant where id = ${Id}`;
    connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('edit', {
            title : 'gestion etudiants',
            e : result[0]
        });
    });
});


app.post('/update',(req, res) => {
    const Id = req.body.id;
    let sql = "update etudiant SET id='"+req.body.id+"',  nom='"+req.body.nom+"' where id ="+Id;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});


app.get('/delete/:Id',(req, res) => {
    const Id = req.params.Id;
    let sql = `DELETE from etudiant where id = ${Id}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');  
    });
});
*/



// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});