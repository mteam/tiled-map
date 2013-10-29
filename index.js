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

  var map = new Map(grid, json.properties);

  var factories = {
    tilelayer: function(lr) {
      return new TileLayer(
        lr.name, grid.clone(lr.width, lr.height),
        lr.data, lr.properties || {}
      );
    },
    objectgroup: function(lr) {
      return new ObjectLayer(
        lr.name, lr.objects,
        lr.properties || {}
      );
    }
  };

  json.layers.forEach(function(lr) {
    var layer = factories[lr.type](lr);
    map.addLayer(layer);
  });

  json.tilesets.forEach(function(ts) {
    var opts = { width: ts.tilewidth, height: ts.tileheight };
    var sheet = new Spritesheet(images[ts.name], opts);
    map.addTileset(sheet, ts.firstgid);
  });

  return map;
};
