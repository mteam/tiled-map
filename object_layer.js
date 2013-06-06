var find = require('find');

module.exports = ObjectLayer;

function ObjectLayer(name, objects) {
  this.name = name;
  this.objects = objects;
}

ObjectLayer.prototype = {

  name: function(name) {
    return find(this.objects, { name: name });
  },

  type: function(type) {
    return find(this.objects, { type: type });
  }

};
