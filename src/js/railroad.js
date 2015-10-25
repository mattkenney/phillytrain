angular.module('app').factory('appRailroad', ['$rootScope',
  function ($rootScope) {
    var stationCodes = {}
    ,   routeCodes = {}
    ;

    _.forEach($rootScope.railroad.routes, function (value, key) {
      routeCodes[value] = key;
    });

    return {
      stopNames: _.map($rootScope.railroad.stops, function (value, key) {
        var name = (value.alt || key);
        stationCodes[key] = stationCodes[name] = value.r;
        return name;
      }),

      routeCodes: routeCodes,

      arrayConcat: function (target, value) {
        var target = angular.isArray(target) ? target : [target];
        return target.concat(value);
      },

      checkResponseData: function (data) {
        if (!angular.isArray(data)) {
          throw (data && (data.message || data.error) || "bad response");
        }
      },

      expandStationName: function (name) {
        var station = $rootScope.railroad.stops[name];
        return (station && station.alt || name)
      },

      isStation: function (name) {
        return stationCodes.hasOwnProperty(name);
      },

      timeFormat: function (time) {
        var result = time;
        if (!((/na/i).test(time) || moment.isMoment(result))) {
            result = this.timeParse(time) || time;
        }
        if (moment.isMoment(result)) {
            result = result.format("h:mm A");
        }
        return result;
      },

      timeParse: function (str) {
        var result = (/na/i).test(str) ? undefined : moment("20000101 " + str,
          "YYYYMMDDhhmma", false);
        return ((result && result.isValid()) ? result : undefined);
      },

      timeDelay: function (time, delta) {
        var when = this.timeParse(time);
        if (moment.isMoment(when))
        {
            when.add(delta, "m");
        }
        return this.timeFormat(when);
      }
    }
  }
]);
