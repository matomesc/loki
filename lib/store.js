var crypto = require('crypto');
var redis = require('./redis');

function Snapshot(data) {
  this.key = Snapshot.getKey(data.url);
  this.data = {
    key: this.key,
    url: data.url,
    ttl: data.ttl,
    created: data.created || Date.now(),
    crawl: data.crawl || false,
    data: data.data || null
  };
}

Snapshot.prototype.save = function (callback) {
  redis.hmset(this.key, this.data, callback);
};

Snapshot.getHash = function (url) {
  return crypto.createHash('sha1').update(url).digest('hex');
};

Snapshot.getKey = function (url) {
  var hash = Snapshot.getHash(url);
  return "url:" + hash;
};

Snapshot.getByURL = function (url, callback) {
  var key = Snapshot.getKey(url);
  return Snapshot.getByKey(key, callback);
};

Snapshot.getByKey = function (key, callback) {
  redis.hgetall(key, function (err, data) {
    if (err) {
      return callback(err)
    }
    return callback(null, new Snapshot(data));
  });
};

Snapshot.remove = function (key, callback) {
  redis.del(key, callback);
};

exports.Snapshot = Snapshot;