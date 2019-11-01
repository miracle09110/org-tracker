'use strict'
//NPM
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//classes
const logger = require('./util/logger');
const db = require('./db/mongo');
const CONSTANT = require('./constant');
const authChecker = require('./security/authChecker');
const member = require('./controller/memberController');


//initilizations
logger.init();
const app = express();

db.connectToDB(CONSTANT.MONGO,mongoose)
.then((result) => {
    logger.info('Connected to DB Success!')
})
.catch((err)=>{
    logger.error(err);
    throw err;
})

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authChecker.validate);

app.listen(1987,()=>{
    logger.debug(`Listening to 1987`);
});

app.post('/api/v1.0.0/user',member.createMember);
app.delete('/api/v1.0.0/user/:id',member.deleteMember);
