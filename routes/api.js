/**
 * Created by sagarsaurus on 6/25/15.
 */
//this is where we will create the api.  The entire graph will be passed into the api as a json string.
//we will parse it as a json, build a graph, and find the shortest path.  Then, we will return the shortest path
//the shortest path will be processed on the client side and displayed on a google map.  Simple as that
var express = require('express');
var router = express.Router();
var Graph = require('node-dijkstras');
var g = new Graph();

var api = {
  shortestPath: function(req, res) {
      //build graph and implement dijkstra's algorithm here
  }
};

router.post('/shortestPath', api.shortestPath);

module.exports = router;