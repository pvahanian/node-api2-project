const express = require('express');
const hubsRouter = require('./data/routes')

const server = express();

// are where we configure the app/server
server.use(express.json()); // gives Express the ability to parse the req.body
server.use(hubsRouter)

server.get('/', (req, res) => {
  res.send(`
    <h2>Welcome to Pablos server</h>
    `);
});

// common.js equiv of export default
module.exports = server
