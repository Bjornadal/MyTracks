var map;
var trackColorIndex = 0;
  
function LoadTracks(lonlat, trackTitle, trackPopup) { 
    var loypeColor = new Array; 
  
    //Track colors 
    loypeColor[0] = "#0000FF";    // Blue 
    loypeColor[1] = "#FF0000";    // Red 
    loypeColor[2] = "#A000A0";    // Purple 
    loypeColor[3] = "#00AA40";    // Green 
    loypeColor[4] = "#FF9900";    // Orange 
    loypeColor[5] = "#FFFF00";    // Yellow
    loypeColor[6] = "#00FFFF";    // Teal 
    loypeColor[7] = "#A000A0";    // Purple 
    loypeColor[8] = "#A52A2A";    // Brown 
    loypeColor[9] = "#FFC0CB";    // Pink 
    
    for (var l = 0; l < lonlat.length; l++) { 
        var loypeOptions = { 
            path: lonlat[l], 
            strokeColor: loypeColor[trackColorIndex], 
            strokeOpacity: 0.8, 
            strokeWeight: 4 
        }; 
        
        var track = new google.maps.Polyline(loypeOptions); 
        track.setMap(map); 
    } 
  
    if (lonlat != null && lonlat[0] != null) { 
        // Centers map to track startpoint 
        map.setCenter(lonlat[0][0]); 
  
        //Start + finish icon 
        var imageStart = 'http://www.google.com/mapfiles/dd-start.png'; 
        var startLatLng = lonlat[0][0]; 
        var startMarker = new google.maps.Marker({ 
            position: startLatLng, 
            map: map, 
            icon: imageStart,
            title: trackTitle
        }); 
        var imageFinish = 'http://www.google.com/mapfiles/dd-end.png'; 
        var finishLatLng = lonlat[0][lonlat[0].length - 1]; 
        var finishtMarker = new google.maps.Marker({ 
            position: finishLatLng, 
            map: map, 
            icon: imageFinish,
            title: trackTitle
        }); 
    }
    
    trackColorIndex++;
} 

function LoadMap() {
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
  
    map = new google.maps.Map(document.getElementById("map"), myOptions); 
  
    map.mapTypes.set('topo2', new StatkartMapType("Topografisk", "topo2"));; 
    map.mapTypes.set('toporaster2', new StatkartMapType("Toporaster", "toporaster2")); 

    map.setMapTypeId('topo2');
    
    setCurrentLocation();
} 
  
function StatkartMapType(name, layer) { 
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

function setCurrentLocation() {
  if (navigator.geolocation)  {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
    console.log("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  var myLatLng = new google.maps.LatLng(new String(position.coords.latitude), new String(position.coords.longitude)); 
  map.setCenter(myLatLng);
}