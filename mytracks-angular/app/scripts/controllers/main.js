'use strict';

/**
 * @ngdoc function
 * @name myTracks2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myTracks2App
 */
var app = angular.module('myTracks2App');

app.controller('MainCtrl', function ($scope, mapService) {

    $scope.loginUrl = "http://runkeeper.com/apps/authorize?client_id=ba572e63f74b42c1a21e4206b83f3dd3&redirect_uri=http://" + document.location.host + document.location.pathname.replace("map.html", "")  + "rest/login&response_type=code";

    $scope.$on('mapInitialized', function (event, map) {
    mapService.init(map);
  });

  $scope.togglePanoramio = function() {
    mapService.togglePanoramio();
  }

  $scope.toggleSlope = function() {
    mapService.toggleSlope();
  }

  $scope.toggleCaution = function() {
    mapService.toggleCaution();
  }
});

