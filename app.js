'use strict'
//NPM
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const grapqlHTTP = require('express-graphql');
const sassMiddleware = require('node-sass-middleware');

//classes
const logger = require('./util/logger');
const db = require('./db/mongo');
const CONSTANT = require('./constant');
const authChecker = require('./security/authChecker')
const schema = require('./schema/schema');


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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(authChecker.validate);
app.use(cors());
app.use('/graphql',grapqlHTTP({
    schema,
    graphiql: true
}));
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use('/stylesheets',express.static(path.join(__dirname,'./stylesheets')));
app.use('/js',express.static(path.join(__dirname,'./js')));
app.use('/views',express.static(path.join(__dirname,'./views')));
app.use('/images',express.static(path.join(__dirname,'./images')));


app.listen(process.env.PORT || 1973,()=>{
    logger.debug(`Listening to ${process.env.PORT}`);
});

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

