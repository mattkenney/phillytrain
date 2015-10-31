angular.module('app').controller('TrainCtrl', [
  'appRailroad', 'appRRSchedules', '$location', '$routeParams', '$scope',
  function(appRailroad, appRRSchedules, $location, $routeParams, $scope) {
    var stationFrom = appRailroad.splitViaName($routeParams.stationFrom);
    if (!appRailroad.isStation(stationFrom[1])) {
      $location.url('/trips');
      return;
    }

    var stationTo = appRailroad.splitViaName($routeParams.stationTo);
    if (!appRailroad.isStation(stationTo[1])) {
      $location.url('/trips');
      return;
    }

    var line = $routeParams.line.replace('-', '/');
    if (!appRailroad.routeCodes.hasOwnProperty(line)) {
      $location.url('/trips');
      return;
    }

    if (!(/^[0-9]+$/).test($routeParams.train)) {
      $location.url('/trips');
      return;
    }

    $scope.back = function () {
      var path = [ '', 'trip' ];
      path.push(encodeURIComponent(stationFrom[0]));
      path.push(encodeURIComponent(stationTo[0]));
      path = path.join('/');
      $location.url(path);
    };

    $scope.line = line;
    $scope.train = $routeParams.train;

    $scope.rrSchedule = appRRSchedules($routeParams.train, function (res) {
      $scope.errorMessage = angular.isString(res) ? res : " ";
    });
  }
]);
