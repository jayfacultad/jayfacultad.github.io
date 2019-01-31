const express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
const path = require('path');
const PORT = process.env.PORT || 3000;
var app = new express();

// Parser 
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Enable Cross-Origin Resource Sharing
var cors = require('cors');
app.use(cors());

// Mongo initialization and connect to database
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nodemongoexample' || 'mongodb://localhost/nodemongoexample';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
        if (error) {
                console.log('Unable to connect to mongoDB server. Error: ', error);
        } else {
                db = databaseConnection;
        }        
});

app.use(express.static(path.join(__dirname, '/public')));

// 1. POST /submit route to submit final score and grid
app.post("/submit", function(request, response) {

        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "X-Requested-With");

        var usernameItem = request.body.username;
        var scoreItem = request.body.score;
        var date = new Date();
        var created_atItem = 
                String(date.toDateString() + " at " + 
                (date.getHours()<10?'0':'') + date.getHours() + ":" + 
                (date.getMinutes()<10?'0':'') + date.getMinutes() + ":" + 
                (date.getSeconds()<10?'0':'') + date.getSeconds());

        if(usernameItem == null || scoreItem == null || gridItem == null) {
                response.send('<!DOCTYPE HTML><html><head><title>Error</title></head><body><h2>Missing one or more data fields. Record not saved.</h2></body></html>');
        }

        // Prevent XSS
        usernameItem = usernameItem.replace(/[^\w\s]/gi, '');
        scoreItem = scoreItem.replace(/[^\w\s]/gi, '');
        scoreItem = parseInt(scoreItem);

        var toInsert = {
                "username": usernameItem,
                "score": scoreItem,
                "created_at": created_atItem,
                };
        usernameArray = [];

        if(usernameItem != null && scoreItem != null) {
                db.collection('scores', function(error, coll) {
                        coll.insert(toInsert, function(error, saved) {
                                if (error) {
                                        response.send("<!DOCTYPE HTML><html><head><title>Error</title></head><body><h2>Could not access collection. Record not saved.</h2></body></html>");
                                        response.send(500);
                                }
                                else {
                                        db.collection('scores', function(err, collection) {
                                                collection.find().toArray(function(err, results) {
                                                        if(!err) {
                                                                results.sort(function(a,b) {
                                                                        return a.score - b.score;
                                                                });
                                                                results.reverse();

                                                                // Maximum of 10 scores (without using loops)
                                                                usernameArray.push(results[0]);  
                                                                usernameArray.push(results[1]);  
                                                                usernameArray.push(results[2]);  
                                                                usernameArray.push(results[3]);  
                                                                usernameArray.push(results[4]);  
                                                                usernameArray.push(results[5]);  
                                                                usernameArray.push(results[6]);  
                                                                usernameArray.push(results[7]);  
                                                                usernameArray.push(results[8]);  
                                                                usernameArray.push(results[9]);  
                                                                
                                                                response.send(usernameArray);        
                                                                
                                                        } else {
                                                                response.send("<!DOCTYPE HTML><html><head><title>Error</title></head><body><h2>Error retrieving data.</h2></body></html>");
                                                        }
                                                });
                                        });
                                }
                        });
                });           
        } else {
                response.send('<!DOCTYPE HTML><html><head><title>Error</title></head><body><h2>Missing one or more data fields. Record not saved.</h2></body></html>');
        }
});

// 2. GET /scores.jason route returns a JSON array of objects for a specified player
app.get("/scores.json", function(request, response) {

        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "X-Requested-With");

        response.set('Content-Type', 'text/html');
        usernameArray = [];

        var usernameQuery = request.query.username;

        db.collection('scores', function(error, collection) {
                collection.find({"username": usernameQuery}).toArray(function(err, results) {
                        if(!err) {
                                if (results.length == 0) {
                                        response.send([]);
                                }
                                else {
                                        results.sort(function(a,b) {
                                                return a.score - b.score;
                                        });
                                        results.reverse();
                                        usernameArray = results;

                                        response.send(usernameArray);        
                                }
                        } else {
                                response.send("<!DOCTYPE HTML><html><head><title>2048 Game Center</title></head><body><h1>Error retrieving data</h1></body></html>");
                        }
                });
        });
});

// 3. Home/root/index displays list of all 2048 game scores for all players
app.get("/", function(request, response) {

        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "X-Requested-With");

        response.set('Content-Type', 'text/html');
        var indexPage = '';

        db.collection('scores', function(error, collection) {
                if (error) {
                        response.send('<!DOCTYPE HTML><html><head><title>2048 Game Center</title></head><body><h1>Error loading collection</h1></body></html>');
                }
                collection.find().toArray(function(error, results) {
                        if(!error) {
                                results = results.sort(function(a,b) {
                                        return a.score - b.score;
                                });
                                results.reverse();
                                indexPage += "<!DOCTYPE HTML><html><head><title>2048 Game Center</title><link rel='stylesheet' type='text/css' href='/stylesheets/main.css'></head><body><h1>2048 Game Center</h1>";
                                indexPage += "<div id='header'><a id='left'>Username</a><a id='center'>Score</a><a id='right'>Timestamp</a></div><br>";
                                for (var count = 0; count < results.length; count++) {
                                        indexPage += "<div id='content'><a id='left'>" + results[count].username + "</a><a id='center'>" + results[count].score + "</a><a id='right'>" + results[count].created_at + "</a></div>";
                                }
                        indexPage += "</body></html>"
                        response.send(indexPage);
                        } else {
                                response.send('<!DOCTYPE HTML><html><head><title>2048 Game Center</title></head><body><h1>Error retrieving data</h1></body></html>');
                        }
                });
        });
});

app.listen(PORT);