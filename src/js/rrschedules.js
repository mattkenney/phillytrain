angular.module('app').factory('appRRSchedules', [
  'appRailroad', '$http', '$resource', '$routeParams',
  function (appRailroad, $http, $resource, $routeParams) {
    function transform(data) {
      appRailroad.checkResponseData(data);
      var stationFrom = appRailroad.splitViaName($routeParams.stationFrom)[1]
      ,   stationTo = appRailroad.splitViaName($routeParams.stationTo)[1]
      ,   from = _.findIndex(data,
            function (station) {
              return (station.station === stationFrom);
            })
      ,   to = _.findIndex(data,
            function (station) {
              return (station.station === stationTo);
            })
      ;
      return  _.map(data.slice(from, to + 1), function (station) {
        var scheduled = appRailroad.timeParse(station.sched_tm)
        ,   estimated = appRailroad.timeParse(station.est_tm)
        ,   actual = appRailroad.timeParse(station.act_tm)
        ,   result = {}
        ;
        result.station = appRailroad.expandStationName(station.station);
        result.scheduled = appRailroad.timeFormat(scheduled);
        if (moment.isMoment(actual)) {
          result.actual = appRailroad.timeFormat(actual);
          result.isDelayed = (Math.abs(scheduled.unix() - actual.unix()) > 90);
        } else {
          result.estimated = appRailroad.timeFormat(estimated);
          result.isDelayed = (Math.abs(scheduled.unix() - estimated.unix()) > 90);
        }
        return result;
      });
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
