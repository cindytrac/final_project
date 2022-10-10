const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      app     = express(),
      hbs     = require( 'express-handlebars' ).engine,
      config = require('./src/config.js'),
      cookieParser = require('cookie-parser'),
      ////expressSession = require('express-session'),
      methodOverride = require('method-override');

app.use( express.json() )

app.use( express.static( 'dist' ) )
app.use( express.static( 'src' ) )
require('dotenv').config()

// app.engine( 'handlebars',  hbs() )
// app.set(    'view engine', 'handlebars' )
app.set(    'views',       './dist' )

// app.set('view engine', 'html');
// app.set('views', __dirname + '/views');
// app.set('view engine', 'html');

app.use(methodOverride());
app.use(cookieParser());

app.use(express.urlencoded({ extended : true }));


//Database connection
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@"+process.env.HOST+"/?retryWrites=true&w=majority";
const client = new MongoClient( uri, { useNewURLParser: true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1 });
let collection = null;


//connect to database and grab collection
client.connect() 
  .then( () => {
    return client.db( 'test' ).collection( 'test' )
})
  .then( __collection => {
    collection = __collection
    return collection.find({ }).toArray()
})

app.get('/', function(req, res) {
    res.render('index');
  });
  

app.listen( 8080 )
