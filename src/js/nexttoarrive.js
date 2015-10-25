angular.module('app').factory('appNextToArrive', [
  'appRailroad', '$http', '$resource', '$routeParams',
  function (appRailroad, $http, $resource, $routeParams) {
    function parseTrain(trip, num) {
      var phase = num ? 'term' : 'orig'
      ,   result = {
            from: num ? trip.Connection : $routeParams.stationFrom,
            to: !num && trip.Connection || $routeParams.stationTo,
            line: trip[phase + "_line"],
            train: trip[phase + "_train"],
            depart: trip[phase + "_departure_time"] ||
              trip[phase + "_depart_time"],
            arrive: trip[phase + "_arrival_time"]
          }
      ,   delay = trip[phase + "_delay"]
      ,   m = (/^([0-9]+) min(s?)$/).exec(delay)
      ,   delta = m ? Number(m[1]) : 0
      ;
      if (delta) {
          result.departDelayed = appRailroad.timeDelay(result.depart, delta);
          result.arriveDelayed = appRailroad.timeDelay(result.arrive, delta);
      } else if (!(/^ *on *time *$/i).test(delay)) {
          result.delay = delay;
      }
      result.arrive = appRailroad.timeFormat(result.arrive);
      result.depart = appRailroad.timeFormat(result.depart);
      return result;
    }

    function transform(data) {
      appRailroad.checkResponseData(data);
      angular.forEach(data, function (trip) {
        trip.trains = [ parseTrain(trip, 0) ];
        trip.depart = trip.trains[0].depart;
        if (trip.isdirect && trip.isdirect !== 'false') {
          trip.arrive = trip.trains[0].arrive;
        } else {
          trip.trains.push(parseTrain(trip, 1));
          trip.arrive = trip.trains[1].arrive;
        }
      });
      return data;
    }

    return $resource(
      'http://www3.septa.org/hackathon/NextToArrive/',
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
