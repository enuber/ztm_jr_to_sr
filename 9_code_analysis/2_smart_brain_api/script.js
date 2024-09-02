import express from './node_modules/express/index.js';
import bcrypt from './node_modules/bcrypt-nodejs/bCrypt.js';
import cors from './node_modules/cors/lib/index.js';
import knex from './node_modules/knex/knex.mjs';
import morgan from './node_modules/morgan/index.js';

// NOTE REMEMBER - have to have  "type": "module", in package.json to import/export
import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleProfile } from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

// const express = require('express');
// const bcrypt = require('bcrypt-nodejs');
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// const cors = require('cors');
// const knex = require('knex');

//note that the default here is 127.0.0.1 which is localhost
//have to fill out all the info, can get user from doing \d in terminal of the database and will show the owner. 3306
// port 5432 is the port that pg is running on.

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI,
  // connection: {
  // updated these to match the docker-compose.yml file, it grabs these from that file, if not using the URI in the .yml file then you would do this.
  // host: process.env.POSTGRES_HOST,
  // user: process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASSWORD,
  // database: process.env.POSTGRES_DB,

  // host: '127.0.0.1',
  // port: 5432,
  // user: 'eriknuber',
  // password: '',
  // database: 'smart-brain',
  // },
});

// console.log(db.select('*').from('users'));

// db.select('*')
//   .from('users')
//   .then((data) => console.log(data));

const app = express();

const whitelist = ['http://localhost:3001'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

//middleware to allow the data coming in to be read.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('combined'));
app.use(cors(corsOptions));

// const database = {
//   users: [
//     {
//       id: '123',
//       name: 'John',
//       email: 'john@gmail.com',
//       password: 'cookies',
//       entries: 0,
//       joined: new Date(),
//     },
//     {
//       id: '124',
//       name: 'Sally',
//       email: 'sally@gmail.com',
//       password: 'bananas',
//       entries: 0,
//       joined: new Date(),
//     },
//   ],
//   login: [
//     {
//       id: '987',
//       hash: '',
//       email: 'john@gmail.com',
//     },
//   ],
// };

app.get('/', (req, res) => {
  // res.send(database.users);
  res.send('success');
});

//instead of using res.send() express comes with built JSOn method called res.json(). Can still send JSON using res.send(). Slight difference in what is received. When you send the request it goes through as a JSON string not just a string
app.post('/signin', (req, res) => handleSignin(req, res, db, bcrypt));

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));

//the :id means we can put anything in the url and be able to grab this ID through the request.params property
app.get('/profile/:id', (req, res) => handleProfile(req, res, db));

app.put('/image', (req, res) => handleImage(req, res, db));

app.post('/imageurl', (req, res) => handleApiCall(req, res));

//with app.listen() you pass in the port to go to and can have a function attached that can be used for anything
app.listen(3000, () => {
  console.log('app is running on port 3000');
});

/* 
after basic set up should plan out the routes. Along with this, it is best practice to test out what you are doing using using postman. Remember to change the type from GET, POST, PUT etc. when testing in postman. Also in Postman, when you use body and choose raw and then JSON. Postman also has "history" on the left side menu so you can see what you've done and rerun things you have done.

Also, we are using a database array in lieu of an actual database to begin with just to test. One of the big issues with this way of doing things is getting data and having to loop through an array to find what you are looking for. An actual DB is better suited for this.

/ -> res = this is working

/signin - POST request because we are Posting some data that is the user information. Response is either success/fail. We are doing this as a POST because we are dealing with a password so it is hidden from view. 

/register - POST request because we are adding data to data to the DB with new user info. Response is either user object 

/profile/:userId - GET request where we get the user information and return the user. (note that /:userID is so that each user has their own page)

/image - PUT - updating score for how many images scanned, so will get back the user or count updated. 
  
*/
/*
need to have passwords in hashes. here we are using bcrypt-nodejs which is deprecated, can use bcrypt.js instead.




// Load hash from your password DB.
  bcrypt.hash(password, null, null, function (err, hash) {
    // Store hash in your password DB.
    console.log(hash);
  });

bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});

*/
/*
1) min 8 char max 64, longer the better. Accept ASCII and Unicode, no hints, no security questions, use 2FA. When logging in and a mistake just say that hte combi is incorrect. passowrds should only be reset by user or by an admin only if account is comporomised. Othewriwse just user

2) POST only. using HTTPS

3) Hash the password, using argon2, scrypt, bcrypt. Salt it. Bcrypt allows saltRound 10 rounds is recommended. 
*/
