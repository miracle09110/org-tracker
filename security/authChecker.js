'use strict'
const CONSTANT = require('../constant');
const credentials = require('./credentials');
const UserModel = require('../model/UserModel');

function validate(req,res,next){
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(400).json({ message: 'Missing Authorization Header' });
    } else {
        const token =  req.headers.authorization.split(' ')[1];
        if(token === CONSTANT.TOKEN) {
            next();
        }else {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    }
}

function checkCredentials(req,res){
    credentials.check(req,res, UserModel);
}


let AuthChecker = function(){
    this.validate = validate;
    this.checkCredentials = checkCredentials;
}

module.exports = new AuthChecker();