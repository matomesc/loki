var restify = require('restify');
var redis = require('redis');

function LokiAPI(options) {
  this.port = options.port || 8888;
  this.redisPort = options.redisPort || 6379;
  this.redisHost = options.redisHost || '127.0.0.1';
  this.server = restify.createServer({
    name: 'loki-api',
    version: '1.0.0'
  });
  this.redisClient = redis.createClient(this.redisPort, this.redisHost);
  this.setupServer();
  this.setupRedis();
}

LokiAPI.prototype.start = function() {
  var self = this;
  return this.server.listen(this.port, function() {
    return console.log("Loki API listening on port " + self.port);
  });
};

LokiAPI.prototype.setupServer = function() {
  this.server.use(restify.requestLogger);
  this.server.use(restify.acceptParser(server.acceptable));
  this.server.use(restify.queryParser);
  this.server.use(restify.bodyParser);
  return this.server.get('/snapshots', function(req, res, next) {
    var url;
    url = req.params.url;
    if (url == null) {
      return next(new restify.MissingParameterError);
    }
    res.send({
      ok: true
    });
    return next();
  });
};

LokiAPI.prototype.setupRedis = function() {
  return this.redisClient.on('ready', function() {
    return "Loki Redis client connected to " + this.redisHost + ":" + this.redisPort;
  });
};


module.exports = LokiAPI;
