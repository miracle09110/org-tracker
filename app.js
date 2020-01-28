'use strict'
//NPM
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const grapqlHTTP = require('express-graphql');

//classes
const logger = require('./util/logger');
const db = require('./db/mongo');
const CONSTANT = require('./constant');
const authChecker = require('./security/authChecker');
const imageUpdater = require('./util/imageUpdater');
const schema = require('./schema/schema');

//models
const Activity = require('./model/ActivityModel');

//initilizations
logger.init();
dotenv.config();
const app = express();


//Mongo Settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
db.connectToDB(CONSTANT.MONGO,mongoose)
.then((result) => {
    logger.info('Connected to DB Success!')
})
.catch((err)=>{
    logger.error(err);
    throw err;
})

//middleware
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
//app.use(authChecker.validate);
app.use(cors());
app.use('/graphql',grapqlHTTP({
    schema,
    graphiql: true
}));

app.listen(process.env.PORT || 1973,()=>{
    logger.debug(`Listening to ${process.env.PORT}`);
});

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/views/index.html'));
});