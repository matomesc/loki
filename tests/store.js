var assert = require('assert');
var sinon = require('sinon');
var store = require('../lib/store');
var Snapshot = store.Snapshot;

describe('store.Snapshot', function () {
  describe('save', function () {
    it('should save the new snapshot', function (done) {
      var snapshot = new Snapshot({
        url: 'http://twitter.com',
        ttl: 300,
        crawl: false
      });
      snapshot.save(function (err) {
        assert.ifError(err);
        Snapshot.getByKey(snapshot.key, function (err, savedSnapshot) {
          assert.ifError(err);
          assert(savedSnapshot.key === snapshot.key);
          assert(savedSnapshot.url === snapshot.url);
          done();
        });
      });
    });
  });
});
