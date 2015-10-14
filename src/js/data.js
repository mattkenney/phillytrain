angular.module('app').directive('appData',
  function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attr) {
        scope[attr.appData] = JSON.parse(elem.html());
      }
    };
  });
