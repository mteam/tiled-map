var Grid = require('grid'),
    Spritesheet = require('spritesheet'),
    Map = require('./map.js'),
    TileLayer = require('./tile_layer.js'),
    ObjectLayer = require('./object_layer.js');

exports.load = function(json, images) {
  var grid = new Grid(
    json.width, json.height,
    json.tilewidth, json.tileheight
  );

  var map = new Map(grid);

  var factories = {
    tilelayer: function(lr) {
      return new TileLayer(lr.name, grid.clone(lr.width, lr.height), lr.data);
    },
    objectlayer: function(lr) {
      return new ObjectLayer(lr.name, lr.objects);
    }
  };

  json.layers.forEach(function(lr) {
    var layer = factories[lr.type](lr);
    map.addLayer(layer);
  });

  json.tilesets.forEach(function(ts) {
    var sheet = new Spritesheet(images[ts.name], ts.tilewidth, ts.tileheight);
    map.addTileset(sheet, ts.firstgid);
  });

  return map;
};
