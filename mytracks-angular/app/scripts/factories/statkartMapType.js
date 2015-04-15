/**
 * Created by andreasb on 19.12.14.
 */
angular.module('myTracks2App')
  .factory("statkartMapType", function statkartMapTypeFactory() {
    return function(name, layer) {
      this.layer = layer;
      this.name = name;
      this.alt = name;

      this.tileSize = new google.maps.Size(256, 256);
      this.maxZoom = 19;
      this.getTile = function (coord, zoom, ownerDocument) {
        var div = ownerDocument.createElement('DIV');
        div.style.width = this.tileSize.width + 'px';
        div.style.height = this.tileSize.height + 'px';
        div.style.backgroundImage = "url(http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=" + this.layer + "&zoom=" + zoom + "&x=" + coord.x + "&y=" + coord.y + ")";
        return div;
      };
    }
  });
