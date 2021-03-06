/*!
@copyright Copyright 2013, 2014, 2015, 2017 Matt Kenney
@license https://www.gnu.org/licenses/agpl.txt
@source https://github.com/mattkenney/phillytrain
*/
angular.module('app', [
  'ngAnimate', 'ngResource', 'ngRoute', 'ngSanitize',
  'LocalStorageModule', 'ui.bootstrap'
]).config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
    when('/trips', {
      templateUrl: '@@version@@/partials/tripform.html'
    }).
    when('/trip/:stationFrom/:stationTo', {
      templateUrl: '@@version@@/partials/triplist.html'
    }).
    when('/trip/:stationFrom/:stationTo/:line/:train', {
      templateUrl: '@@version@@/partials/train.html'
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
