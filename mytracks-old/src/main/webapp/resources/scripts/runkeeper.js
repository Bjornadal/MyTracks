/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var api = "http://api.runkeeper.com";
var accessToken;

$(document).ready(function() {

    // Loads access token
    var accessTokenCookie = $.cookie("accessToken");

    if (accessTokenCookie) {
        accessToken = accessTokenCookie;
        console.log("Access token: " + accessToken);
        $("#login").css("display", "none");
        $("#logout").css("display", "block");

        init();
    }
    else {
        $.get("rest/getAccessToken/", function(data) {
            console.log("Access token: " + data);
            if (data) {
                accessToken = data;
                $.cookie("accessToken", accessToken, {expires: 7});

                $("#login").css("display", "none");
                $("#logout").css("display", "block");

                init();
            }
        });
    }

    // Logout
    $("#btnLogoutRunkeeper").click(function() {
        $.removeCookie("accessToken");

        $.get("rest/logout/", function(data) {
            accessToken = null;

            $("#login").css("display", "block");
            $("#logout").css("display", "none");

            $("#routeList").html("");
        });

        $.ajax({
            url: "https://runkeeper.com/apps/de-authorize",
            type: "POST",
            xhrFields: {
                withCredentials: true
            },
            data: {
                access_token: accessToken
            }
        });
    });

    // Init
    function init() {
        makeRequest("GET", "/fitnessActivities?pageSize=200", "application/vnd.com.runkeeper.FitnessActivityFeed+json", function(data) {
            var index = 0;
            $.each(data["items"], function(key, val) {

                moment.locale('nb');
                var parsedDate = moment(val.start_time).format("Do MMMM YYYY");

                var distance = (val.total_distance / 1000).toPrecision(3) + " km";
                var time = secondsToHms(val.duration);

                $("#routeList").append("<div id='item-" + index + "' class='closed item' uri='" + val.uri + "'>\n\
                                            <div class='fieldDate'>" + parsedDate + "</div>\n\
                                            <div class='fieldType'>" + val.type + "</div>\n\
                                            <div class=''>(" + distance + " / " + time  + ")</div>\n\
                                        </div>");

                $("#item-" + index).click(function() {
                    if ($(this).hasClass("closed")) {
                        addRouteToMap(val.uri);
                    }

                    $(this).addClass("opened");
                    $(this).removeClass("closed");
                });

                index++;
            });
        });
    }

    // Adds runkeeper route to map
    function addRouteToMap(route) {
        makeRequest("GET", route, "application/vnd.com.runkeeper.FitnessActivity+json", function(data) {
            var lonlat = [];
            var track = [];

            var maxSpeed = 0;
            var startHeight;
            var minHeight = 9000;
            var maxHeight = 0;
            var totalDistance = 0;

            $.each(data["path"], function(key, val) {
                var myLatLng = new google.maps.LatLng(val.latitude, val.longitude);
                track.push(myLatLng);

                if (key == 0) {
                    startHeight = val.altitude;
                }

                var previousPath = data["path"][key - 2];
                if (previousPath != null) {
                    // Distance in meters
                    var distance = getDistance(previousPath.latitude, previousPath.longitude, previousPath.altitude, val.latitude, val.longitude, val.altitude);
                    totalDistance += distance;

                    // Time in seconds
                    var seconds = val.timestamp - previousPath.timestamp;

                    // Speed i km/h
                    var speed = (distance / 1000) / ((seconds / 60) / 60);

                    // Set max speed
                    if (speed > maxSpeed) {
                        maxSpeed = speed;
                    }

                    // Set min height
                    if (val.altitude < minHeight) {
                        minHeight = val.altitude;
                    }
                    // Set max height
                    if (val.altitude > maxHeight) {
                        maxHeight = val.altitude;
                    }

                    if (val.type != "gps") {
                        console.log("Type: " + val.type);
                    }
                }
            });

            // Set climb height
            var climbHeight = maxHeight - minHeight;

            // TODO: Write to detail window
            console.log("Maxspeed: " + maxSpeed + " km/t");

            // TODO: Write average speed to detail window
            var averageSpeed = (data.total_distance / 1000) / ((data.duration / 60) / 60);
            console.log("Averagespeed: " + averageSpeed + " km/t");

            console.log("Total distance /w altitude calculation: " + totalDistance / 1000 + " km");

            // Add route detail
            $("div[uri='" + data.uri + "']").append("<div class='fieldDetail fieldMargin'>Starthøyde</div><div class='fieldMargin'>" + startHeight.toPrecision(4) + " m</div>");
            $("div[uri='" + data.uri + "']").append("<div class='fieldDetail'>Stigning</div><div>" + data.climb.toPrecision(4) + " m</div>");
            $("div[uri='" + data.uri + "']").append("<div class='fieldDetail'>Makshøyde</div><div>" + maxHeight.toPrecision(4) + " m</div>");
            $("div[uri='" + data.uri + "']").append("<div class='fieldDetail fieldMargin'>Maksfart</div><div class='fieldMargin'>" + maxSpeed.toPrecision(3) + " km/t</div>");
            $("div[uri='" + data.uri + "']").append("<div class='fieldAverage fieldDetail'>Gjennomsnitt</div><div class='fieldAverageValue'>" + averageSpeed.toPrecision(3) + " km/t</div>");

            lonlat.push(track);
            LoadTracks(lonlat, data.type + " - " + data.start_time, null);
        });
    };

    // Makes a HTTP request to the Runkeeper API
    function makeRequest(type, path, accept, callback) {
        $.ajax({
            type: type,
            beforeSend: function(request)
            {
                request.setRequestHeader("Authorization", "Bearer " + accessToken);
                request.setRequestHeader("Accept", accept);
            },
            url: api + path,
            processData: false,
            success: callback
        });
    }
});