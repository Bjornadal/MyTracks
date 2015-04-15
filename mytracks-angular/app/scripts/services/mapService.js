/**
 * Created by andreasb on 19.12.14.
 */
var app = angular.module('myTracks2App');

app.service("mapService", function(statkartMapType) {
  var _map;
  var _panoramioLayer;
  var _slopeLayer;
  var _cautionLayer;

  this.init = function(map) {
    _map = map;

    // Init panoramio layer
    _panoramioLayer = new google.maps.panoramio.PanoramioLayer();

    // Init slope layer
    _slopeLayer = new gmaps.ags.MapOverlay('http://gis2.ngi.no/arcgisprodpub/rest/services/Skred/BratteOmr/MapServer', {
      name: 'Helning',
      opacity: 0.3
    });

    // Init caution layer
    _cautionLayer = new gmaps.ags.MapOverlay('http://gis3.nve.no/map/rest/services/SkredSnoAktR/MapServer', { // 'http://gis3.nve.no/map/rest/services/SkredSnoAkt/MapServer'
      name: 'Aktsomhet',
      opacity: 0.4,
      exportOptions: {
        layerIds:[2,1,0],
        layerOption: 'show',
        layerDefinitions: {
          '0': "",
          '1': "",
          '2': ""
        }
      }
    });

    // Mo i Rana
    var xPoint = new String("66.314045962929");
    var yPoint = new String("14.142504436098");
    var myLatLng = new google.maps.LatLng(xPoint, yPoint);

    var myOptions = {
      panControl: true,
      zoom: 12,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      mapTypeControlOptions: {
        mapTypeIds: ['topo2', 'toporaster2', 'terrain', 'hybrid'],
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      }
    };

    map.setOptions(myOptions);
    map.mapTypes.set('topo2', new statkartMapType("Topografisk", "topo2"));
    map.mapTypes.set('toporaster2', new statkartMapType("Toporaster", "toporaster2"));
    map.setMapTypeId('topo2');
  }

  this.getMap = function() {
    return _map;
  }

  this.togglePanoramio = function() {
    if (_panoramioLayer.getMap()) {
      _panoramioLayer.setMap(null);
    }
    else {
      _panoramioLayer.setMap(_map);
    }
  }

  this.toggleSlope = function() {
    if (_slopeLayer.getMap()) {
      _slopeLayer.setMap(null);
    }
    else {
      _slopeLayer.setMap(_map);
    }
  }

  this.toggleCaution = function() {
    if (_cautionLayer.getMap()) {
      _cautionLayer.setMap(null);
    }
    else {
      _cautionLayer.setMap(_map);
    }
  }
});
