/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    
    // Loads map
    LoadMap();
   
    // Set redirect url
    var url = "http://runkeeper.com/apps/authorize?client_id=ba572e63f74b42c1a21e4206b83f3dd3&redirect_uri=http://" + document.location.host + document.location.pathname.replace("map.html", "")  + "rest/login&response_type=code";
    $("#rk_login-blue-black").attr("href", url);
    
    // Corrects size at startup
    correctsize();
    
    // Set Window listener
    $( window ).resize(function() {
        correctsize();
    });
    
    function correctsize() {
        $( "#bodyContainer" ).css("height", $( window ).height());
        $( "#leftMenu" ).css("height", $( window ).height());
        $( "#routeList" ).css("height", $( window ).height() - 311);
    }
});


