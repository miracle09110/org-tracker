'use strict'

const mongoConfig = {
    useNewUrlParser:true,
    useUnifiedTopology: true
}

async function connectToDB(options,mongoose){
    return new Promise((resolve,reject)=>{
        console.log('Connecting to dB..')
        if(!options.db){
            reject('No Database');
        }

        if(!options.host){
            reject('No Host');
        }

        let port;
        if (!options.port){
            port = 27017;
        }else {
            port = options.port;
        }
        try {
            mongoose.connect(`mongodb://${options.host}:${port}/${options.db}`, mongoConfig)
            .then(()=>{
                resolve();
            })
            .catch((err) =>{
                reject(err);
            });
            
        } catch(err){
            reject(err);
        }
    });
}


const MongoDB = function(){
    this.connectToDB = connectToDB;
}

module.exports = new MongoDB;