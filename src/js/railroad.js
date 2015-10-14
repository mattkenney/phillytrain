angular.module('app').factory('appRailroad',
  function () {
    return {
      arrayConcat: function (target, value) {
        var target = angular.isArray(target) ? target : [target];
        return target.concat(value);
      },

      timeCopy: function (target, from, to) {
        var time = this.timeParse(target[from]);
        if (moment.isMoment(time)) {
          target[to] = this.timeFormat(time);
        }
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
);
