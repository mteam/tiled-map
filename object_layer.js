var find = require('find');

module.exports = ObjectLayer;

function ObjectLayer(name, objects, props) {
  this.name = name;
  this.objects = objects;
  this.props = props;
}

ObjectLayer.prototype = {

  type: 'object',

  name: function(name) {
    return find(this.objects, { name: name });
  }

};
