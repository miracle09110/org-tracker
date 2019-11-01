
// NPM Modules
var fse = require('fs-extra');
var fs = require('fs');
var CONST = require('../constant');

var fd;
var timestamp;

fse.ensureDirSync('./logs/');

function rotateLogFile()
{
    var curTime = new Date();
    var month = (curTime.getMonth() + 1 > 9 ) ? curTime.getMonth() + 1 : ('0' + (curTime.getMonth() + 1));
    var date = (curTime.getDate() > 9) ? curTime.getDate() : '0' + curTime.getDate();
    var curTimestamp = curTime.getFullYear() + "-" + month  + "-" + date;

    if(curTimestamp !== timestamp){
        if(fd){
            fs.close(fd, ()=>{
                console.log("close");
            });
        }
        timestamp = curTimestamp;
        fd = fs.openSync('./logs/' +timestamp+'-org-tracker.log', 'a');
    }
    
    return setTimeout( function(){
            rotateLogFile();
        }, 60 * CONST.TIME.SECONDS_PER_MINUTE * CONST.TIME.MS_PER_SECOND
    );
}

var Logger = require('tracer').colorConsole({
    format : "[{{title}}][{{timestamp}}]: {{message}} ~~ [{{file}}:{{line}}]",
    dateformat : "yyyy-mm-dd_h:MM:ss TT",
    transport : function(data) {
        console.log(data.output);
        fs.write(fd, data.output+"<br>\n", 'utf8',(err)=>{
                if(err) console.log(err);
            }
        );
    }
});

Logger.requestLogger = function(req,res,next) {
    var requestInfo = req.connection.remoteAddress + ' - - \"' + req.method + ' ' + req.url + ' - ' + res.statusCode + ' - ' + req.headers['user-agent'] + ' ' + req.headers['accept'] + '\"';
    Logger.debug(requestInfo);
    next();
};

Logger.init = function(){
    rotateLogFile();
}

module.exports = Logger;