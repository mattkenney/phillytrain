angular.module('app').factory('appAlerts', [
  'appAnalytics', 'appRailroad', '$http', '$resource',
  function (appAnalytics, appRailroad, $http, $resource) {
    function transform(data) {
      appRailroad.checkResponseData(data);
      var result = [];
      angular.forEach(data, function (obj) {
        if (obj.current_message) {
          result.push(obj.current_message);
        }
      });
      return result;
    }

    var collection = $resource(
      '//www3.septa.org/hackathon/Alerts/get_alert_data.php',
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
      }
    );

    return function (line) {
      var params = {
        req1: 'rr_route_' + appRailroad.routeCodes[line]
      };
      appAnalytics('send', 'event', 'API', 'Alerts', JSON.stringify(params));
      return collection.query(params);
    }
  }
]);
