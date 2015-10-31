angular.module('app', [
  'ngAnimate', 'ngResource', 'ngRoute', 'ngSanitize',
  'LocalStorageModule', 'ui.bootstrap'
]).config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
    when('/trips', {
      templateUrl: 'partials/tripform.html'
    }).
    when('/trip/:stationFrom/:stationTo', {
      templateUrl: 'partials/triplist.html'
    }).
    when('/trip/:stationFrom/:stationTo/:line/:train', {
      templateUrl: 'partials/train.html'
    }).
    otherwise({
      redirectTo: '/trips'
    });
}]).factory('appAnalytics', [
  '$window',
  function ($window) {
    return $window.ga;
  }
]).run([
  '$rootScope', '$route', '$window',
  function ($rootScope, $route, $window) {
    $rootScope.$on('$viewContentLoaded', function () {
      $window.ga('send', 'pageview', $route.current.originalPath);
    });
  }
]);
