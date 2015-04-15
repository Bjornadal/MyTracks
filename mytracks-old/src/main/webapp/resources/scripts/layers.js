/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



// ### Panoramio ###
var panoramioLayer;
function LoadPanoramio() {
    panoramioLayer = new google.maps.panoramio.PanoramioLayer();
    panoramioLayer.setMap(map);

    var panoramio = document.getElementById("btnPanoramio");
    panoramio.innerHTML = "Fjern Panoramio";
    panoramio.href = "javascript:RemovePanoramio();";
    $("#btnPanoramio").addClass("layerChecked");

}
function RemovePanoramio() {
    panoramioLayer.setMap(null);

    var panoramio = document.getElementById("btnPanoramio");
    panoramio.innerHTML = "Vis Panoramio";
    panoramio.href = "javascript:LoadPanoramio();";
    $("#btnPanoramio").removeClass("layerChecked");
}

// ### Helning ###
var helning;
function LoadHelning() {
    var opacity = 0.3;
    var url = 'http://gis2.ngi.no/arcgisprodpub/rest/services/Skred/BratteOmr/MapServer';

    helning = new gmaps.ags.MapOverlay(url, {
        name: 'Helning',
        opacity: opacity
    });
    helning.setMap(map);

    var btnHelning = document.getElementById("btnHelning");
    btnHelning.innerHTML = "Fjern Helning";
    btnHelning.href = "javascript:RemoveHelning();";
    $("#btnHelning").addClass("layerChecked");
}
function RemoveHelning() {
    helning.setMap(null);

    var btnHelning = document.getElementById("btnHelning");
    btnHelning.innerHTML = "Vis Helning";
    btnHelning.href = "javascript:LoadHelning();";
    $("#btnHelning").removeClass("layerChecked");
}

// ### Aktsomhet ###
var SLPLayer;
var aktsomhet;
//function LoadAktsomhet() {
//    //var url = 'http://geo.ngu.no/mapserver/SkredSnoAktWMS2';
//    var url = 'http://gis3.nve.no/map/rest/services/SkredSnoAktR/MapServer';
//    var aktsomhet = new gmaps.ags.MapOverlay(url);
//    aktsomhet.setMap(map);
//
//    SLPLayer = new google.maps.ImageMapType({
//        getTileUrl: function(coord, zoom) {
//            var proj = map.getProjection();
//            var zfactor = Math.pow(2, zoom);
//            // get Long Lat coordinates
//            var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor));
//            var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor));
//
//            //corrections for the slight shift of the SLP (mapserver)
//            var deltaX = 0;
//            var deltaY = 0;
//
//            //create the Bounding box string
//            var bbox = (bot.lat() + deltaX) + "," +
//                    (top.lng() + deltaY) + "," +
//                    (top.lat() + deltaX) + "," +
//                    (bot.lng() + deltaY);
//
//            //base WMS URL
//            //var url = "http://geo.ngu.no/mapserver/SkredSnoAktWMS2";
//            var url = 'http://gis3.nve.no/map/rest/services/SkredSnoAktR/MapServer';
//            url += "?SERVICE=WMS";    //WMS service
//            url += "&REQUEST=GetMap"; //WMS operation
//            url += "&FORMAT=image/png"; //WMS format
//            url += "&TRANSPARENT=TRUE";
//            url += "&STYLES=";
//            url += "&VERSION=1.3.0";  //WMS version
//            url += "&LAYERS=" + "Utlopsomrade,Utlosningsomrade,Aktsomhetsomrade"; //WMS layers
//            url += "&WIDTH=256";         //tile size in google
//            url += "&HEIGHT=256";
//            url += "&CRS=EPSG:4326";     //set WGS84 EPSG:25833
//            url += "&BBOX=" + bbox;      // set bounding box
//
//            return url;                 // return URL for the tile
//
//        },
//        tileSize: new google.maps.Size(256, 256),
//        name: 'Aktsomhets',
//        opacity: 1
//    });
//
//    map.overlayMapTypes.push(SLPLayer);
//
//    var btnAktsomhet = document.getElementById("btnAktsomhet");
//    btnAktsomhet.innerHTML = "Fjern Aktsomhet";
//    btnAktsomhet.href = "javascript:RemoveAktsomhet();";
//    $("#btnAktsomhet").addClass("layerChecked");
//}

function LoadAktsomhet() {
    var opacity = 0.4;
    var url = 'http://gis3.nve.no/map/rest/services/SkredSnoAktR/MapServer';
    //var url = 'http://gis3.nve.no/map/rest/services/SkredSnoAkt/MapServer';
    aktsomhet = new gmaps.ags.MapOverlay(url, {
        name: 'Aktsomhet',
        opacity: opacity,
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
    aktsomhet.setMap(map);

    var btnAktsomhet = document.getElementById("btnAktsomhet");
    btnAktsomhet.innerHTML = "Fjern Aktsomhet";
    btnAktsomhet.href = "javascript:RemoveAktsomhet();";
    $("#btnAktsomhet").addClass("layerChecked");
}

function RemoveAktsomhet() {
    aktsomhet.setMap(null);

    var btnAktsomhet = document.getElementById("btnAktsomhet");
    btnAktsomhet.innerHTML = "Vis Aktsomhet";
    btnAktsomhet.href = "javascript:LoadAktsomhet();";
    $("#btnAktsomhet").removeClass("layerChecked");
}


function RemoveLayer(name) {
    for (var i = 0; i < map.overlayMapTypes.b.length; i++) {
        if (map.overlayMapTypes.b[i] == null || map.overlayMapTypes.b[i].name == name) {
            map.overlayMapTypes.removeAt(i);
            i--;
        }
    }
}
