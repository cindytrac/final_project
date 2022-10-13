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
  console.log("/login request: ")
  console.log(req.body)
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
      req.body.created = []
      req.body.invited = []
      console.log(req.body)
      currentUser = req.session.username
      userCollection.insertOne( req.body )
      res.redirect('http://localhost:8080/home')
    }
  })
})

app.post('/logout', (req, res, next) => {
  console.log("/logout request: ")
  console.log(req.body)
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

client.connect() 
.then( () => {
  return client.db( 'test' ).collection('youFrees')
})
.then( __collection => {
  youFreeCollection = __collection
  return youFreeCollection.find({ }).toArray()
})

app.post('/view', (req, res) => {
  console.log("/view request: ")
  console.log(req.body)
  youFreeCollection.find({"username": currentUser})
  .toArray()
  .then(result => {
    res.json({})
  }).then( json => console.log(json))
})

app.post('/create', async (req, res) => {
  console.log("/create request: ")
  console.log(req.body)
  const json = {
    name: req.body.name,
    users: [],
    creator: currentUser,
    availableTimes: [],
    dateFormat: req.body.dateFormat,
    numDays: req.body.numDays,
    youFreeID: ""
  }
  await youFreeCollection.insertOne(json)
  const result = await youFreeCollection.findOne({$and: [{"name" :req.body.name}, {"creator": currentUser}] })
  const id = result._id.toString()
  await youFreeCollection.updateOne({$and: [{"name" :req.body.name}, {"creator": currentUser}] }, {$set: {"youFreeID": id}})

  const current = await userCollection.findOne({"username": currentUser})
  currentArray = current.created
  const update = {
    youFreeID: id, 
    userAvail:[]
  }
  currentArray.push(update)

  await userCollection.updateOne(
    {"username": currentUser},
    { $set: {"created": currentArray}}
  )

  res.redirect('http://localhost:8080/home')
})

app.get('/loadYF', async function(req, res) {
  console.log("/loadYFrequest: ")
  console.log(req.body)
  const data = await youFreeCollection.find({ }).toArray()
  let body = {
    currentUser: currentUser,
    youFreeInfo: data
  }
  res.json(body);
})

app.get('/eventsYF', async function(req, res) {
  console.log("/eventsYF request: ")
  console.log(req.body)
  let createdArray = [];
  let invitedArray = [];
  const current = await userCollection.findOne({"username":currentUser})
  if (current.created !== null) {
    createdArray = current.created
  }
  if (current.invited !== null) {
    invitedArray = current.invited
  }
  
  let body = {
    "created": createdArray,
    "invited": invitedArray
  }
  res.json(body);
})

app.post('/getAvail', async function(req, res) {
  console.log("/getAvail request: ")
  console.log(req.body)
  let selection = []
  let event = []
  const current = await userCollection.findOne({"username":currentUser})
  if (req.body.json.creator === currentUser) {
    event = current.created
  }
  else {
    event = current.invited
  }
  for (let i=0; i < event.length; i++) {
    if (event[i].youFreeID === req.body.json.youFreeID) {
      selection = event[i].userAvail;
    }
  }
  res.json(selection);
})

app.post('/grabName', async function(req, res) {
  console.log("/grabName request: ")
  console.log(req.body)
  const current = await youFreeCollection.find({}).toArray()
  let sendName = ""
  for (let i = 0; i < current.length; i++) {
    let objString = current[i]._id.toString()
    if (objString === req.body.youFreeID) {
      sendName = current[i].name
    }
  }
  res.json(sendName)
})

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html', function(err) {
        res.status(500).send(err)
    })
})

app.listen( 8080 )
