angular.module('app').controller('TrainCtrl', [
  'appRailroad', 'appRRSchedules', '$location', '$routeParams', '$scope',
  function(appRailroad, appRRSchedules, $location, $routeParams, $scope) {
    if (!appRailroad.isStation($routeParams.stationFrom)) {
      $location.url('/trips');
      return;
    }

    if (!appRailroad.isStation($routeParams.stationTo)) {
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

    $scope.line = line;
    $scope.train = $routeParams.train;

    $scope.rrSchedule = appRRSchedules.query(
    {
      req1: $routeParams.train
    }, null, null, function (res) {
      $scope.errorMessage = angular.isString(res) ? res : " ";
    });
  }
]);
