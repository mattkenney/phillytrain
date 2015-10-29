angular.module('app').controller('TripListCtrl', [
  'appAlerts', 'appNextToArrive', 'appRailroad',
  '$location', '$routeParams', '$scope',
  function (appAlerts, appNextToArrive, appRailroad,
            $location, $routeParams, $scope) {
    if (!appRailroad.isStation($routeParams.stationFrom)) {
      $location.url('/trips');
      return;
    }

    if (!appRailroad.isStation($routeParams.stationTo)) {
      $location.url('/trips');
      return;
    }

    $scope.stationFrom = $routeParams.stationFrom;
    $scope.stationTo = $routeParams.stationTo;

    $scope.back = function () {
      $location.url('/');
    };

    $scope.nextToArrive = appNextToArrive.query(
    {
      req1: $routeParams.stationFrom,
      req2: $routeParams.stationTo
    }, null, null, function (res) {
      $scope.errorMessage = angular.isString(res) ? res : " ";
    });

    $scope.nextToArrive.$promise.then(function (data) {
      $scope.alerts = {};
      angular.forEach(data, function (trip) {
        angular.forEach(trip.trains, function (train) {
          if (!$scope.alerts.hasOwnProperty(train.line)) {
            $scope.alerts[train.line] = appAlerts.query({
              req1: 'rr_route_' + appRailroad.routeCodes[train.line]
            });
          }
        });
      });
    });

    $scope.showTrain = function (train, evt) {
      if (evt) {
        evt.stopPropagation();
        evt.preventDefault();
      }
      var path = [ '', 'trip' ];
      path.push(appRailroad.makeViaName($routeParams.stationFrom, train.from));
      path.push(appRailroad.makeViaName($routeParams.stationTo, train.to));
      path.push(train.line.replace('/', '-'));
      path.push(train.train);
      path = _.map(path, function (segment) {
        return encodeURIComponent(segment);
      }).join('/');
      $location.url(path);
    };
  }
]);
