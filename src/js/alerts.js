angular.module('app').factory('appAlerts', [
  'appRailroad', '$http', '$resource',
  function (appRailroad, $http, $resource) {
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

    return $resource(
      'http://www3.septa.org/hackathon/Alerts/get_alert_data.php',
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
  }
]);
