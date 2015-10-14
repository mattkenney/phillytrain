angular.module('app').controller('TrainCtrl', [
  'appRRSchedules', '$location', '$routeParams', '$scope',
  function(appRRSchedules, $location, $routeParams, $scope) {
//    if (!$scope.railroad.stops.hasOwnProperty($routeParams.stationFrom)) {
//      $location.url('/trips');
//      return;
//    }
    $scope.rrSchedule = appRRSchedules.query(
    {
      req1: $routeParams.train
    });
  }
]);
