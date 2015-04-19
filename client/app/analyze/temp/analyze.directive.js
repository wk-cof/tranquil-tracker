'use strict';

angular.module('frontendApp')
  .directive('analyze', function () {
    return {
      templateUrl: 'app/analyze/analyze.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });