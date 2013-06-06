var Canvas = require('canvas');

function TileLayer(name, grid, data) {
  this.name = name;
  this.grid = grid;
  this.data = data;

  this.canvas = Canvas.fromSize(grid.total.width, grid.total.height);
}

TileLayer.prototype = {

  predraw: function(tiles) {
    var data = this.data,
        canvas = this.canvas,
        i = 0;

    this.grid.iterate(function(x, y) {
      var id = data[i++];
      id > 0 && tiles[id].draw(canvas.ctx, x, y);
    });
  }

};

module.exports = TileLayer;
