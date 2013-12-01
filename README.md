# Loki

Loki is a crawler that executes javascript.

## Motivation

Suppose you are writing an e-commerce site as a single page app. You're losing SEO
potential since most crawlers won't execute your javascript. Loki to the rescue.

## Installation

```
npm install -g loki
```

## Quickstart

TODO

## API Server

This is the server that your web app will interact with. Upon getting a
request from a crawler, your web app should hit up Loki for a snapshot
of the requested url.

### Getting snapshots

```
GET /snapshots?url=http%3A%2F%2Ftwitter.com%2Fmatomesc

{
  "url": "http://twitter.com/matomesc",
  "followLinks": true,
  "matchDomain": "mydomain.com",
  "interval": 3600
  "createdAt": "2013-11-03T14:33:15",
  "crawledAt": "2013-11-03T14:33:14",
  "data": "some html",
  "urls": [ /* other urls found */ ]
}
```

## Crawler Server

### Crawl URL

```
GET /crawl?url=http%3A%2F%2Ftwitter.com%2Fmatomesc

<html>
  ...
</html>
```

## Redis Store

Key format:

```
<url>
<url>:ttl
<url>:created
<url>:only
<url>:crawl
```
