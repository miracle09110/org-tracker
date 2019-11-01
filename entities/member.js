'use strict'
const crypto = require('crypto');

function create(MemberModel, info){
    return new Promise((resolve,reject)=>{
        var currentDate = (new Date()).valueOf().toString();
        const newMember = {
            _id : crypto.createHash('sha1').update(currentDate + info.firstName).digest('hex'),
            name : {
                first_name: info.firstName,
                last_name: info.lastName,
                middle_initial: info.middleInitial, 
                nickname: info.nickname
            },
            contact_info : {
                email: info.email,
                phone_number: info.phoneNumber,
            },
            profession: { 
                job_title: info.jobTitle,
                employer: info.employer,
                field: info.field
            },
            batch: info.batch,
            status: 'active'
        }

        MemberModel.create(newMember,(err,result)=>{
            if(err){
                reject(err);
            }else {
                resolve(result);
            }
        });
    });
}


function remove(MemberModel, id){
    return new Promise((resolve,reject)=>{
        MemberModel.deleteOne({_id: id},(err)=>{
            if(err){
                reject(err);
            }else {
                resolve(result);
            }
        });
    });
}


const Member = function(){
    this.create = create;
    this.remove = remove;
}

module.exports = new Member;