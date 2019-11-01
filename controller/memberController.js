'use strict'
//model
const MemberModel = require('../model/MemberModel');

//classes;
const member = require('../entities/member');
const logger =require('../util/logger');


function createMember(req,res){
    member.create(MemberModel,req.body)
    .then(()=>{
        logger.info('New Record Created');
        res.json({ message: 'New Record Created'});
    })
    .catch((err)=>{
        res.status(500).json({ message: err});
    });
}

function deleteMember(req,res){
    member.remove(MemberModel,req.params.id)
    .then(()=>{
        logger.info('Member Deleted');
        res.json({ message: 'Member deleted'});
    })
    .catch((err)=>{
        res.status(500).json({ message: err});
    });
}

const MemberController = function(){
    this.createMember = createMember;
    this.deleteMember = deleteMember;
}


module.exports =new MemberController;