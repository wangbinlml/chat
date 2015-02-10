var log4js = require('log4js');
var path = require('path');
log4js.configure(process.cwd() + '/config/log4js.json', {
    reloadSecs: 300
});

exports.getLogger=function(category){
    return log4js.getLogger(category);
};
