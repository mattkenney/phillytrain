angular.module('app', [
    'ngAnimate', 'ngResource', 'ngRoute', 'LocalStorageModule', 'ui.bootstrap'
  ]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/trips', {
        templateUrl: 'partials/tripform.html'
      }).
      when('/trip/:stationFrom/:stationTo', {
        templateUrl: 'partials/triplist.html'
      }).
      when('/train/:train', {
        templateUrl: 'partials/train.html'
      }).
      otherwise({
        redirectTo: '/trips'
      });
  }]);
