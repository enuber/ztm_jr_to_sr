import express from 'express';
import React from 'react';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import App from './App';

const app = express();

// serve static files using express static middleware.
app.use(express.static('/public'));

// reading the file with fs and parsing it because of how we need the info sent to the frontend.
const robots = JSON.parse(fs.readFileSync('/public/robots.json', 'utf8'));
//creating a react element called App.
const RobotfriendsApp = React.createElement(App);
// at root directory, we do a get request and we render the index page with content.
app.get('/', (req, res) => {
  res.render('index', {
    // comes from react-dom/server, it renders robogriends app and convert it to a string. Have to send the client text so use renderToString. We also pass it some props so we are sending data that are the robots.
    content: renderToString(RobotfriendsApp({ data: robots })),
  });
});

// Trick with this is that we need react on both the browser and the server. We are sending from server a string to front end and we use ReactDOM.hydrate() to read that string and do what it needs to do to attach event handlers but otherwise keep everything else as is.

// in newer react versions ther is ReactDOMServer.renderToNodeStream() that is similar to renderToString() that makes things faster.
