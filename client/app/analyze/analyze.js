'use strict';


angular.module('frontendApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('analyze', {
        url: '/analyze',
        templateUrl: 'app/analyze/analyze.html'
      });
  });
