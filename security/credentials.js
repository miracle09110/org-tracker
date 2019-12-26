'use strict'

let UserModel;

function check(req,res,model) {
    UserModel = model;
    if (!req.body.user || !req.body.password){
        res.sendStatus(400);
    }

    UserModel.findOne({_id : req.body.user},(err,user)=>{
        if (user.password === req.body.password){
            res.render('database');
        }else {
            res.sendStatus(401);
        }
    });
}

const Credentials = function(){
   this.check = check; 
}


module.exports = new Credentials;