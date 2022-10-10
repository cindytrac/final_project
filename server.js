const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      app     = express(),
      //passport = require('passport'),
      hbs     = require( 'express-handlebars' ).engine,
      config = require('./src/config.js'),
      bunyan = require('bunyan'),
      morgan = require('morgan');
      cookieParser = require('cookie-parser'),
      //expressSession = require('express-session'),
      methodOverride = require('method-override');

app.use( express.json() )

app.use( express.static( 'dist' ) )
app.use( express.static( 'src' ) )
require('dotenv').config()

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './dist' )
app.use(morgan('dev'));
app.use(methodOverride());
app.use(cookieParser());

app.use(express.urlencoded({ extended : true }));

//Database connection
// const { MongoClient, ServerApiVersion } = require('mongodb')
// const uri = "mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@"+process.env.HOST+"/?retryWrites=true&w=majority";
// const client = new MongoClient( uri, { useNewURLParser: true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1 });
// let collection = null;
//const MongoStore = require('connect-mongo')(expressSession);

// //Quickstart here
// let OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

// let log = bunyan.createLogger({
//     name: 'Microsoft OIDC Example Web Application'
// });

// //keeping user info
// passport.serializeUser(function(user, done) {
//     done(null, user.oid);
//   });
  
//   passport.deserializeUser(function(oid, done) {
//     findByOid(oid, function (err, user) {
//       done(err, user);
//     });
//   });
  
//   // array to hold logged in users
//   let users = [];
  
//   let findByOid = function(oid, fn) {
//     for (let i = 0, len = users.length; i < len; i++) {
//       let user = users[i];
//      log.info('we are using user: ', user);
//       if (user.oid === oid) {
//         return fn(null, user);
//       }
//     }
//     return fn(null, null);
//   };


//   passport.use(new OIDCStrategy({
//     identityMetadata: config.creds.identityMetadata,
//     clientID: config.creds.clientID,
//     responseType: config.creds.responseType,
//     responseMode: config.creds.responseMode,
//     redirectUrl: config.creds.redirectUrl,
//     allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
//     clientSecret: config.creds.clientSecret,
//     validateIssuer: config.creds.validateIssuer,
//     isB2C: config.creds.isB2C,
//     issuer: config.creds.issuer,
//     passReqToCallback: config.creds.passReqToCallback,
//     scope: config.creds.scope,
//     loggingLevel: config.creds.loggingLevel,
//     nonceLifetime: config.creds.nonceLifetime,
//     nonceMaxAmount: config.creds.nonceMaxAmount,
//     useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
//     cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
//     clockSkew: config.creds.clockSkew,
//   },
//   function(iss, sub, profile, accessToken, refreshToken, done) {
//     if (!profile.oid) {
//       return done(new Error("No oid found"), null);
//     }
//     // asynchronous verification, for effect...
//     process.nextTick(function () {
//       findByOid(profile.oid, function(err, user) {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           // "Auto-registration"
//           users.push(profile);
//           return done(null, profile);
//         }
//         return done(null, user);
//       });
//     });
//   }
// ));

// // set up session middleware
// if (config.useMongoDBSessionStore) {
//     client.connect();
//     app.use(expressSession({
//       secret: 'secret',
//       cookie: {maxAge: config.mongoDBSessionMaxAge * 1000},
//       store: new MongoStore({
//         mongoConnection: mongodb.connection,
//         clear_interval: config.mongoDBSessionMaxAge
//       })
//     }));
//   } else {
//     app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
//   }


// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static(__dirname + '/../../public')); 

// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) { return next(); }
//     res.redirect('/login');
//   };

// //connect to database and grab collection
// client.connect() 
//   .then( () => {
//     return client.db( 'test' ).collection( 'test' )
// })
//   .then( __collection => {
//     collection = __collection
//     return collection.find({ }).toArray()
// })

// app.get('/', function(req, res) {
//     res.render('login', { user: req.user, layout:false });
//   });
  
//   // '/account' is only available to logged in user
//   app.get('/account', ensureAuthenticated, function(req, res) {
//     console.log(req.user);
//     res.render('account', { user: req.user, layout:false });
//   });
  
//   app.get('/login',
//     function(req, res, next) {
//       passport.authenticate('azuread-openidconnect', 
//         { 
//           response: res,                      // required
//           resourceURL: config.resourceURL,    // optional. Provide a value if you want to specify the resource.
//           customState: 'my_state',            // optional. Provide a value if you want to provide custom state value.
//           failureRedirect: '/' 
//         }
//       )(req, res, next);
//     },
//     function(req, res) {
//       log.info('Login was called in the Sample');
//       res.redirect('/');
//   });
  
//   // 'GET returnURL'
//   // `passport.authenticate` will try to authenticate the content returned in
//   // query (such as authorization code). If authentication fails, user will be
//   // redirected to '/' (home page); otherwise, it passes to the next middleware.
//   app.get('/auth/openid/return',
//     function(req, res, next) {
//       passport.authenticate('azuread-openidconnect', 
//         { 
//           response: res,    // required
//           failureRedirect: '/'  
//         }
//       )(req, res, next);
//     },
//     function(req, res) {
//       log.info('We received a return from AzureAD.');
//       res.redirect('/');
//     });
  
//   // 'POST returnURL'
//   // `passport.authenticate` will try to authenticate the content returned in
//   // body (such as authorization code). If authentication fails, user will be
//   // redirected to '/' (home page); otherwise, it passes to the next middleware.
//   app.post('/auth/openid/return',
//     function(req, res, next) {
//       passport.authenticate('azuread-openidconnect', 
//         { 
//           response: res,    // required
//           failureRedirect: '/'  
//         }
//       )(req, res, next);
//     },
//     function(req, res) {
//       log.info('We received a return from AzureAD.');
//       res.redirect('/');
//     });
  
//   // 'logout' route, logout from passport, and destroy the session with AAD.
//   app.get('/logout', function(req, res){
//     req.session.destroy(function(err) {
//       req.logOut();
//       res.redirect(config.destroySessionUrl);
//     });
//   });

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html', function(err) {
        res.status(500).send(err)
    })
})

app.listen( 8080 )
