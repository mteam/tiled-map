var find = require('find');

module.exports = Map;

function Map(grid) {
  this.grid = grid;
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
  }

};
