var restify = require('restify');
var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ds-db');

mongoose.Promise = global.Promise;
 
var server = restify.createServer({
    name: 'ds-server',
    version: '0.0.0'
});

var basePath = '/api/v0';
 
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "X-Requested-With, link");
    return next();
  }
);

server.get(/\/public\/?.*/, restify.serveStatic({
  directory: __dirname
}));

require('./models');

restifyMongoose(mongoose.model('User')).serve(basePath + '/users', server);
restifyMongoose(mongoose.model('Person')).serve(basePath + '/people', server);

server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});
