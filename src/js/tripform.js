angular.module('app').controller('TripFormCtrl', [
  'appRailroad', '$location', '$scope', 'localStorageService',
  function (appRailroad, $location, $scope, localStorageService) {
    function addToRecent(trip) {
      var recent = localStorageService.get('recent') || [];
      _.remove(recent, _.matches({
        stationFrom: trip.stationFrom,
        stationTo: trip.stationTo
      }));
      recent.push(trip);
      while (recent.length > 5) {
        recent.shift();
      }
      localStorageService.set('recent', recent);
    }

    function compare(a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }

    $scope.removeTrip = function (trip, evt) {
      if (evt) {
        evt.stopPropagation();
        evt.preventDefault();
      }
      var recent = localStorageService.get('recent') || [];
      if (trip) {
        _.remove(recent, _.matches({
          stationFrom: trip.stationFrom,
          stationTo: trip.stationTo
        }));
        localStorageService.set('recent', recent);
      }
      recent.sort(function (a, b) {
        return (
          compare(a.stationFrom, b.stationFrom) ||
          compare(a.stationTo, b.stationTo) ||
          0
        );
      });
      $scope.recent = recent;
    }

    $scope.showFormTrip = function () {
      if ($scope.tripForm.$invalid) {
        _.forEach($scope.tripForm.$error, function (err) {
          _.forEach(err, function (validator) {
            validator.$validate();
          });
        });
        return;
      }
      $scope.showTrip({
        stationFrom: $scope.stationFrom,
        stationTo: $scope.stationTo
      });
    };

    $scope.showTrip = function (trip, evt) {
      if (evt) {
        evt.stopPropagation();
        evt.preventDefault();
      }
      addToRecent(trip);
      var path = [ '', 'trip' ];
      path.push(encodeURIComponent(trip.stationFrom));
      path.push(encodeURIComponent(trip.stationTo));
      path = path.join('/');
      $location.url(path);
    }

    $scope.startsWithIgnoreCase = function (str, prefix) {
      return (
        str && prefix && str.toLowerCase().indexOf(prefix.toLowerCase()) === 0
      );
    };

    $scope.stopNames = appRailroad.stopNames;

    // this sets $scope.recent
    $scope.removeTrip();

  }]).directive('appStation',
  function() {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.$validators.station = function (modelValue, viewValue) {
          var result = _.includes(scope.stopNames, modelValue);
          if (scope.tripForm.$submitted) {
            elem.parent().toggleClass('has-error', !result);
          }
          return result;
        };
      }
    };
  });
