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
      console.log(req.body.data)                   //SDFJHSDLKFJHHFD
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

client.connect() 
.then( () => {
  return client.db( 'test' ).collection('youFrees')
})
.then( __collection => {
  youFreeCollection = __collection
  return youFreeCollection.find({ }).toArray()
})

app.post('/view', (req, res) => {
  youFreeCollection.find({"username": currentUser})
  .toArray()
  .then(result => {
    res.json({})
  })
})

app.post('/create', async (req, res) => {
  const json = {
    name: req.body.name,
    users: [],
    creator: currentUser,
    availableTimes: [],
    dateFormat: req.body.dateFormat,
    numDays: req.body.numDays
  }
  await youFreeCollection.insertOne(json)
  const result = await youFreeCollection.findOne({$and: [{"name" :req.body.name}, {"creator": currentUser}] })
  const id = result._id

  const current = await userCollection.findOne({"username": currentUser})
  let currentArray = current.created
  const update = {
    youFreeID: id, 
    userAvail:[]
  }
  currentArray.push(update)
  await userCollection.updateOne(
    {"username": currentUser}),
    { $set: {"created": currentArray}}

  res.redirect('http://localhost:8080/home')
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
  let createdArray = [];
  let invitedArray = [];
  const current = await userCollection.findOne({"username":currentUser})
  console.log(current.created)
  const curCreated = current.created
  const curInvited = current.invited

  let body = {
    "created": curCreated,
    "invited": curInvited
  }
  res.json(body);
})

app.post('/getAvail', async function(req, res) {
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
  const current = await youFreeCollection.find({}).toArray()
  current.forEach((elem, index) => {
    let objString = elem._id.toString()
    if (objString === req.body.youFreeID) {
      res.json(elem.name)
    }
  })
})

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html', function(err) {
        res.status(500).send(err)
    })
})

app.listen( 8080 )
