/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function() {
    $('#fileUploadButton').change(function(evt) {
        var files = evt.target.files;
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function() {
            console.log(this.result);
            
            var xml = this.result;
            
            var lonlat=[];
            var track = [];
            
            $(xml).find('trkpt').each(function() {
                var xPoint = parseFloat($(this).attr('lat')); 
                var yPoint = parseFloat($(this).attr('lon')); 

                var myLatLng = new google.maps.LatLng(xPoint, yPoint); 
                track.push(myLatLng);
            });
            
            lonlat.push(track);
            
            LoadTracks(lonlat);
        };
        reader.readAsText(file);

    });
});