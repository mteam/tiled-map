var Canvas = require('canvas');

function TileLayer(name, grid, data) {
  this.name = name;
  this.grid = grid;
  this.data = data;

  this.canvas = Canvas.fromSize(grid.total.width, grid.total.height);
}

TileLayer.prototype = {

  type: 'tile',

  predraw: function(tiles) {
    var canvas = this.canvas;

    this.iterate(function(x, y, id) {
      id > 0 && tiles[id].draw(canvas.ctx, x, y);
    });
  },

  iterate: function(fn) {
    var data = this.data;
    var i = 0;

    this.grid.iterate(function(x, y) {
      fn(x, y, data[i++]);
    });
  }

};

module.exports = TileLayer;
