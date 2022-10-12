const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      app     = express(),
      cookie = require( 'cookie-session' )

require('dotenv').config()

app.use( express.json() )
app.use( express.static( 'dist' ) )
app.use( express.static( 'src' ) )
app.use(express.urlencoded({ extended : true }));

// app.engine( 'handlebars',  hbs() )
// app.set(    'view engine', 'handlebars' )
// app.set(    'views',       './dist' )

// app.set('view engine', 'html');
// app.set('views', __dirname + '/views');
// app.set('view engine', 'html');

// app.use(methodOverride());
// app.use(cookieParser());

//Database connection
const uri = "mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@"+process.env.HOST+"/?retryWrites=true&w=majority";
const client = new mongodb.MongoClient( uri, { useNewURLParser: true, useUnifiedTopology:true });
let userCollection = null;
let youFreeCollection = null;
let currentUser = null;
let totalYouFrees = 0;

//connect to database and grab collection
app.use( cookie({
  name: 'session',
  keys: ['key934537823', 'key974123823']
}))

client.connect() 
  .then( () => {
    return client.db( 'test' ).collection( 'test' )
})
  .then( __collection => {
    userCollection = __collection
    return userCollection.find({ }).toArray()
})

app.post('/login', (req, res) => {
  userCollection.find({username: req.body.username})
  .toArray()
  .then(result => {
    req.session.username = req.body.username
    req.session.password = req.body.password

    if (result.length > 0) {
      if (req.body.password === result[0].password) {
        req.session.login = true
        currentUser = req.session.username
        // redirect to home page
        res.redirect('http://localhost:8080/home')
      } else {
        // stay at login page
        res.redirect('http://localhost:8080')
      }
    } else {
      req.body.data = []
      userCollection.insertOne( req.body )
      res.redirect('http://localhost:8080/home')
    }
  })
})

app.post('/logout', (req, res, next) => {
  req.session.login = false
  next()
})

app.use( function(req, res, next) {
  if ( req.session.login === true ) {
    next()
  } else {
    res.redirect('http://localhost:8080')
  }
})

// app.get('/', function(req, res) {
//     res.render('index');
//   });

client.connect() 
.then( () => {
  return client.db( 'test' ).collection('youFrees')
})
.then( __collection => {
  youFreeCollection = __collection
  return youFreeCollection.find({ }).toArray()
})

app.post('/view', (req, res) => {
  console.log("in view post")
  res.redirect('http://localhost:8080/edit-calendar') //want to redirect with youFreeID
  console.log("in view post 2")
})

app.post('/create', async (req, res) => {
  const scheudleVal = req.body.scheudle;
  const creator = req.body.creator;
  const youFreeID = totalYouFrees;
  totalYouFrees += 1;
  const current = userCollection.findOne({"username": creator})
  let currentArray = current.created
  currentArray.push(youFreeID)
  userCollection.updateOne(
    {username:creator}),
    { $set: {"created": currentArray}}

  userCollection.insertOne()

  

})

app.get('/loadYF', async function(req, res) {
  const data = await youFreeCollection.find({ }).toArray()
  let body = {
    currentUser: currentUser,
    youFreeInfo: data
  }
  res.json(body);
})

app.get('/eventsYF', async function(req, res) {
  let created = [];
  let invited = [];
  const current = await userCollection.find({"username":currentUser}).toArray()
  const curCreated = current.created
  const curInvited = current.invited

  curCreated.forEach( async (element, index) => {
    let youFreeID = element.youFreeID;
    const cur = await youFreeCollection.findOne({"youFreeID": youFreeID})
    let json = {
      
    }
    created.push(youFreeCollection.findOne({"youFreeID": youFreeID}))
  })

  console.log("we doing all right");

  const invitedYouFrees = userCollection.find({}).toArray().invited;
  invitedYouFrees.forEach((element, index) => {
    let youFreeID = element.youFreeID;
    invited.append(youFreeCollection.findOne({"youFreeID": youFreeID}))
  })

  let body = {
    createdYouFrees: created,
    invitedYouFrees: invited
  }
  res.json(body);
})

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html', function(err) {
        res.status(500).send(err)
    })
})

app.listen( 8080 )
