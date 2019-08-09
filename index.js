const express = require('express');
const bunyan = require('bunyan');
const debug = require('debug');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

const logger = bunyan.createLogger({name: "Server Log"});

var myLogger = (req,res,next)=>{
    logger.info(`new request on : ${ Date.now()}`);
    next();
};

app.use(myLogger);

app.get('/',(req,res)=> res.send("Hello world "));

app.get('/search',(req,res)=>{
    res.send(JSON.parse(fs.readFileSync('feeds.json')));
});

process.on('uncaughtException',(err)=>{
    logger.error(' Caught exception: ${err}');
});
let port= process.env.port || 3005
app.listen(port,'localhost',()=> debug('listening ${ port }'));