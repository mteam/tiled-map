var find = require('find'),
    TileLayer = require('./tile_layer.js');

module.exports = Map;

function Map(grid, props) {
  this.grid = grid;
  this.properties = props;
  this.layers = [];
  this.tilesets = [];
  this.tiles = {};
}

Map.prototype = {

  addLayer: function(layer) {
    this.layers.push(layer);
  },

  addTileset: function(sheet, id) {
    sheet.sprites.forEach(function(sprite) {
      this.tiles[id++] = sprite;
    }, this);
  },

  getLayer: function(name) {
    return find(this.layers, { name: name });
  },

  getTileset: function(name) {
    return find(this.tilesets, { name: name });
  },

  predraw: function() {
    var tiles = this.tiles;

    this.layers.forEach(function(layer) {
      if (layer instanceof TileLayer) {
        layer.predraw(tiles);
      }
    });
  }

};
