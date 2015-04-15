/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
};

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

//from = new google.maps.LatLng(49.004, 8.456);
//to   = new google.maps.LatLng(49.321, 8.789);
//dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
function getDistance(lat1, lon1, alt1, lat2, lon2, alt2) {
//    var R = 6371; // km
//    var dLat = (lat2-lat1).toRad();
//    var dLon = (lon2-lon1).toRad();
//    var lat1x = lat1.toRad();
//    var lat2x = lat2.toRad();
//
//    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1x) * Math.cos(lat2x); 
//    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//    var distance = R * c;
//    
    var from = new google.maps.LatLng(lat1, lon1);
    var to   = new google.maps.LatLng(lat2, lon2);
    var googleDistance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
    
    var altitude = Math.abs(alt2-alt1);
    
    var totalDistance = Math.sqrt((googleDistance*googleDistance)+(altitude*altitude));
    
    return totalDistance;
}

// Converts seconds to format HH:mm:ss
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
}

// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}