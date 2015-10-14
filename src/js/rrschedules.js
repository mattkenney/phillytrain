angular.module('app').factory('appRRSchedules', [
  'appRailroad', '$http', '$resource', '$rootScope', '$routeParams',
  function (appRailroad, $http, $resource, $rootScope, $routeParams) {
    function transform(data) {
      var result = []
      var line1 = $rootScope.routes[$rootScope.railroad.stops[station.station].r];
      _.forEach(data, function (station) {
        appRailroad.timeCopy(station, 'sched_tm', 'scheduled');
        appRailroad.timeCopy(station, 'est_tm', 'estimated');
        appRailroad.timeCopy(station, 'act_tm', 'actual');
        station.isDelayed =
          ((station.actual || station.estimated) !== station.scheduled);
      });
//      var result = [{ stations:[] }]
//      ,   line = result[0]
//      ,   stations = line.stations
//      ;
//      var firstLine = $rootScope.routes[_.find(data, function (station) {
//          return (station.r && station.r !== 'c');
//        }).r]
//      ,   lastLine = $rootScope.routes[_.findLast(data, function (station) {
//          return (station.r && station.r !== 'c');
//        }).r]
//      ;
//        var name =
//          $rootScope.routes[$rootScope.railroad.stops[station.station].r];
//        if (line.line && line.line !== name) {
//          //
//        }
//        line.line = line.line || $rootScope.routes[code];
//        stations.push(station);
      return result;
    }

    return $resource(
      'http://www3.septa.org/hackathon/RRSchedules/',
      {
        callback: 'JSON_CALLBACK'
      },
      {
        query: {
          method: 'JSONP',
          isArray: true,
          transformResponse:
            appRailroad.arrayConcat($http.defaults.transformResponse, transform)
        }
      },
      {
        stripTrailingSlashes: false
      }
    );
  }
]);
