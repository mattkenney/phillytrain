angular.module('app').controller('TripListCtrl', [
  'appNextToArrive', '$location', '$routeParams', '$scope',
  function(appNextToArrive, $location, $routeParams, $scope) {
    if (!$scope.railroad.stops.hasOwnProperty($routeParams.stationFrom)) {
      $location.url('/trips');
      return;
    }

    if (!$scope.railroad.stops.hasOwnProperty($routeParams.stationTo)) {
      $location.url('/trips');
      return;
    }

    $scope.stationFrom = $routeParams.stationFrom;
    $scope.stationTo = $routeParams.stationTo;

    $scope.nextToArrive = appNextToArrive.query(
    {
      req1: $routeParams.stationFrom,
      req2: $routeParams.stationTo
    });

    $scope.showTrain = function (train, evt) {
      if (evt) {
        evt.stopPropagation();
        evt.preventDefault();
      }
      $location.url('/train/' + encodeURIComponent(train.train));
    };
  }
]);
