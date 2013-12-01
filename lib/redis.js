var redis = require('redis');

var PORT = 6379;
var HOST = '127.0.0.1';

var client = redis.createClient(PORT, HOST);

module.exports = client;